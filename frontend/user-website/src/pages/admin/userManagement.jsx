import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Users
  const sampleUsers = [
    {
      id: 1,
      studentId: "2024696969",
      fullName: "Frincess Salvany",
      status: "active",
    },
    {
      id: 2,
      studentId: "2024696969",
      fullName: "Joshy Delos Reyes",
      status: "blocked",
    },
    {
      id: 3,
      studentId: "2024696969",
      fullName: "Rey Valera",
      status: "active",
    },
    {
      id: 4,
      studentId: "2024696969",
      fullName: "Rickyboy Diez",
      status: "active",
    },
    {
      id: 5,
      studentId: "2024696969",
      fullName: "Simone Rara",
      status: "blocked",
    },
  ];

  // Initialize Users
  useEffect(() => {
    setUsers(sampleUsers);
    setFilteredUsers(sampleUsers);
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      user.fullName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Block User
  const blockUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "blocked" } : user
      )
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "blocked" } : user
      )
    );
  };

  // Unblock User
  const unblockUser = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "active" } : user
      )
    );
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: "active" } : user
      )
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar */}
        <Topbar />

        {/* Manage Users Content */}
        <main className="p-6 bg-gray-100">
          <h1 className="text-4xl font-bold mb-6 text-center">USERS MANAGEMENT</h1>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full max-w-md p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="px-6 py-4 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-300"
              onClick={() => handleSearch({ target: { value: searchQuery } })}
            >
              🔍
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold">
                  <th className="py-3 px-6">Student ID</th>
                  <th className="py-3 px-6">Full Name</th>
                  <th className="py-3 px-6">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-gray-100 transition duration-300"
                    >
                      <td className="py-3 px-6">{user.studentId}</td>
                      <td className="py-3 px-6">{user.fullName}</td>
                      <td
                        className={`py-3 px-6 font-semibold ${
                          user.status === "active"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {user.status}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {user.status === "active" ? (
                            <button
                            onClick={() => blockUser(user.id)}
                            className="w-24 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                            >
                            Block
                            </button>
                        ) : (
                            <button
                            onClick={() => unblockUser(user.id)}
                            className="w-24 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
                            >
                            Unblock
                            </button>
                        )}
                        </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-center text-gray-500 font-medium"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ManageUsers;
