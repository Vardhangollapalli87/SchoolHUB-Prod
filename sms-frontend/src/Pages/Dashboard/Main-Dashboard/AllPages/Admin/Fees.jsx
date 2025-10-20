

import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";

const termAmounts = {
  "First Term": 10000,
  "Mid Term": 15000,
  "Last Term": 15000,
};

const Fees = () => {
  const [students, setStudents] = useState([]);
  const [filterTerm, setFilterTerm] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Fetch all students with fees
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:7000/students");
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  // Handle status change (Due → Paid)
  const handleStatusChange = async (studentID, term) => {
    try {
      await axios.patch(
        `http://localhost:7000/students/fees/${studentID}/term`,
        { term, status: "Paid" }
      );

      // Update frontend dynamically
      setStudents((prev) =>
        prev.map((student) => {
          if (student.studentID === studentID) {
            const updatedFees = student.fees.map((f) =>
              f.term === term
                ? { ...f, status: "Paid", paidOn: new Date().toISOString().split("T")[0] }
                : f
            );
            return { ...student, fees: updatedFees };
          }
          return student;
        })
      );
    } catch (err) {
      console.error("Error updating fee status:", err);
    }
  };

  // Flattened fees for table display with filters
  const displayedFees = students
    .flatMap((student) =>
      student.fees.map((fee) => ({
        studentID: student.studentID,
        term: fee.term,
        status: fee.status,
        paidOn: fee.paidOn,
      }))
    )
    .filter(
      (fee) =>
        (filterTerm === "All" || fee.term === filterTerm) &&
        (filterStatus === "All" || fee.status === filterStatus)
    );

  // Overall summary (ignore filters)
  const totalCollected = students
    .flatMap((s) => s.fees)
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);

  const totalPending = students
    .flatMap((s) => s.fees)
    .filter((f) => f.status !== "Paid")
    .reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);

  const dueCount = students
    .flatMap((s) => s.fees)
    .filter((f) => f.status === "Due").length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Fee Management</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-100 rounded-xl shadow p-5 text-center">
            <p className="text-sm text-gray-500">Total Collected</p>
            <p className="text-2xl font-bold text-green-600">₹{totalCollected}</p>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-5 text-center">
            <p className="text-sm text-gray-500">Total Pending</p>
            <p className="text-2xl font-bold text-yellow-600">₹{totalPending}</p>
          </div>
          <div className="bg-gray-100 rounded-xl shadow p-5 text-center">
            <p className="text-sm text-gray-500">Due Terms</p>
            <p className="text-2xl font-bold text-red-600">{dueCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
          <select
            className="p-2 border border-gray-300 rounded shadow-sm"
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          >
            <option value="All">All Terms</option>
            <option value="First Term">First Term</option>
            <option value="Mid Term">Mid Term</option>
            <option value="Last Term">Last Term</option>
          </select>

          <select
            className="p-2 border border-gray-300 rounded shadow-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
          </select>
        </div>
        <div className="overflow-x-auto bg-gray-100 rounded-2xl shadow-xl">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="px-4 py-3 text-center">Student ID</th>
                <th className="px-4 py-3 text-center">Term</th>
                <th className="px-4 py-3 text-center">Amount (₹)</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Paid On</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedFees.map((fee, idx) => (
                <tr key={idx} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 text-center">{fee.studentID}</td>
                  <td className="px-4 py-2 text-center">{fee.term}</td>
                  <td className="px-4 py-2 text-center">₹{termAmounts[fee.term]}</td>
                  <td
                    className={`px-4 py-2 font-medium text-center ${
                      fee.status === "Paid" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {fee.status}
                  </td>
                  <td className="px-4 py-2 text-center">{fee.paidOn || "-"}</td>
                  <td className="px-4 py-2 text-center">
                    {fee.status === "Due" && (
                      <button
                        onClick={() => handleStatusChange(fee.studentID, fee.term)}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Mark Paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default Fees;
