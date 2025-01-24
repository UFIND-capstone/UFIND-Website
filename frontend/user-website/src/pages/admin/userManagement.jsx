import React, { useState, useEffect } from "react";
import { db, collection, getDocs, query, where, updateDoc, doc } from "../../config/firebase";
import Sidebar from "../../components/admin/sideBar";
import Topbar from "../../components/admin/topBar";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetch users from Firebase
  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(usersRef);
      const usersData = querySnapshot.docs
        .filter((doc) => doc.id !== "admin") // Exclude admin by document ID
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setUsers(usersData);
      setFilteredUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };  

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  // Update individual user status
  const updateUserStatus = async (id, newStatus) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { status: newStatus });
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
      );
      setFilteredUsers((prevFiltered) =>
        prevFiltered.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
      );
    } catch (error) {
      console.error(`Error updating user status to ${newStatus}:`, error);
    }
  };

  // Block selected users
  const handleBulkBlock = () => {
    if (selectedUsers.length === 0) return;

    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user && user.status !== "blocked") {
        updateUserStatus(userId, "blocked");
      }
    });
    setSelectedUsers([]);
  };

  // Unblock selected users
  const handleBulkUnblock = () => {
    if (selectedUsers.length === 0) return;

    selectedUsers.forEach((userId) => {
      const user = users.find((u) => u.id === userId);
      if (user && user.status !== "active") {
        updateUserStatus(userId, "active");
      }
    });
    setSelectedUsers([]);
  };

  // Toggle user selection
  const toggleUserSelection = (id) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((userId) => userId !== id)
        : [...prevSelected, id]
    );
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

          <div className="flex mb-4 space-x-4">
            <button
              onClick={handleBulkBlock}
              className="px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              disabled={selectedUsers.length === 0}
            >
              Block Selected Users
            </button>
            <button
              onClick={handleBulkUnblock}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
              disabled={selectedUsers.length === 0}
            >
              Unblock Selected Users
            </button>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold">
                  <th className="py-3 px-6">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map((user) => user.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={
                        selectedUsers.length > 0 &&
                        selectedUsers.length === filteredUsers.length
                      }
                    />
                  </th>
                  <th className="py-3 px-6">Student ID</th>
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
                      <td className="py-3 px-6">
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                        />
                      </td>
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
                            onClick={() => updateUserStatus(user.id, "blocked")}
                            className="w-24 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                          >
                            Block
                          </button>
                        ) : (
                          <button
                            onClick={() => updateUserStatus(user.id, "active")}
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
                      colSpan="7"
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
