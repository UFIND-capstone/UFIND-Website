<<<<<<< HEAD
import React from "react";
import { Link, useParams } from "react-router-dom";

// Sample data for multiple items
const items = [
  {
    id: 1,
    itemName: "Water Bottle",
    fullName: "Frince Villarte",
    location: "Outside Cafeteria",
    description: "Dark Green bottle",
    dateTime: "June 24, 2024",
    contactNumber: "09265834603",
    email: "frince04@gmail.com",
    image: "/src/assets/water-bottle.png", // Replace with your actual image path
  },
  {
    id: 2,
    itemName: "Umbrella",
    fullName: "John Doe",
    location: "Library",
    description: "Black umbrella",
    dateTime: "June 20, 2024",
    contactNumber: "09123456789",
    email: "john.doe@gmail.com",
    image: "/src/assets/umbrella.png", // Replace with your actual image path
  },
];

const ItemDescription = () => {
  const { id } = useParams();
  const item = items.find((item) => item.id === parseInt(id));

  if (!item) {
    return <div className="p-6 text-center text-red-500">Item not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="text-4xl font-bold">U-Find</div>
        <div className="flex items-center space-x-4">
          <button className="text-white">
            <i className="fas fa-bell"></i>
          </button>
          <img
            src="/src/assets/PROFILE.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/6 bg-white shadow-lg p-6">
          <div className="text-center mb-6">
            <img
              src="/src/assets/PROFILE.png"
              alt="Admin"
              className="w-16 h-16 mx-auto rounded-full"
            />
            <h2 className="mt-2 font-bold text-lg">Jared Rara</h2>
          </div>

          <nav>
            <ul className="space-y-4">
              <li className="hover:text-blue-500">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemLost">Item Lost</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/itemFound">Item Found</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/activeTicket">Active Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/turnoverTicket">Turnover Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/unclaimedTicket">Unclaimed Tickets</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/myAccount">My Account</Link>
              </li>
              <li className="hover:text-blue-500">
                <Link to="/">Logout</Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Item Description Content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">ITEM DESCRIPTION</h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Image Section */}
              <div className="flex justify-center">
                <img
                  src={item.image}
                  alt={item.itemName}
                  className="w-64 h-64 object-cover rounded-lg"
                />
              </div>

              {/* Details Section */}
              <div>
                <h2 className="text-2xl font-bold mb-4">{item.itemName}</h2>

                <div className="mb-2">
                  <strong>FULL NAME:</strong>
                  <div className="border p-2 rounded">{item.fullName}</div>
                </div>

                <div className="mb-2">
                  <strong>LAST SEEN LOCATION:</strong>
                  <div className="border p-2 rounded">{item.location}</div>
                </div>

                <div className="mb-2">
                  <strong>DESCRIPTION:</strong>
                  <div className="border p-2 rounded">{item.description}</div>
                </div>

                <div className="mb-2">
                  <strong>DATE & TIME:</strong>
                  <div className="border p-2 rounded">{item.dateTime}</div>
                </div>

                <h3 className="text-xl font-bold mt-4 mb-2">Contact Details</h3>

                <div className="mb-2">
                  <strong>FULL NAME:</strong>
                  <div className="border p-2 rounded">{item.fullName}</div>
                </div>

                <div className="mb-2">
                  <strong>CONTACT NUMBER:</strong>
                  <div className="border p-2 rounded">{item.contactNumber}</div>
                </div>

                <div className="mb-2">
                  <strong>E-MAIL ADDRESS:</strong>
                  <div className="border p-2 rounded">{item.email}</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © U-Find Philippines 2024
      </footer>
=======
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
    const coordinates = fromLonLat([longitude, latitude]);

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
        "http://localhost:3000/api/items/claim",
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
      await axios.post("http://localhost:3000/api/messages", messageData);

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
                {/* <div>
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
                </div> */}
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
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
    </div>
  );
};

export default ItemDescription;
