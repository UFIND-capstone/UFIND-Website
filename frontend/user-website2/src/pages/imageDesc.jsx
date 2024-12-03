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
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

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
        setError(err.message || "Failed to fetch item details.");
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
    const boundingExtent = [
      bottomLeft[0],
      bottomLeft[1],
      topRight[0],
      topRight[1],
    ];
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
      {/* Topbar */}
      <Topbar />

      {/* Main Content */}
      <div className="flex-grow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading item details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left Container */}
            <div className="p-6 bg-gray-50 flex flex-col justify-center items-center">
              <button
                onClick={() => navigate(-1)}
                className="self-start text-gray-600 hover:text-gray-900 mb-4"
              >
                ← Back
              </button>
              <div className="w-full flex flex-col items-center justify-center rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={item.imageUrl || "/placeholder-image.png"}
                  alt={item.name || "Lost Item"}
                  className="object-cover w-full h-80"
                />
                <p
                  className={`mt-2 font-medium text-lg ${
                    item.status === "lost" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {item.status === "lost" ? "Lost" : "Found"}
                </p>
              </div>
            </div>

            {/* Right Container */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {item.name || "Unnamed Item"}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Full Name:</p>
                  <p className="text-gray-600">{item.fullName || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Description:</p>
                  <p className="text-gray-600">{item.description || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Date:</p>
                  <p className="text-gray-600">
                    {item.dateTime
                      ? new Date(item.dateTime).toLocaleString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                      : "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-700">
                    Last Seen Location:
                  </p>
                  {item.location ? (
                    <div
                      ref={mapRef}
                      className="w-full h-64 rounded-lg border border-gray-300"
                    />
                  ) : (
                    <p className="text-gray-600">No location available</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-700">
                    Posted by:{" "}
                    <span className="font-medium">
                      {item.fullName || "N/A"}
                    </span>
                  </p>
                </div>
              </div>
              <button className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600">
                Contact Me
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ItemDescription;
