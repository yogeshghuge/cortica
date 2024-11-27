// components/MarkAttendance.js
import React, { useState } from "react";
import { markAttendance } from "../api";

const MarkAttendance = () => {
  const [selfie, setSelfie] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("selfie", selfie);
    try {
      await markAttendance(formData, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Attendance marked successfully!");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setSelfie(e.target.files[0])} />
      <button type="submit">Mark Attendance</button>
    </form>
  );
};

export default MarkAttendance;
