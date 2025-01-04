<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/user/footer';
import Topbar from '../../components/user/topBar';
import qrImage from '/src/assets/QRCODE.png'; // Path to the QR Code image

const Dashboard = () => {

    const [items, setItems] = useState([]);

    // Fetch data on component mount
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/items?limit=5'); // Adjust endpoint as necessary
                const activeItems = response.data.filter(item => item.ticket === "pending");
                setItems(activeItems);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);
    
    return (
        <div className="min-h-screen bg-gray-100">
            <Topbar />

            <main className="max-w-8xl mx-auto px-10 py-10">
                {/* Hero Section */}
                <section className="text-center mb-10">
                    <div className="flex justify-center items-center space-x-10">
                        <img src="/src/assets/dbheading.jpg" alt="U-FIND Logo" className="w-90 h-80 object-cover" />
                        <div className="text-left max-w-md">
                            <h2 className="text-7xl font-bold text-gray-900 mb-4">U-FIND</h2>
                            <p className="text-justify text-gray-800 mb-12">
                                U-find is a platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins efficiently manage reports.
                            </p>    
                            <Link to="/listLost" className="mt-6">
                                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                                REPORT NOW!
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                 {/* Browse Items Section */}
                 <section className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-10">BROWSE ITEMS</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {items.length > 0 ? (
                            items.slice(0, 5).map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition"
                                >
                                    <Link to={`/items/${item.id}`}>
                                        <img
                                            src={item.imageUrl || '/src/assets/default.png'} // Fallback for missing images
                                            alt={item.name}
                                            className="w-full h-50 object-cover mb-4 rounded-md"
                                        />
                                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                        <div>
                                            <p className="font-medium text-gray-700">Date & Time:</p>
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
                                        <p className={`text-${item.status === 'lost' ? 'red' : 'green'}-500 font-semibold capitalize`}>
                                            {item.status}
                                        </p>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">   No items found.</p>
                        )}
                    </div>

                    {/* View More Button */}
                    <div className="mt-6">
                        <Link to="/browseItemsLost">
                        <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                            VIEW MORE
                        </button>
                        </Link>
                    </div>
                </section>

                {/* Banner Section */}
                <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4">
                    "Because Losing Something Doesn’t Mean It’s Gone Forever."
                </div>



               {/* Features Section */}
                <section className="flex flex-wrap justify-center gap-20 p-10">
                    {[
                        {
                            title: "Easy to Use",
                            description: "The system is simple and easy to understand, so you don’t need much training to use it.",
                            imgSrc: "/src/assets/easytouse.png"
                        },
                        {
                            title: "Reliable",
                            description: "The system works well every time, so you can trust it to do its job without problems.",
                            imgSrc: "/src/assets/easytouse.png"
                        },
                        {
                            title: "Efficient",
                            description: "The system helps you get things done quickly and with little wasted time or effort.",
                            imgSrc: "/src/assets/easytouse.png"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-60 text-center">
                            <div className="flex justify-center mb-4">
                                <img src={feature.imgSrc} alt={`${feature.title} icon`} className="w-16 h-16" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
                            <p className="text-gray-600 mt-2">{feature.description}</p>
                        </div>
                    ))}
                </section>

                {/* About Section */}
                <section className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-10 mx-4 md:mx-12 mb-8 rounded-lg shadow-lg">
                    <div className="flex-shrink-0 mb-4 md:mb-0">
                        <img src="/src/assets/ABOUTUSS.png" alt="Illustration" className="w-full max-w-xs" />
                    </div>
                    <div className="flex-grow md:pl-8">
                        <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded mb-2">
                            ABOUT US
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">U-FIND</h2>
                        <p className="text-justify text-gray-600 mt-5">
                            U-find is a platform for reporting, tracking, and retrieving lost and found items on campus. Secure authentication and real-time notifications help quickly reunite lost items with their owners, while admins manage reports efficiently.
                        </p>
                        <a href="/aboutUs" className="mt-6">
                            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded">
                                READ MORE
                            </button>
                        </a>
                    </div>
                </section>

                {/* Banner Section */}
                <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4">
                        "A Place Where Every Belonging Finds Its Way Back."
                </div>

                {/* Features Content */}
                <div className="text-left my-10 px-4">
                    <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">CHECK OUT THE UNIQUE FEATURES OF U-FIND PLATFORM</h2>
                    <p className="text-justify text-gray-700 mb-10">
                    The Lost and Found App simplifies your workflow by significantly reducing the time and effort required to manage lost items, while also boosting service efficiency and improving customer satisfaction.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">WORKS ON ANY DEVICE</h3>
                            <p className="text-justify text-gray-600">Easily connect and access our service from any device, including tablets, smartphones, desktops, and more, for a seamless experience wherever you are.</p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">SMART MATCHING</h3>
                            <p className="text-justify text-gray-600">Our automated smart matching system eliminates the need for manual searching by quickly and accurately finding what you're looking for.</p>
                        </div>
                        <div className="bg-white shadow-md p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">CUSTOMER SUPPORT</h3>
                            <p className="text-justify text-gray-600">Our support team is available from 8:00 AM to 5:00 PM, Monday to Friday, to assist with lost and found items, and any inquiries outside these hours will be addressed on the next business day.</p>
                        </div>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="mt-10 flex justify-center items-center bg-gray-50 py-10">
                    <div className="flex items-center space-x-10 border border-gray-300 rounded-lg shadow-md px-10 py-6">
                        {/* Text */}
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                TRY IT ON YOUR MOBILE DEVICE
                            </h2>
                            <p className="text-gray-500 text-sm">
                                SCAN TO VIEW ON YOUR MOBILE DEVICE
                            </p>
                        </div>

                        {/* Arrow */}
                        <div className="text-4xl font-thin text-gray-700">&rarr;</div>

                        {/* QR Code */}
                        <img
                            src={qrImage}
                            alt="QR Code"
                            className="w-32 h-32 md:w-40 md:h-40 object-cover"
                        />
                    </div>
                </div>

            </main>
            
            <Footer />
        </div>
    );
