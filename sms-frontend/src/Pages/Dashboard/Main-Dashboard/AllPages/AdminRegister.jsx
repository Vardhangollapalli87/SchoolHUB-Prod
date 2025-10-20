import React, { useState } from "react";
import "./AdminRegister.css";
import axios from "axios";
// import {
//   SendPassword
// } from '../../../../Redux/auth/action.js'; // 👈 import the function

const AdminRegister = ({ onSuccess ,onClose}) => {   // 👈 receive prop
  const [formData, setFormData] = useState({
    adminId: "",
    adminName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" | "error" | "warning"


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }


// Inside your try-catch flow:
try {
  // 1️⃣ Step 1: Verify Email
  const verify = await axios.post("http://localhost:7000/verify-email", {
    email: formData.email,
  });

  if (!verify.data.success) {
    setMessage("Invalid email. Please use a valid Gmail.");
    setMessageType("error");
    return;
  }

  // 2️⃣ Step 2: Register
  const res = await axios.post("http://localhost:7000/admin/register", {
    adminID: formData.adminId,
    adminName: formData.adminName,
    email: formData.email,
    password: formData.password,
  });

  if (res.data.success) {
    // 3️⃣ Step 3: Send password email
    const msg = await axios.post("http://localhost:7000/admin/password", {
      email: formData.email,
      userId: formData.adminId,
      password: formData.password,
    });

    if (msg.data.success) {
      setMessage("Admin registered & email sent successfully!");
      setMessageType("success");
    } else {
      setMessage(" Admin registered but email sending failed.");
      setMessageType("warning");
    }
    } else {
      setMessage(res.data.message || "Admin already exists with Mail!");
      setMessageType("warning");
    }

    // Small delay before redirect
    setTimeout(() => {
      if (onSuccess) onSuccess();
    }, 2000);

  } catch (error) {
    console.error("❌ Error during registration:", error);
    setMessage("Registration failed. Please try again.");
    setMessageType("error");
  }
  
  };

  return (
    <div style={{ /*maxWidth: "400px"*/ /*padding: "20px"*/ }}>
      <h2>Admin Register</h2>
      <span
        onClick={onClose} 
        style={{
          position: "absolute",
          top: "10px",
          right: "15px",
          cursor: "pointer",
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333"
        }}
      >
        ×
      </span>
      <form onSubmit={handleSubmit}>
        {/* Admin ID */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px", width: "100%" }}>
          <label style={{ width: "150px", fontWeight: "600" }}>Admin ID:</label>
          <input
            type="text"
            name="adminId"
            style={{
        // width: "100%",
        height: "2.8rem",
        // padding: "10px 12px",
        border: "2px solid #bce0fb",
        borderRadius: "25px",
        fontSize: "1rem",
        backgroundColor: "#f9fcff",
        boxSizing: "border-box"
      }}
            value={formData.adminId}
            onChange={handleChange}
            required
          />
        </div>

        {/* Admin Name */}
        <div style={{ display:"flex",alignItems:"center",marginBottom: "10px",width:"100%"}}>
          <label style={{ width: "150px", fontWeight: "600" }}>Admin Name:</label>
          <input
            type="text"
            name="adminName"
            style={{
              width: "100%",
              height: "2.8rem",
              // padding: "10px 12px",
              border: "2px solid #bce0fb",
              borderRadius: "25px",
              fontSize: "1rem",
              backgroundColor: "#f9fcff",
              boxSizing: "border-box"
            }}
            value={formData.adminName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div style={{ display:"flex",alignItems:"center",marginBottom: "10px",width:"100%"}}>
          <label style={{ width: "150px", fontWeight: "600" }}>Email:</label>
          <input
            type="email"
            name="email"
            style={{
              width: "100%",
              height: "2.8rem",
              // padding: "10px 12px",
              border: "2px solid #bce0fb",
              borderRadius: "25px",
              fontSize: "1rem",
              backgroundColor: "#f9fcff",
              boxSizing: "border-box"
            }}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div style={{ display:"flex",alignItems:"center",marginBottom: "10px",width:"100%"}}>
          <label style={{ width: "150px", fontWeight: "600" }}>Password:</label>
          <input
            type="password"
            name="password"
            style={{
              width: "100%",
              height: "2.8rem",
              // padding: "10px 12px",
              border: "2px solid #bce0fb",
              borderRadius: "25px",
              fontSize: "1rem",
              backgroundColor: "#f9fcff",
              boxSizing: "border-box"
            }}
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Confirm Password */}
        <div style={{ display:"flex",alignItems:"center",marginBottom: "10px",width:"100%"}}>
          <label style={{ width: "150px", fontWeight: "600" }}>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            style={{
              width: "100%",
              height: "2.8rem",
              // padding: "10px 12px",
              border: "2px solid #bce0fb",
              borderRadius: "25px",
              fontSize: "1rem",
              backgroundColor: "#f9fcff",
              boxSizing: "border-box"
            }}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Register</button>
      </form>

      {message && <p style={{
          color:
            messageType === "success"
              ? "green"
              : messageType === "error"
              ? "red"
              : "green",
          fontWeight: "600",
          marginTop: "10px",
        }}>{message}</p>}
    </div>
  );
};

export default AdminRegister;
