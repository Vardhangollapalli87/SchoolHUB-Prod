import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch} from "react-redux";
import {SendPassword } from "../../../../../Redux/auth/action";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const AddStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentID: "",
    studentName: "",
    email: "",
    class: "",
    password: "",
  });
  const [confirm, setConfirm] = useState(false);

  // Fetch existing students to calculate next ID
  useEffect(() => {
    fetch("/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);

        // Determine next student ID based on the last entered student
        let nextIdNumber = 1;
        if (data.length > 0) {
          // Sort descending by numeric part of ID
          const sorted = data.sort((a, b) => {
            const idA = parseInt(a.studentID.replace("S", ""));
            const idB = parseInt(b.studentID.replace("S", ""));
            return idB - idA;
          });

          const lastId = parseInt(sorted[0].studentID.replace("S", ""));
          nextIdNumber = lastId + 1;
        }

        const nextId = `S${String(nextIdNumber).padStart(3, "0")}`;
        setForm((prev) => ({ ...prev, studentID: nextId, password: `${nextId}123` }));
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async () => {
  try {
    const res = await fetch("/students/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Dispatch SendPassword using Redux like your admin example
      const emailData = {
        email: form.email,
        password: form.password,
        userId: form.studentID,
      };

      dispatch(SendPassword(emailData));
      console.log("Account Details Sent");

      navigate("/students");
    }
  } catch (error) {
    console.error("Error adding student:", error);
  }
};


  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Add Student
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setConfirm(true);
            }}
            className="space-y-4 text-sm"
          >
            {/* Student ID */}
            <div>
              <label className="block mb-1 font-medium">Student ID</label>
              <input
                type="text"
                value={form.studentID}
                readOnly
                className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="studentName"
                value={form.studentName}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter student name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
                placeholder="Enter email"
              />
            </div>

            {/* Class */}
            <div>
              <label className="block mb-1 font-medium">Class</label>
              <select
                name="class"
                value={form.class}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Class</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}`}>
                    Class {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/students")}
                className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Popup */}
      {confirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-md font-semibold mb-3">Confirm Submission</h2>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to add <strong>{form.studentName}</strong> to {form.class}?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
              >
                Yes, Add
              </button>
              <button
                onClick={() => setConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-sm rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
