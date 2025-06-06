import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";
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

const DashboardAdmin = () => {
  const hostUrl = import.meta.env.VITE_HOST_URL
  const [itemCounts, setItemCounts] = useState({
    itemsFound: 0,
    itemLost: 0,
    ticketsClaimed: 0,
    keepTickets: 0, 
    turnoverTickets: 0, 
    unclaimedTickets: 0, 

  });
  const [ticketTrends, setTicketTrends] = useState([]);

  // Fetch items and calculate counts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${hostUrl}/api/items`);
        const items = response.data;

        // Calculate counts based on status
        const counts = {
          itemsFound: items.filter(item => item.status === 'found').length,
          itemLost: items.filter(item => item.status === 'lost').length,
          ticketsClaimed: items.filter(item => item.ticket === 'success').length,
          keepTickets: items.filter(item => item.claimStatus === 'keep').length,
          turnoverTickets: items.filter(item => item.claimStatus === 'turnover').length,
          unclaimedTickets: items.filter(item => item.claimStatus === 'unclaimed').length, 
        };

        setItemCounts(counts);

        // Calculate ticket trends based on item.dateTime
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const trends = items.reduce((acc, item) => {
          if (item.dateTime) {
            const date = new Date(item.dateTime);
            const month = months[date.getMonth()];
            acc[month] = (acc[month] || 0) + 1;
          }
          return acc;
        }, {});

        // Prepare trends data for the chart
        const trendData = months.map(month => trends[month] || 0); // Fill missing months with 0
        setTicketTrends(trendData);
      } catch (error) {
        console.error("Error fetching items:", error.message);
      }
    };

    fetchItems();
  }, []);

  // Data for Donut Chart
  const donutData = {
    labels: ["Lost Items", "Found Items", "Claimed Tickets", "Keep Tickets", "Turnover Tickets", "Unclaimed Tickets"],
    datasets: [
      {
        data: [
          itemCounts.itemLost,
          itemCounts.itemsFound,
          itemCounts.ticketsClaimed,
          itemCounts.keepTickets,
          itemCounts.turnoverTickets,
          itemCounts.unclaimedTickets, // Add Unclaimed Tickets data
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FFCD56", "#FF6666"], // Add a new color
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FF9F40", "#FFCD56", "#FF6666"],
      },
    ],
  };
  

  // Data for Bar Chart (Ticket Trends)
  const barData = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        label: "Tickets",
        data: ticketTrends,
        backgroundColor: "#36A2EB",
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.itemLost} Item Lost
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.itemsFound} Item Found
            </div>
            <div className="bg-blue-100 text-blue-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.ticketsClaimed} Completed Tickets
            </div>
            <div className="bg-green-100 text-green-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.keepTickets} Kept Tickets {/* Added Keep Tickets stat */}
            </div>
            <div className="bg-yellow-100 text-yellow-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.turnoverTickets} Turnover Tickets {/* Added Turnover Tickets stat */}
            </div>
            <div className="bg-red-100 text-red-900 p-4 rounded-lg shadow-sm text-center font-bold">
              {itemCounts.unclaimedTickets} Unclaimed Tickets
            </div>

          </div>

          {/* Graphs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Donut Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4"> ITEMS AND TICKETS REPORTED </h2>
              <Doughnut data={donutData} />
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold text-center mb-4">MONTHLY TICKETS REPORT</h2>
              <Bar data={barData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
