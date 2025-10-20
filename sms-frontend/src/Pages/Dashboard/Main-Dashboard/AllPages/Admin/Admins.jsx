

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { FiSearch } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = (text) => toast(text);

// const Admins = () => {
//   // const navigate = useNavigate();
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   // const [viewAdmin, setViewAdmin] = useState(null);
//   const [editAdmin, setEditAdmin] = useState(null);
//   const [deleteAdmin, setDeleteAdmin] = useState(null);

//   // Fetch admins
//   useEffect(() => {
//     const fetchAdmins = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch("http://localhost:7000/admin");
//         const data = await res.json();
//         setAdmins(data);
//       } catch (err) {
//         console.error("Failed to fetch admins:", err);
//         notify("Failed to fetch admins");
//       }
//       setLoading(false);
//     };
//     fetchAdmins();
//   }, []);



//   // Filter admins
//   const filteredAdmins = admins.filter(
//     (admin) =>
//       (admin.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (admin.adminID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (admin.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (admin.mobile?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
//       (admin.education?.toLowerCase() || "").includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />

//         <div className="flex-1 p-6">
//           <h1 className="text-4xl font-extrabold text-black-800 mb-8">
//             Admins
//           </h1>

//           {/* Search */}
//           <div className="flex items-center mb-8 w-full md:w-1/2 bg-white rounded-xl shadow-md px-4 py-2 border border-gray-200">
//             <FiSearch className="text-gray-400 mr-3 text-lg" />
//             <input
//               type="text"
//               placeholder="Search by name, ID, email, mobile, education..."
//               className="w-full outline-none text-gray-800 font-medium text-sm"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Loading / No Data */}
//           {loading ? (
//             <div className="text-center text-gray-500 py-10 text-lg font-medium">
//               Loading admins...
//             </div>
//           ) : filteredAdmins.length === 0 ? (
//             <div className="text-center text-gray-500 py-10 text-lg font-medium">
//               No admins found
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredAdmins.map((admin) => (
//                 <div
//                   key={admin._id}
//                   className="relative bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 cursor-pointer"
//                 >
//                   <div className="flex justify-between items-start mb-3">
//                     <h2 className="text-xl font-bold text-blue-700">{admin.name || "-"}</h2>
//                     <span className="text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//                       {admin.adminID || "-"}
//                     </span>
//                   </div>

//                   <p className="text-gray-700 mb-1">
//                     <span className="font-semibold text-black">Email:</span> {admin.email || "-"}
//                   </p>
//                   <p className="text-gray-700 mb-1">
//                     <span className="font-semibold text-black">Mobile:</span> {admin.mobile || "-"}
//                   </p>
//                   <p className="text-gray-700 mb-1">
//                     <span className="font-semibold text-black">Education:</span> {admin.education || "-"}
//                   </p>

//                   {/* Action Buttons */}
//                   <div className="flex justify-end mt-4 gap-2">
//                     {/* <button
//                       onClick={() => setViewAdmin(admin)}
//                       className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg shadow hover:bg-blue-700 transition"
//                     >
//                       View
//                     </button> */}
//                     {/* <button
//                       onClick={() => setEditAdmin(admin)}
//                       className="px-3 py-1.5 bg-yellow-400 text-white text-xs rounded-lg shadow hover:bg-yellow-500 transition"
//                     >
//                       Edit
//                     </button> */}
//                     {/* <button
//                       onClick={() => setDeleteAdmin(admin)}
//                       className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg shadow hover:bg-red-700 transition"
//                     >
//                       Delete
//                     </button> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* View Modal */}
//           {/* {viewAdmin && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//               <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
//                 <button
//                   onClick={() => setViewAdmin(null)}
//                   className="absolute top-3 right-3 text-red-600 hover:text-red-700 text-2xl font-bold"
//                 >
//                   &times;
//                 </button>
//                 <h2 className="text-xl font-bold text-blue-600 mb-2 text-center">{viewAdmin.name}</h2>
//                 <div className="border-b mb-4"></div>
//                 <div className="space-y-2 text-gray-700 text-sm">
//                   <p><strong>ID:</strong> {viewAdmin.adminID || "-"}</p>
//                   <p><strong>Email:</strong> {viewAdmin.email || "-"}</p>
//                   <p><strong>Mobile:</strong> {viewAdmin.mobile || "-"}</p>
//                   <p><strong>Education:</strong> {viewAdmin.education || "-"}</p>
//                   <p><strong>Details:</strong> {viewAdmin.details || "-"}</p>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* Edit Modal */}
//           {/* {editAdmin && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//               <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-5 relative">
//                 <button
//                   onClick={() => setEditAdmin(null)}
//                   className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg shadow"
//                 >
//                   &times;
//                 </button>
//                 <h2 className="text-xl font-bold mb-3 text-blue-600">Edit Admin</h2>
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     name="name"
//                     value={editAdmin.name}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border border-gray-300 rounded text-sm"
//                     placeholder="Name"
//                   />
//                   <input
//                     type="text"
//                     name="email"
//                     value={editAdmin.email}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border border-gray-300 rounded text-sm"
//                     placeholder="Email"
//                   />
//                   <input
//                     type="text"
//                     name="mobile"
//                     value={editAdmin.mobile}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border border-gray-300 rounded text-sm"
//                     placeholder="Mobile"
//                   />
//                   <input
//                     type="text"
//                     name="education"
//                     value={editAdmin.education}
//                     onChange={handleEditChange}
//                     className="w-full p-2 border border-gray-300 rounded text-sm"
//                     placeholder="Education"
//                   />
//                   <div className="flex justify-end gap-2 mt-2">
//                     <button
//                       onClick={handleEditSubmit}
//                       className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm shadow"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditAdmin(null)}
//                       className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition text-sm shadow"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )} */}

//           {/* Delete Confirmation Modal */}
//           {/* {deleteAdmin && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//               <div className="bg-white rounded-lg shadow-xl w-full max-w-xs p-5 text-center">
//                 <h2 className="text-lg font-bold mb-3 text-red-600">Confirm Delete</h2>
//                 <p className="text-gray-600 text-sm mb-5">
//                   Are you sure you want to delete <strong>{deleteAdmin.name}</strong>?
//                 </p>
//                 <div className="flex justify-center gap-3">
//                   <button
//                     onClick={handleDeleteConfirm}
//                     className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
//                   >
//                     Delete
//                   </button>
//                   <button
//                     onClick={() => setDeleteAdmin(null)}
//                     className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Admins;


// // import React, { useState, useEffect } from "react";
// // import Sidebar from "../../GlobalFiles/Sidebar";
// // import { FiSearch } from "react-icons/fi";
// // import { useNavigate } from "react-router-dom";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import { CSVLink } from "react-csv";
// // import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// // const notify = (text) => toast(text);

// // // Utility to format dates
// // const formatDate = (dateStr) => {
// //   if (!dateStr) return "-";
// //   const d = new Date(dateStr);
// //   return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
// // };

// // const Admins = () => {
// //   const navigate = useNavigate();
// //   const [admins, setAdmins] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [editAdmin, setEditAdmin] = useState(null);
// //   const [deleteAdmin, setDeleteAdmin] = useState(null);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const adminsPerPage = 6;
// //   const [sortOption, setSortOption] = useState("nameAsc");

// //   // Fetch admins
// //   const fetchAdmins = async () => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("http://localhost:7000/admin");
// //       const data = await res.json();
// //       setAdmins(data);
// //     } catch (err) {
// //       notify("Failed to fetch admins");
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     fetchAdmins();
// //     const interval = setInterval(fetchAdmins, 15000); // auto-refresh
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Search + filter
// //   const filteredAdmins = admins.filter(
// //     (admin) =>
// //       (admin.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
// //       (admin.adminID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
// //       (admin.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
// //       (admin.mobile?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
// //       (admin.education?.toLowerCase() || "").includes(searchTerm.toLowerCase())
// //   );

// //   // Sorting
// //   const sortedAdmins = [...filteredAdmins].sort((a, b) => {
// //     if (sortOption === "nameAsc") return (a.name || "").localeCompare(b.name || "");
// //     if (sortOption === "nameDesc") return (b.name || "").localeCompare(a.name || "");
// //     if (sortOption === "idAsc") return (a.adminID || "").localeCompare(b.adminID || "");
// //     if (sortOption === "idDesc") return (b.adminID || "").localeCompare(a.adminID || "");
// //     if (sortOption === "dateAsc") return new Date(a.createdAt) - new Date(b.createdAt);
// //     if (sortOption === "dateDesc") return new Date(b.createdAt) - new Date(a.createdAt);
// //     return 0;
// //   });

// //   // Pagination
// //   const indexOfLast = currentPage * adminsPerPage;
// //   const indexOfFirst = indexOfLast - adminsPerPage;
// //   const currentAdmins = sortedAdmins.slice(indexOfFirst, indexOfLast);
// //   const totalPages = Math.ceil(sortedAdmins.length / adminsPerPage);

// //   // Drag & Drop
// //   const handleDragEnd = (result) => {
// //     if (!result.destination) return;
// //     const items = Array.from(admins);
// //     const [reordered] = items.splice(result.source.index, 1);
// //     items.splice(result.destination.index, 0, reordered);
// //     setAdmins(items);
// //     // Optionally: send reordered list to backend
// //   };

// //   // Edit admin
// //   const handleEditChange = (e) => {
// //     setEditAdmin({ ...editAdmin, [e.target.name]: e.target.value });
// //   };

// //   const handleEditSubmit = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:7000/admin/${editAdmin._id}`, {
// //         method: "PATCH",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(editAdmin),
// //       });
// //       const data = await res.json();
// //       notify(data.message);
// //       setEditAdmin(null);
// //       fetchAdmins();
// //     } catch (err) {
// //       notify("Failed to update admin");
// //     }
// //   };

// //   // Delete admin
// //   const handleDeleteConfirm = async () => {
// //     try {
// //       const res = await fetch(`http://localhost:7000/admin/${deleteAdmin._id}`, {
// //         method: "DELETE",
// //       });
// //       const data = await res.json();
// //       notify(data.message);
// //       setDeleteAdmin(null);
// //       fetchAdmins();
// //     } catch (err) {
// //       notify("Failed to delete admin");
// //     }
// //   };

// //   return (
// //     <>
// //       <ToastContainer />
// //       <div className="flex min-h-screen bg-gray-50">
// //         <Sidebar />
// //         <div className="flex-1 p-6">
// //           <div className="flex flex-col md:flex-row justify-between items-center mb-6">
// //             <h1 className="text-4xl font-bold text-black mb-4 md:mb-0">Admins</h1>
// //             <div className="flex gap-3 items-center w-full md:w-auto">
// //               <input
// //                 type="text"
// //                 placeholder="Search by Name, ID, Email, Mobile, Education"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="p-2 md:p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-96 text-sm shadow-sm"
// //               />
// //               <button
// //                 className="bg-blue-600 text-white px-4 py-2 md:px-5 md:py-3 rounded hover:bg-blue-700 transition text-sm"
// //                 onClick={() => navigate("/addadmin")}
// //               >
// //                 Add Admin
// //               </button>
// //               <CSVLink
// //                 data={admins}
// //                 filename={"admins.csv"}
// //                 className="bg-green-600 text-white px-4 py-2 md:px-5 md:py-3 rounded hover:bg-green-700 transition text-sm"
// //               >
// //                 Export CSV
// //               </CSVLink>
// //             </div>
// //           </div>

// //           {/* Sort Dropdown */}
// //           <div className="mb-4">
// //             <select
// //               value={sortOption}
// //               onChange={(e) => setSortOption(e.target.value)}
// //               className="border border-gray-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               <option value="nameAsc">Name A → Z</option>
// //               <option value="nameDesc">Name Z → A</option>
// //               <option value="idAsc">ID Ascending</option>
// //               <option value="idDesc">ID Descending</option>
// //               <option value="dateAsc">Date Added Asc</option>
// //               <option value="dateDesc">Date Added Desc</option>
// //             </select>
// //           </div>

// //           {/* Admin Cards Grid */}
// //           {loading ? (
// //             <p className="text-gray-500 text-center py-10">Loading admins...</p>
// //           ) : currentAdmins.length === 0 ? (
// //             <p className="text-gray-500 text-center py-10">No admins found.</p>
// //           ) : (
// //             <DragDropContext onDragEnd={handleDragEnd}>
// //               <Droppable droppableId="adminsGrid" direction="horizontal">
// //                 {(provided) => (
// //                   <div
// //                     className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
// //                     {...provided.droppableProps}
// //                     ref={provided.innerRef}
// //                   >
// //                     {currentAdmins.map((admin, idx) => (
// //                       <Draggable key={admin._id} draggableId={admin._id} index={idx}>
// //                         {(provided) => (
// //                           <div
// //                             ref={provided.innerRef}
// //                             {...provided.draggableProps}
// //                             {...provided.dragHandleProps}
// //                             className="bg-white rounded-2xl p-5 shadow hover:shadow-xl transition relative"
// //                           >
// //                             {/* Profile Image */}
// //                             <img
// //                               src={admin.profileImage || "/default-avatar.png"}
// //                               alt={admin.name}
// //                               className="w-16 h-16 rounded-full mb-3"
// //                             />

// //                             <h2 className="text-xl font-bold mb-1">{admin.name}</h2>
// //                             <p className="text-gray-700 text-sm mb-1">
// //                               <strong>ID:</strong> {admin.adminID}
// //                             </p>
// //                             <p className="text-gray-700 text-sm mb-1">
// //                               <strong>Email:</strong> {admin.email}
// //                             </p>
// //                             <p className="text-gray-700 text-sm mb-1">
// //                               <strong>Mobile:</strong> {admin.mobile}
// //                             </p>
// //                             <p className="text-gray-700 text-sm mb-1">
// //                               <strong>Role:</strong> {admin.role || "-"}
// //                             </p>
// //                             <p className="text-gray-700 text-sm mb-1">
// //                               <strong>Education:</strong> {admin.education || "-"}
// //                             </p>
// //                             <p className="text-gray-500 text-xs mb-2">
// //                               <strong>Last Login:</strong> {formatDate(admin.lastLogin)}
// //                             </p>

// //                             {/* Actions */}
// //                             <div className="flex justify-end gap-2 mt-3">
// //                               <button
// //                                 onClick={() => setEditAdmin(admin)}
// //                                 className="bg-yellow-400 text-white px-3 py-1 rounded text-xs hover:bg-yellow-500 transition"
// //                               >
// //                                 Edit
// //                               </button>
// //                               <button
// //                                 onClick={() => setDeleteAdmin(admin)}
// //                                 className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition"
// //                               >
// //                                 Delete
// //                               </button>
// //                             </div>
// //                           </div>
// //                         )}
// //                       </Draggable>
// //                     ))}
// //                     {provided.placeholder}
// //                   </div>
// //                 )}
// //               </Droppable>
// //             </DragDropContext>
// //           )}

// //           {/* Pagination */}
// //           <div className="flex justify-center mt-6 gap-3">
// //             <button
// //               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //               className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
// //             >
// //               Prev
// //             </button>
// //             <span className="px-3 py-1">{currentPage} / {totalPages}</span>
// //             <button
// //               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
// //               className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
// //             >
// //               Next
// //             </button>
// //           </div>

// //           {/* Edit Modal */}
// //           {editAdmin && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
// //               <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
// //                 <button
// //                   onClick={() => setEditAdmin(null)}
// //                   className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg"
// //                 >
// //                   &times;
// //                 </button>
// //                 <h2 className="text-xl font-bold mb-4 text-blue-600">Edit Admin</h2>
// //                 <div className="space-y-3">
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     value={editAdmin.name}
// //                     onChange={handleEditChange}
// //                     placeholder="Name"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <input
// //                     type="text"
// //                     name="adminID"
// //                     value={editAdmin.adminID}
// //                     onChange={handleEditChange}
// //                     placeholder="ID"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     value={editAdmin.email}
// //                     onChange={handleEditChange}
// //                     placeholder="Email"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <input
// //                     type="text"
// //                     name="mobile"
// //                     value={editAdmin.mobile}
// //                     onChange={handleEditChange}
// //                     placeholder="Mobile"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <input
// //                     type="text"
// //                     name="role"
// //                     value={editAdmin.role}
// //                     onChange={handleEditChange}
// //                     placeholder="Role"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <input
// //                     type="text"
// //                     name="education"
// //                     value={editAdmin.education}
// //                     onChange={handleEditChange}
// //                     placeholder="Education"
// //                     className="w-full p-2 border border-gray-300 rounded"
// //                   />
// //                   <div className="flex justify-end gap-2 mt-3">
// //                     <button
// //                       onClick={handleEditSubmit}
// //                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
// //                     >
// //                       Save
// //                     </button>
// //                     <button
// //                       onClick={() => setEditAdmin(null)}
// //                       className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Delete Modal */}
// //           {deleteAdmin && (
// //             <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
// //               <div className="bg-white rounded-lg shadow-xl w-full max-w-xs p-5 text-center">
// //                 <h2 className="text-lg font-bold mb-3 text-red-600">Confirm Delete</h2>
// //                 <p className="text-gray-600 text-sm mb-5">
// //                   Type <strong>DELETE</strong> to confirm deletion of <strong>{deleteAdmin.name}</strong>
// //                 </p>
// //                 <input
// //                   type="text"
// //                   placeholder="Type DELETE"
// //                   onChange={(e) => e.target.value === "DELETE" ? handleDeleteConfirm() : null}
// //                   className="w-full p-2 border border-gray-300 rounded mb-3 text-center"
// //                 />
// //                 <button
// //                   onClick={() => setDeleteAdmin(null)}
// //                   className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Admins;



import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import { FiSearch } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:7000/admin");
        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        console.error("Failed to fetch admins:", err);
        notify("Failed to fetch admins");
      }
      setLoading(false);
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter(
    (admin) =>
      (admin.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (admin.adminID?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (admin.email?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-1 p-6">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Admins</h1>


          {/* Loading / No Data */}
          {loading ? (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
              Loading admins...
            </div>
          ) : filteredAdmins.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-lg font-medium">
              No admins found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAdmins.map((admin) => (
                <div
                  key={admin._id}
                  className="bg-gray-50 rounded-md shadow-sm p-5 hover:shadow-md transition border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">{admin.name || "-"}</h2>
                    <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-0.5 rounded-md">
                      {admin.adminID || "-"}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold text-gray-900">Email:</span> {admin.email || "-"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admins;

