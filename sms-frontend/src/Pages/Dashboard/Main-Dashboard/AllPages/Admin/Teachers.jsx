import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, "0")}-${String(
    d.getMonth() + 1
  ).padStart(2, "0")}-${d.getFullYear()}`;
};

const Teachers = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewTeacher, setViewTeacher] = useState(null);
  const [editTeacher, setEditTeacher] = useState(null);
  const [deleteTeacher, setDeleteTeacher] = useState(null);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/teachers");
      const data = await res.json();
      setTeachers(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notify("Failed to fetch teachers");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleView = async (teacherID) => {
    try {
      const res = await fetch(`/teachers/${teacherID}`);
      const data = await res.json();
      setViewTeacher(data);
      setEditTeacher(null);
    } catch (err) {
      notify("Failed to fetch teacher details");
    }
  };

  const handleEdit = async (teacherID) => {
    try {
      const res = await fetch(`/teachers/${teacherID}`);
      const data = await res.json();
      setEditTeacher(data);
      setViewTeacher(null);
    } catch (err) {
      notify("Failed to fetch teacher details for editing");
    }
  };

  const handleEditChange = (e) => {
    setEditTeacher({ ...editTeacher, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      const res = await fetch(`/teachers/${editTeacher._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editTeacher),
      });
      const data = await res.json();
      notify(data.message);
      setEditTeacher(null);
      fetchTeachers();
    } catch (err) {
      notify("Failed to update teacher");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const res = await fetch(`/teachers/${deleteTeacher._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      notify("Successfully Deleted");
      setDeleteTeacher(null);
      fetchTeachers();
    } catch (err) {
      notify("Failed to delete teacher");
    }
  };

  const filteredTeachers = teachers.filter(
    (t) =>
      t.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.teacherID.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-black mb-4 md:mb-0">Teachers</h1>
              <div className="flex gap-3 items-center w-full md:w-auto">
                <input
                  type="text"
                  placeholder="Search by Name, ID, or Subject"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-80 text-sm shadow-sm"
                />
                <button
                  className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-3 rounded hover:bg-blue-700 transition text-sm"
                  onClick={() => navigate("/addteacher")}
                >
                  Add Teacher
                </button>
              </div>
            </div>

            
            {/* Teacher Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-md">
              {loading ? (
                <p className="text-gray-500 col-span-full">Loading teachers...</p>
              ) : filteredTeachers.length === 0 ? (
                <p className="text-gray-500 col-span-full">No teachers found.</p>
              ) : (
                filteredTeachers.map((teacher) => (
                  <div
                    key={teacher._id}
                    className="relative bg-white/70 backdrop-blur-md shadow-md rounded-md p-5 cursor-pointer 
                              hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
                    onClick={() => handleView(teacher.teacherID)}
                  >
                    {/* Teacher Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {teacher.teacherName}
                      </h2>
                      <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full shadow-sm">
                        {teacher.teacherID}
                      </span>
                    </div>

                    {/* Details */}
                    <p className="text-gray-700 text-sm mb-1">
                      <span className="font-medium text-gray-600">Subject:</span>{" "}
                      {teacher.subject}
                    </p>
                    <p className="text-gray-600 text-sm truncate">
                      <span className="font-medium">Email:</span> {teacher.email}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-end mt-4 gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(teacher.teacherID);
                        }}
                        className="px-3 py-1.5 bg-yellow-400/90 text-white text-xs rounded-lg shadow 
                                  hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTeacher(teacher);
                        }}
                        className="px-3 py-1.5 bg-red-600/90 text-white text-xs rounded-lg shadow 
                                  hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* View Modal */}
            {viewTeacher && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
                  {/* Close button */}
                  <button
                    onClick={() => setViewTeacher(null)}
                    className="absolute top-3 right-3 text-red-600 hover:text-red-700 text-2xl font-bold"
                  >
                    &times;
                  </button>

                  {/* Header */}
                  <h2 className="text-xl font-bold text-blue-600 mb-2 text-center">
                    {viewTeacher.teacherName}
                  </h2>
                  <div className="border-b mb-4"></div>

                  {/* Details */}
                  <div className="space-y-2 text-gray-700 text-sm">
                    <p><strong>ID:</strong> {viewTeacher.teacherID}</p>
                    <p><strong>Email:</strong> {viewTeacher.email}</p>
                    <p><strong>Subject:</strong> {viewTeacher.subject}</p>
                    <p><strong>Mobile:</strong> {viewTeacher.mobile}</p>
                    <p><strong>Age:</strong> {viewTeacher.age}</p>
                    <p><strong>Gender:</strong> {viewTeacher.gender}</p>
                    <p><strong>DOB:</strong> {formatDate(viewTeacher.DOB)}</p>
                    <p><strong>Address:</strong> {viewTeacher.address}</p>
                    <p><strong>Education:</strong> {viewTeacher.education}</p>
                    <p><strong>Details:</strong> {viewTeacher.details}</p>
                  </div>
                </div>
              </div>
            )}


            {/* Edit Modal */}
            {editTeacher && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-5 relative">
                  <button
                    onClick={() => setEditTeacher(null)}
                    className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow"
                  >
                    &times;
                  </button>
                  <h2 className="text-xl font-bold mb-3 text-blue-600">Edit Teacher</h2>
                  <div className="space-y-2">
                    {/* Only three admin-editable fields */}
                    <input
                      type="text"
                      name="teacherName"
                      value={editTeacher.teacherName}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Name"
                    />
                    <input
                      type="text"
                      name="subject"
                      value={editTeacher.subject}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Subject"
                    />
                    <input
                      type="email"
                      name="email"
                      value={editTeacher.email}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded text-sm"
                      placeholder="Email"
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button
                        onClick={handleEditSubmit}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm shadow"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditTeacher(null)}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition text-sm shadow"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteTeacher && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-xs p-5 text-center">
                  <h2 className="text-lg font-bold mb-3 text-red-600">Confirm Delete</h2>
                  <p className="text-gray-600 text-sm mb-5">
                    Are you sure you want to delete{" "}
                    <strong>{deleteTeacher.teacherName}</strong>?
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={handleDeleteConfirm}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteTeacher(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </>
  );
};

export default Teachers;

