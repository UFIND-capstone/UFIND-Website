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
import Footer from "../../components/admin/footer";
import Topbar from "../../components/admin/topBar";
import { useAuth } from "../../AuthContext";

const ItemDescription = () => {
  const { user } = useAuth(); // Get user from AuthContext
  const navigate = useNavigate();
  const { itemID } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimData, setClaimData] = useState({
    itemId: "",
    studentId: "",
    name: "",
    yearSection: "",
    description: "",
    timeLost: "",
    locationLost: "",
  });

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(
          `https://mel-backend.jwisnetwork.com/api/items/${itemID}`
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
        const coordinates = fromLonLat([latitude, longitude]);
        console.log(`coords: ${locationParts}`);

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

  const handleClaimToggle = () => {
    if (user.id === item.studentId) {
      alert("You cannot claim your own item.");
      return;
    }

    if (item.claimStatus === "turnover") {
      alert("This Item was turnover to OSA. Go to OSA to claim your item.");
      return;
    }
    setShowClaimForm(!showClaimForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClaimData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...claimData,
        itemId: itemID,
        studentId: user.id,
      };
      console.log("Submitting claim with data:", data);

      // Submit the claim
      const response = await axios.post(
        "https://mel-backend.jwisnetwork.com/api/items/claim",
        data
      );
      console.log("User ID:", user.id);
      console.log("Receiver ID:", item.studentId);

      // Once the claim is submitted, send the message to the poster
      const messageData = {
        senderId: user.id, // The ID of the user claiming the item
        recipientId: item.studentId, // The ID of the poster of the item (receiver)
        content: `
          Item: ${item.name}
          Name: ${claimData.name}
          Year and Section: ${claimData.yearSection}
          Description: ${claimData.description}
          Time Lost: ${claimData.timeLost}
          Location Lost: ${claimData.locationLost}
          Item ID: ${item.id}
        `,
      };

      // Send the message
      await axios.post("https://mel-backend.jwisnetwork.com/api/messages", messageData);

      console.log("Claim Submitted:", response.data);
      alert(
        "Your details are pending admin approval. You will be notified once the approval is processed."
      );
      setShowClaimForm(false);
      setClaimData({
        name: "",
        yearSection: "",
        description: "",
        timeLost: "",
        locationLost: "",
      });
    } catch (err) {
      console.error("Error submitting claim:", err);
      alert("Failed to submit claim. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Topbar />
      <div className="flex-grow p-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading item details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 bg-gray-50 flex flex-col justify-center items-center">
              <button
                onClick={() => navigate(-1)}
                className="self-start text-gray-600 hover:text-gray-900 mb-4"
              >
                ← Back
              </button>
              <img
                src={item.imageUrl || "/placeholder-image.png"}
                alt={item.name || "Lost Item"}
              />
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                {item.name || "Unnamed Item"}
              </h2>
              <p
                className={`text-lg font-medium mb-4 ${
                  item.status === "lost" ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.status === "lost" ? "Lost" : "Found"}
              </p>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Full Name:</p>
                  <p className="text-gray-600">{item.fullName || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-700">Description:</p>
                  <p>{item.description || "N/A"}</p>
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
                  <p className="font-medium text-gray-700">Initial Location:</p>
                  <p className="text-gray-600">{item.lastSeenLocation || "Unknown"}</p>
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

                <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/admin/edit/${item.id}`)}
                  className="w-full px-20 py-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                  EDIT THIS ITEM
                </button>
                </div>
                
              </div>
                <div className="mt-6">
                  {showClaimForm && (
                    <form
                      className="mt-4 space-y-4"
                      onSubmit={handleClaimSubmit}
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={claimData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Year and Section
                        </label>
                        <input
                          type="text"
                          name="yearSection"
                          placeholder="Enter your year and section"
                          value={claimData.yearSection}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={claimData.description}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          placeholder="If you believe this is yours, provide specific details (e.g., contents, brand, markings) when submitting your claim."
                          rows="3"
                          required
                        ></textarea>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Time Lost
                        </label>
                        <input
                          type="text"
                          name="timeLost"
                          placeholder="Enter a time lost"
                          value={claimData.timeLost}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Location Lost
                        </label>
                        <input
                          type="text"
                          name="locationLost"
                          placeholder="Enter a location lost"
                          value={claimData.locationLost}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                      >
                        Submit Claim
                      </button>
                    </form>
                  )}
                </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ItemDescription;