=======
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../../components/user/footer";
import Topbar from "../../components/user/topBar";
import qrImage from "/src/assets/QRCODE.png"; // Path to the QR Code image

const Dashboard = () => {
  const [items, setItems] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/items?limit=5"
        ); // Adjust endpoint as necessary
        const activeItems = response.data.filter(
          (item) => item.ticket === "pending"
        );
        setItems(activeItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />

      <main className="max-w-8xl mx-auto px-10 py-10">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <div className="flex justify-center items-center space-x-10">
            <img
              src="/src/assets/dbheading.jpg"
              alt="U-FIND Logo"
              className="w-90 h-80 object-cover"
            />
            <div className="text-left max-w-md">
              <h2 className="text-7xl font-bold text-gray-900 mb-4">U-FIND</h2>
              <p className="text-justify text-gray-800 mb-12">
                U-find is a platform for reporting, tracking, and retrieving
                lost and found items on campus. Secure authentication and
                real-time notifications help quickly reunite lost items with
                their owners, while admins efficiently manage reports.
              </p>
              <Link to="/listLost" className="mt-6">
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                  REPORT NOW!
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Browse Items Section */}
        <section className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            BROWSE ITEMS
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {items.length > 0 ? (
              items.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 text-center hover:shadow-lg transition"
                >
                  <Link to={`/items/${item.id}`}>
                    <img
                      src={item.imageUrl || "/src/assets/default.png"} // Fallback for missing images
                      alt={item.name}
                      className={`w-full h-50 object-cover mb-4 rounded-md ${
                        item.status === "found" ? "filter blur-sm" : ""
                      }`}
                    />
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <div>
                      <p className="font-medium text-gray-700">Date & Time:</p>
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
                    <p
                      className={`text-${
                        item.status === "lost" ? "red" : "green"
                      }-500 font-semibold capitalize`}
                    >
                      {item.status}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-500"> No items found.</p>
            )}
          </div>

          {/* View More Button */}
          <div className="mt-6">
            <Link to="/browseItemsLost">
              <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition">
                VIEW MORE
              </button>
            </Link>
          </div>
        </section>

        {/* Banner Section */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4">
          "Because Losing Something Doesn’t Mean It’s Gone Forever."
        </div>

        {/* Features Section */}
        <section className="flex flex-wrap justify-center gap-20 p-10">
          {[
            {
              title: "Easy to Use",
              description:
                "The system is simple and easy to understand, so you don’t need much training to use it.",
              imgSrc: "/src/assets/easytouse.png",
            },
            {
              title: "Reliable",
              description:
                "The system works well every time, so you can trust it to do its job without problems.",
              imgSrc: "/src/assets/easytouse.png",
            },
            {
              title: "Efficient",
              description:
                "The system helps you get things done quickly and with little wasted time or effort.",
              imgSrc: "/src/assets/easytouse.png",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-8 w-full sm:w-60 text-center"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={feature.imgSrc}
                  alt={`${feature.title} icon`}
                  className="w-16 h-16"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </section>

        {/* About Section */}
        <section className="flex flex-col md:flex-row justify-between items-center bg-white p-6 md:p-10 mx-4 md:mx-12 mb-8 rounded-lg shadow-lg">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <img
              src="/src/assets/ABOUTUSS.png"
              alt="Illustration"
              className="w-full max-w-xs"
            />
          </div>
          <div className="flex-grow md:pl-8">
            <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded mb-2">
              ABOUT US
            </button>
            <h2 className="text-2xl font-bold text-gray-800">U-FIND</h2>
            <p className="text-justify text-gray-600 mt-5">
              U-find is a platform for reporting, tracking, and retrieving lost
              and found items on campus. Secure authentication and real-time
              notifications help quickly reunite lost items with their owners,
              while admins manage reports efficiently.
            </p>
            <a href="/aboutUs" className="mt-6">
              <button className="bg-blue-500 text-white font-bold px-4 py-2 rounded">
                READ MORE
              </button>
            </a>
          </div>
        </section>

        {/* Banner Section */}
        <div className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 text-center text-white py-4">
          "A Place Where Every Belonging Finds Its Way Back."
        </div>

        {/* Features Content */}
        <div className="text-left my-10 px-4">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-4">
            CHECK OUT THE UNIQUE FEATURES OF U-FIND PLATFORM
          </h2>
          <p className="text-justify text-gray-700 mb-10">
            The Lost and Found App simplifies your workflow by significantly
            reducing the time and effort required to manage lost items, while
            also boosting service efficiency and improving customer
            satisfaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                WORKS ON ANY DEVICE
              </h3>
              <p className="text-justify text-gray-600">
                Easily connect and access our service from any device, including
                tablets, smartphones, desktops, and more, for a seamless
                experience wherever you are.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                SMART MATCHING
              </h3>
              <p className="text-justify text-gray-600">
                Our automated smart matching system eliminates the need for
                manual searching by quickly and accurately finding what you're
                looking for.
              </p>
            </div>
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                CUSTOMER SUPPORT
              </h3>
              <p className="text-justify text-gray-600">
                Our support team is available from 8:00 AM to 5:00 PM, Monday to
                Friday, to assist with lost and found items, and any inquiries
                outside these hours will be addressed on the next business day.
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="mt-10 flex justify-center items-center bg-gray-50 py-10">
          <div className="flex items-center space-x-10 border border-gray-300 rounded-lg shadow-md px-10 py-6">
            {/* Text */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                TRY IT ON YOUR MOBILE DEVICE
              </h2>
              <p className="text-gray-500 text-sm">
                SCAN TO VIEW ON YOUR MOBILE DEVICE
              </p>
            </div>

            {/* Arrow */}
            <div className="text-4xl font-thin text-gray-700">&rarr;</div>

            {/* QR Code */}
            <img
              src={qrImage}
              alt="QR Code"
              className="w-32 h-32 md:w-40 md:h-40 object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
>>>>>>> d706f433329312b8dac206e6393ea2642b090a6a
};

export default Dashboard;
