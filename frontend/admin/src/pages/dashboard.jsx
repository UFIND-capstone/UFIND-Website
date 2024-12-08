import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const dashboard = () => {

  const [itemCounts, setItemCounts] = useState({
    itemsFound: 0,
    itemLost: 0,
    matchItems: 0,
    ticketing: 0,
});

// Fetch items and calculate counts
useEffect(() => {
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/items'); // Adjust the URL as needed
            const items = response.data;

            // Calculate counts based on status
            const counts = {
                itemsFound: items.filter(item => item.status === 'Found').length,
                itemLost: items.filter(item => item.status === 'Lost').length,
                matchItems: items.filter(item => item.category === 'Match').length,
                ticketing: items.filter(item => item.category === 'Ticketing').length,
            };

            setItemCounts(counts);
        } catch (error) {
            console.error("Error fetching items:", error.message);
        }
    };

    fetchItems();
}, []);
  // Data for Donut Chart
  const donutData = {
    labels: ["Lost Items", "Found Items", "Active Tickets", "Turnover Tickets", "Unclaimed Tickets"],
    datasets: [
      {
        data: [69, 69, 69, 69, 69],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
      {
        label: "Tickets",
        data: [50, 40, 60, 70, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Topbar */}
      <div className="bg-blue-500 text-white flex justify-between items-center px-6 py-4 shadow-md">
        <div className="text-4xl font-bold">U-Find</div>
        <div className="flex items-center space-x-4">
          <button className="text-white">
            <i className="fas fa-bell"></i>
          </button>
          <img
            src="src/assets/PROFILE.png"
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
              src="src/assets/PROFILE.png"
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

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-6 text-center">ADMIN DASHBOARD</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {["Item Lost", "Item Found", "Active", "Turnover", "Unclaimed"].map((title, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm flex items-center justify-center font-bold"
              >
                69 {title}
              </div>
            ))}
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Donut Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">OVERALL TICKETS</h2>
              <Doughnut data={donutData} />
            </div>

            {/* Bar Charts */}
            {["Lost Items", "Found Items", "Active Tickets", "Turnover Tickets", "Unclaimed Tickets"].map(
              (title, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                  <h2 className="text-lg font-bold text-center mb-4">{title}</h2>
                  <Bar data={barData} />
                </div>
              )
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        © U-Find Philippines 2024
      </footer>
    </div>
  );
};

export default dashboard;
