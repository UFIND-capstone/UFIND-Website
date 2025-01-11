import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const hostUrl = import.meta.env.VITE_HOST_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${hostUrl}/api/user/get/all`);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter((user) =>
      user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const updateUserStatus = async (id, status) => {
    try {
      await axios.put(`${hostUrl}/api/user/status/update-status`, { id, status });
      await fetchUsers(); // Fetch users again after updating status
    } catch (error) {
      console.error(`Error ${status === "blocked" ? "blocking" : "unblocking"} user:`, error);
    }
  };

  const blockUser = (id) => {
    updateUserStatus(id, "blocked");
  };

  const unblockUser = (id) => {
    updateUserStatus(id, "active");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="p-6 bg-gray-100">
          <h1 className="text-4xl font-bold mb-6 text-center">USERS MANAGEMENT</h1>

          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by full name..."
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

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold">
                  <th className="py-3 px-6">Student Id</th>
                  <th className="py-3 px-6">Email Address</th>
                  <th className="py-3 px-6">First Name</th>
                  <th className="py-3 px-6">Last Name</th>
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
                      <td className="py-3 px-6">{user.id}</td>
                      <td className="py-3 px-6">{user.emailAddress}</td>
                      <td className="py-3 px-6">{user.firstName}</td>
                      <td className="py-3 px-6">{user.lastName}</td>
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
                      colSpan="6"
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
