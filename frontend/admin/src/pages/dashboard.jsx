import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sideBar';
import Topbar from '../components/topBar';
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

const Dashboard = () => {
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
        data: [itemCounts.itemLost, itemCounts.itemsFound, 15, 10, 8],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  // Data for Bar Chart
  const barData = {
    labels: ["August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Tickets",
        data: [50, 40, 60, 70, 20],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        
      },
      
    ],
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-4xl font-bold mb-6 text-center">ADMIN DASHBOARD</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.itemLost} Item Lost
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.itemsFound} Item Found
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.matchItems} Matched Items
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.ticketing} Active Tickets
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              0 Unclaimed Tickets
            </div>
          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Donut Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">OVERALL TICKETS</h2>
              <Doughnut data={donutData} />
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">ITEM LOST</h2>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">ITEM FOUND</h2>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">ACTIVE TICKET</h2>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">TURNOVER TICKET</h2>
              <Bar data={barData} />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">UNCLAIMED TICKET</h2>
              <Bar data={barData} />
            </div>

          </div>
        </main>
      
      </div>
    </div>
  );
  
};

export default Dashboard;
