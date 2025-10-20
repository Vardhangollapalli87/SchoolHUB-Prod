


import React, { useState, useEffect } from "react";
import { FaPen, FaImage } from "react-icons/fa";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const DoubtsPage = () => {
  const [doubts, setDoubts] = useState([]);
  const [filteredDoubts, setFilteredDoubts] = useState([]);
  const [activeDoubt, setActiveDoubt] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [answerImage, setAnswerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);

  const [filterSubject, setFilterSubject] = useState("");
  const [filterClass, setFilterClass] = useState("");

  // Fetch doubts from backend using GET
  const fetchDoubts = async () => {
    try {
      const res = await fetch("http://localhost:7000/doubts");
      if (!res.ok) throw new Error("Failed to fetch doubts");

      const data = await res.json();
      if (Array.isArray(data)) {
        setDoubts(data);
        setFilteredDoubts(data);
      } else {
        notify("Invalid data received from server");
        setDoubts([]);
        setFilteredDoubts([]);
      }
    } catch (err) {
      console.error(err);
      notify("Network error while fetching doubts");
      setDoubts([]);
      setFilteredDoubts([]);
    }
  };

  useEffect(() => {
    fetchDoubts();
  }, []);

  // Filter doubts based on subject/class
  useEffect(() => {
    let temp = [...doubts];
    if (filterSubject) temp = temp.filter((d) => d.subject === filterSubject);
    if (filterClass) temp = temp.filter((d) => d.class === filterClass);
    setFilteredDoubts(temp);
  }, [filterSubject, filterClass, doubts]);

  const handleAnswerSubmit = async () => {
    if (!activeDoubt) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("answer", answerText);
    if (answerImage) formData.append("image", answerImage);
    formData.append("status", "Answered");

    try {
      const res = await fetch(`http://localhost:7000/doubts/${activeDoubt}`, {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        notify("Doubt answered successfully!");
        setActiveDoubt(null);
        setAnswerText("");
        setAnswerImage(null);
        setShowImageInput(false);
        fetchDoubts(); // refresh table
      } else {
        notify(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      notify("Network error, please try again");
    }

    setLoading(false);
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={2000} />
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Student Doubts</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-4">
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Subjects</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="socialScience">Social Science</option>
            <option value="english">English</option>
            <option value="general">General</option>
            <option value="telugu">Telugu</option>
          </select>

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Classes</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                Class {i + 1}
              </option>
            ))}
          </select>
        </div>

        {/* Doubts Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Student ID</th>
                <th className="p-2">Class</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Question</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDoubts.map((doubt) => (
                <tr key={doubt._id} className="border-b">
                  <td className="p-2">{doubt.studentID}</td>
                  <td className="p-2">{doubt.class}</td>
                  <td className="p-2">{doubt.subject}</td>
                  <td className="p-2 line-clamp-2" style={{ whiteSpace: "pre-wrap" }}>
                    {doubt.details}
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        doubt.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {doubt.status}
                    </span>
                  </td>
                  <td className="p-2">
                    {doubt.status === "Pending" && (
                      <button
                        onClick={() => setActiveDoubt(doubt._id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaPen />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Answer Box */}
        {activeDoubt && (
          <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
            <h2 className="font-semibold mb-2">Question</h2>
            <div
              className="w-full p-2 border rounded mb-4 text-gray-800"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {filteredDoubts.find((d) => d._id === activeDoubt)?.details}
            </div>

            <h2 className="font-semibold mb-2">Write Answer</h2>
            <textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full p-2 border rounded mb-2 resize-none h-24"
              style={{ whiteSpace: "pre-wrap" }}
            />

            {!showImageInput && (
              <button
                onClick={() => setShowImageInput(true)}
                className="flex items-center gap-1 px-3 py-1 mb-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                <FaImage /> Add Image
              </button>
            )}

            {showImageInput && (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAnswerImage(e.target.files[0])}
                className="mb-2"
              />
            )}

            <button
              onClick={handleAnswerSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Answer"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtsPage;

