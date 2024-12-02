import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "ol/ol.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { Point } from "ol/geom";
import { Feature } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";
import Footer from "../components/footer";
import Topbar from "../components/topBar";

const ItemDescription = () => {
  const navigate = useNavigate();
  const { itemID } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/items/${itemID}`
        );
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch item details");
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemID]);

  useEffect(() => {
    if (!item || !item.location) return;

    // Parse location string to [longitude, latitude]
    const locationParts = item.location.split(",").map(Number);
    const [longitude, latitude] = locationParts;
    const coordinates = fromLonLat([longitude, latitude]);

    // Define restricted area
    const bottomLeft = fromLonLat([124.65448369078607, 8.484757587809328]);
    const topRight = fromLonLat([124.6587442680971, 8.487072471046389]);
    const boundingExtent = [bottomLeft[0], bottomLeft[1], topRight[0], topRight[1]];
    const center = [
      (bottomLeft[0] + topRight[0]) / 2,
      (bottomLeft[1] + topRight[1]) / 2,
    ];

    // Set up map
    const vectorSource = new VectorSource();
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center,
        zoom: 17,
        maxZoom: 19,
        extent: boundingExtent,
      }),
    });

    // Add marker
    const markerFeature = new Feature(new Point(coordinates));
    markerFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          scale: 0.07,
        }),
      })
    );
    vectorSource.addFeature(markerFeature);

    return () => map.setTarget(null);
  }, [item]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar />

      <div className="flex-grow flex justify-center items-center p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading item details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left Container */}
            <div className="flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r bg-gray-50">
              <button
                onClick={() => navigate(-1)}
                className="self-start text-gray-600 hover:text-gray-900 mb-4 focus:outline-none"
              >
                ← Back
              </button>
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={item.imageUrl || "/placeholder-image.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Container */}
            <div className="p-6 flex flex-col space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Seen Location
                </label>
                <div className="w-full h-80">
                  {/* Embedded OpenLayers Map */}
                  {item.location ? (
                    <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
                  ) : (
                    <p>No location available</p>
                  )}
                </div>
              </div>
              <p className="text-gray-600">
                Posted by{" "}
                <span className="font-semibold">{item.postedBy || "N/A"}</span>
              </p>
              <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItemDescription;
