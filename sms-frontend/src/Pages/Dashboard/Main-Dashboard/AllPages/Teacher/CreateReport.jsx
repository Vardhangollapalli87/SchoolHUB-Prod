


import React, { useState } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";

const Discharge_and_Create_Slip = () => {
  const [classSelected, setClassSelected] = useState("");
  const [sectionSelected, setSectionSelected] = useState("");
  const [students, setStudents] = useState([]);
  const [activeStudent, setActiveStudent] = useState(null);
  const [mark, setMark] = useState({ subject: "", score: "", total: "" });
  const [marks, setMarks] = useState({}); // store marks per student
  const [submitted, setSubmitted] = useState({}); // success state per student

  // Dummy students data
  const dummyData = {
    "7A": [
      { _id: "1", rollNo: "101", name: "Rahul Sharma" },
      { _id: "2", rollNo: "102", name: "Ananya Gupta" },
    ],
    "7B": [
      { _id: "3", rollNo: "201", name: "Vikram Reddy" },
      { _id: "4", rollNo: "202", name: "Meena Kumari" },
    ],
  };

  const loadStudents = () => {
    if (!classSelected || !sectionSelected) return;
    const key = `${classSelected}${sectionSelected}`;
    setStudents(dummyData[key] || []);
  };

  const handleMarkChange = (e) => {
    setMark({ ...mark, [e.target.name]: e.target.value });
  };

  const handleMarkAdd = (studentId) => {
    if (!mark.subject || !mark.score || !mark.total) return;
    setMarks((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), mark],
    }));
    setMark({ subject: "", score: "", total: "" });
  };

  const submitReport = (studentId) => {
    console.log("📌 Report Submitted:", {
      studentId,
      marks: marks[studentId] || [],
    });

    // show success for that student
    setSubmitted((prev) => ({ ...prev, [studentId]: true }));

    // auto-hide success message after 3s
    setTimeout(() => {
      setSubmitted((prev) => ({ ...prev, [studentId]: false }));
    }, 3000);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Student Report</h1>

        {/* Class / Section */}
        <div className="flex gap-4 mb-6">
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => setClassSelected(e.target.value)}
          >
            <option value="">Select Class</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
          </select>
          <select
            className="border px-3 py-2 rounded-lg"
            onChange={(e) => setSectionSelected(e.target.value)}
          >
            <option value="">Select Section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            onClick={loadStudents}
          >
            Load Students
          </button>
        </div>

        {/* Students List */}
        <div className="bg-white shadow rounded-lg p-4">
          {students.length === 0 ? (
            <p className="text-gray-500">No students loaded</p>
          ) : (
            <table className="w-full border rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-3 py-2 border">Roll No</th>
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td className="px-3 py-2 border">{s.rollNo}</td>
                    <td className="px-3 py-2 border">{s.name}</td>
                    <td className="px-3 py-2 border text-center">
                      <button
                        onClick={() =>
                          setActiveStudent(
                            activeStudent === s._id ? null : s._id
                          )
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
                      >
                        {activeStudent === s._id ? "Close" : "Add Report"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Marks Input for Active Student */}
        {activeStudent && (
          <div className="mt-6 bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Add Marks for{" "}
              {students.find((s) => s._id === activeStudent)?.name}
            </h2>

            <div>
              <label className="block font-semibold mb-2">Marks</label>
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  name="subject"
                  value={mark.subject}
                  onChange={handleMarkChange}
                  placeholder="Subject"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  name="score"
                  value={mark.score}
                  onChange={handleMarkChange}
                  placeholder="Score"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  name="total"
                  value={mark.total}
                  onChange={handleMarkChange}
                  placeholder="Total"
                  className="flex-1 border rounded-lg px-3 py-2"
                />
                <button
                  onClick={() => handleMarkAdd(activeStudent)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>

              {/* Marks Table */}
              {(marks[activeStudent] || []).length > 0 && (
                <table className="w-full mt-4 border rounded-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-3 py-2 border">Subject</th>
                      <th className="px-3 py-2 border">Score</th>
                      <th className="px-3 py-2 border">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks[activeStudent].map((m, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 border">{m.subject}</td>
                        <td className="px-3 py-2 border">{m.score}</td>
                        <td className="px-3 py-2 border">{m.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <button
              onClick={() => submitReport(activeStudent)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Submit Report
            </button>

            {/* Success message */}
            {submitted[activeStudent] && (
              <p className="mt-3 text-green-600 font-medium">
                 Report submitted successfully for{" "}
                {students.find((s) => s._id === activeStudent)?.name}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Discharge_and_Create_Slip;
