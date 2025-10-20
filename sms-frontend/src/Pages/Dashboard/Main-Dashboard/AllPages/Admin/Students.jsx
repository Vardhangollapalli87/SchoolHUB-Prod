



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import { FaThLarge, FaList, FaTimes } from "react-icons/fa";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [view, setView] = useState("table");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [editStudent, setEditStudent] = useState(null);
  const [filterClass, setFilterClass] = useState("All");

  useEffect(() => {
    fetch("http://localhost:7000/students")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => a.class.localeCompare(b.class));
        setStudents(sorted);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/students/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
        setConfirmDelete(null);
      }
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const filteredStudents =
    filterClass === "All"
      ? students
      : students.filter((s) => s.class === filterClass);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Students
            </h1>
            <div className="flex items-center gap-3">
              {/* Filter */}
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm"
              >
                <option value="All">All Classes</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={`${i + 1}`}>
                    Class {i + 1}
                  </option>
                ))}
              </select>

              {/* View Toggle */}
              <button
                onClick={() => setView("table")}
                className={`p-2 rounded-lg border ${
                  view === "table"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                <FaList />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg border ${
                  view === "grid"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                <FaThLarge />
              </button>

              <button
                onClick={() => navigate("/addstudent")}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
              >
                + Add Student
              </button>
            </div>
          </div>

          {/* === GRID VIEW === */}
          {view === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student._id}
                  className="relative bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md 
                            rounded-md p-6 flex flex-col items-center hover:shadow-xl 
                            hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Student ID Badge */}
                  <span className="absolute top-3 left-3 text-xs font-semibold bg-blue-100 text-blue-600 
                                  px-2 py-0.5 rounded-md shadow-sm">
                    {student.studentID}
                  </span>

                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-200 shadow-md">
                    <img
                      src={student.image || "https://via.placeholder.com/150"}
                      alt={student.studentName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Student Info */}
                  <h3 className="mt-3 text-lg font-semibold text-gray-800 text-center">
                    {student.studentName}
                  </h3>
                  <p className="text-sm text-gray-500">Class {student.class}</p>
                  <p className="text-xs text-gray-600 mt-1">{student.email}</p>

                  {/* Divider */}
                  <div className="w-full border-t border-gray-200 my-4"></div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg shadow-sm 
                                hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                    <button
                      onClick={() => setEditStudent(student)}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg shadow-sm 
                                hover:bg-green-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setConfirmDelete(student)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg shadow-sm 
                                hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* === TABLE VIEW === */}
          {view === "table" && (
            <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-xl">ID</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Class</th>
                    <th className="px-4 py-3 rounded-tr-xl text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student, idx) => (
                    <tr
                      key={student._id}
                      className={idx % 2 === 0 ? "bg-gray-50 hover:bg-gray-100" : "hover:bg-gray-100"}
                    >
                      <td className="px-4 py-3 font-semibold text-gray-700">{student.studentID}</td>
                      <td className="px-4 py-3">{student.studentName}</td>
                      <td className="px-4 py-3">{student.email}</td>
                      <td className="px-4 py-3">{student.class}</td>
                      <td className="px-4 py-3 flex justify-center gap-2">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setEditStudent(student)}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setConfirmDelete(student)}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


        </div>
      </div>

      {/* Overlays */}

      {/* VIEW */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Student Details</h2>
            <div className="space-y-2 text-sm">
              <p><strong>ID:</strong> {selectedStudent.studentID}</p>
              <p><strong>Name:</strong> {selectedStudent.studentName}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Class:</strong> {selectedStudent.class}</p>
              <p><strong>Mobile:</strong> {selectedStudent.mobile}</p>
              <p><strong>Gender:</strong> {selectedStudent.gender}</p>
              <p><strong>DOB:</strong> {selectedStudent.DOB}</p>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {confirmDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-md font-semibold mb-3">Confirm Delete</h2>
            <p className="text-sm text-gray-600 mb-4">
              Delete <strong>{confirmDelete.studentName}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDelete(confirmDelete._id)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-300 text-sm rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT */}
      {editStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setEditStudent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
            >
              <FaTimes />
            </button>
            <h2 className="text-lg font-semibold mb-4">Edit Student</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await fetch(`http://localhost:7000/students/${editStudent._id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editStudent),
                  });
                  setEditStudent(null);
                  window.location.reload();
                } catch (err) {
                  console.error("Update failed", err);
                }
              }}
              className="space-y-4 text-sm"
            >
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  value={editStudent.studentName}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, studentName: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  value={editStudent.email}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, email: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Class</label>
                <select
                  value={editStudent.class}
                  onChange={(e) =>
                    setEditStudent({ ...editStudent, class: e.target.value })
                  }
                  className="w-full p-2 border rounded-lg"
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <option key={i + 1} value={`${i + 1}`}>
                      Class {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
