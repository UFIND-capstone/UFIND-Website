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

    const locationParts = item.location.split(",").map(Number);
    const [longitude, latitude] = locationParts;

    // Set up OpenLayers map
    const coordinates = fromLonLat([longitude, latitude]);
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(coordinates),
              }),
            ],
          }),
          style: new Style({
            image: new Icon({
              src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
              scale: 0.07,
            }),
          }),
        }),
      ],
      view: new View({
        center: coordinates,
        zoom: 17,
      }),
    });

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
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={item.imageUrl || "/placeholder-image.png"}
                  alt={item.name || "Lost Item"}
                  className="object-cover w-full h-full"
                />
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
                  <p className="text-gray-600">{item.owner || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Description:</p>
                  <p className="text-gray-600">{item.description || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Date:</p>
                  <p className="text-gray-600">{item.date || "Not specified"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Last Seen Location:</p>
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
                    <span className="font-medium">{item.postedBy || "N/A"}</span>
                  </p>
                </div>
              </div>
              <button className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600">
                Send Message
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
