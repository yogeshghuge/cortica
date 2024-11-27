// components/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users
    axios.get("/api/admin/users", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const disableUser = (userId) => {
    axios.put(`/api/admin/users/${userId}/disable`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then(() => alert("User disabled successfully"))
      .catch((error) => console.error("Error disabling user:", error));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => disableUser(user.id)}>Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
