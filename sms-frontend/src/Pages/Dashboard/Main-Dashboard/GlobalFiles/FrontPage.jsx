

// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import {
//   FaChalkboardTeacher,
//   FaUserAlt,
// } from "react-icons/fa";
// import { RiEmpathizeLine, RiAdminLine } from "react-icons/ri";
// import { SiGoogleclassroom } from "react-icons/si";
// import { BiBus, BiNotepad } from "react-icons/bi";
// import { MdPayment } from "react-icons/md";

// // ================= Gallery Carousel Component =================
// const GalleryCarousel = ({ gallery }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const latestImages = gallery.slice(-6).reverse(); // latest 6 images

//   useEffect(() => {
//     if (latestImages.length === 0) return;
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % latestImages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [latestImages]);

//   if (latestImages.length === 0)
//     return <p className="text-gray-500 text-sm">No images uploaded yet.</p>;

//   return (
//     <div className="flex flex-col gap-4 flex-grow">
//       {/* Large Image with Title & Description Overlay */}
//       <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-md border shadow-sm">
//         <img
//           src={latestImages[currentIndex].url}
//           alt={`carousel-${currentIndex}`}
//           className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
//         />
//         <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
//           <h3 className="text-lg font-semibold">
//             {latestImages[currentIndex].title || "Untitled"}
//           </h3>
//           {latestImages[currentIndex].description && (
//             <p className="text-sm mt-1 line-clamp-2">
//               {latestImages[currentIndex].description}
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Thumbnails */}
//       <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
//         {latestImages.map((img, index) => (
//           <div
//             key={img._id || index}
//             className={`overflow-hidden rounded-md border cursor-pointer ${
//               index === currentIndex ? "ring-2 ring-indigo-500" : ""
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           >
//             <img
//               src={img.url}
//               alt={`thumb-${index}`}
//               className="w-full h-20 object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // ================= FrontPage Component =================
// const FrontPage = () => {
//   const [gallery, setGallery] = useState([]);
//   const [notices, setNotices] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [expanded, setExpanded] = useState(null);
//   const [search, setSearch] = useState("");
//   const [showUpload, setShowUpload] = useState(false);
//   const [uploadForm, setUploadForm] = useState({
//     title: "",
//     description: "",
//     file: null,
//   });

//   const { user } = useSelector((state) => state.auth.data);
//   const {
//     dashboard: { data },
//   } = useSelector((store) => store.data);

//   const navigate = useNavigate();

//   // ================= FETCH =================
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get("http://localhost:7000/gallery");
//       setGallery(res.data);
//     } catch (err) {
//       console.error("Error fetching gallery:", err);
//     }
//   };

//   const fetchNotices = async () => {
//     try {
//       const res = await axios.get("http://localhost:7000/notices");
//       const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
//       setNotices(sorted);
//     } catch (err) {
//       console.error("Error fetching notices:", err);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//     fetchNotices();
//   }, []);

//   // ================= FILE UPLOAD =================
//   const handleFileChange = (e) => {
//     setUploadForm({ ...uploadForm, file: e.target.files[0] });
//   };

//   const handleUpload = async () => {
//     if (!uploadForm.file || !uploadForm.title) {
//       toast.error("Please provide at least a title and file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", uploadForm.file);
//     formData.append("title", uploadForm.title);
//     formData.append("description", uploadForm.description);

//     try {
//       setUploading(true);
//       await axios.post("http://localhost:7000/gallery", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast.success("Image successfully added!");
//       fetchGallery();
//       setShowUpload(false);
//       setUploadForm({ title: "", description: "", file: null });
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to upload image.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // ================= FILTERED NOTICES =================
//   const filteredNotices = notices.filter((notice) =>
//     notice.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 p-6 flex flex-col">
//         {/* ================= Overview ================= */}
//         <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//           Dashboard Overview
//         </h1>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           {[
//             { label: "Teachers", value: data?.teacher || 10, icon: <FaChalkboardTeacher className="text-indigo-500 text-2xl" /> },
//             { label: "Students", value: data?.student || 20, icon: <FaUserAlt className="text-blue-500 text-2xl" /> },
//             { label: "Staffs", value: 50, icon: <RiEmpathizeLine className="text-green-500 text-2xl" /> },
//             { label: "Classrooms", value: 25, icon: <SiGoogleclassroom className="text-yellow-500 text-2xl" /> },
//             { label: "School Bus", value: 10, icon: <BiBus className="text-red-500 text-2xl" /> },
//             { label: "Admins", value: data?.admin || 2, icon: <RiAdminLine className="text-purple-500 text-2xl" /> },
//             { label: "Notices", value: data?.notice || 9, icon: <BiNotepad className="text-pink-500 text-2xl" /> },
//             { label: "Reports", value: data?.report || 4, icon: <MdPayment className="text-teal-500 text-2xl" /> },
//           ].map((item, index) => (
//             <div
//               key={index}
//               className="bg-white border rounded-lg p-4 shadow-sm flex items-center gap-3 
//                         hover:shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
//             >
//               <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
//               <div>
//                 <h2 className="text-lg font-bold text-gray-800">{item.value}</h2>
//                 <p className="text-sm text-gray-500">{item.label}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ================= Main Split ================= */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
//           {/* ========== Notices ========== */}
//           <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-4 flex flex-col">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">E-Notices</h2>

//             {/* Search */}
//             <div className="flex items-center mb-4">
//               <input
//                 type="text"
//                 placeholder="Search notices..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="flex-1 border px-3 py-2 rounded-md text-sm focus:ring focus:ring-gray-300"
//               />
//             </div>

//             {/* Notices List */}
//             <div className="space-y-3 overflow-y-auto flex-grow">
//               {filteredNotices.slice(0, visibleCount).map((notice, index) => (
//                 <div
//                   key={notice._id || index}
//                   className="border rounded-md p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
//                   onClick={() => setExpanded(expanded === index ? null : index)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs font-medium text-blue-500">
//                       {new Date(notice.date).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                     <h3 className="text-sm font-semibold text-gray-700/90 flex-1 ml-3">
//                       {notice.title}
//                     </h3>
//                     <span className="text-gray-400">
//                       {expanded === index ? "−" : "+"}
//                     </span>
//                   </div>
//                   {expanded === index && (
//                     <p className="mt-2 text-gray-600 text-sm">{notice.details}</p>
//                   )}
//                 </div>
//               ))}

//               {/* Load More */}
//               {visibleCount < filteredNotices.length && (
//                 <div className="flex justify-center mt-3">
//                   <button
//                     onClick={() => setVisibleCount((prev) => prev + 10)}
//                     className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md"
//                   >
//                     Load More
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ========== Gallery Carousel ========== */}
//           <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Gallery Hub</h2>
//             <ToastContainer position="top-right" autoClose={3000} />

//             <GalleryCarousel gallery={gallery} />

//             {/* Buttons */}
//             <div className="flex justify-center gap-4 mt-4">
//               {user?.userType === "admin" && (
//                 <button
//                   onClick={() => setShowUpload(true)}
//                   className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md"
//                 >
//                   Add Photo
//                 </button>
//               )}
//               <button
//                 onClick={() => navigate("/gallery")}
//                 className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
//               >
//                 View Full Gallery
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ================= Upload Modal ================= */}
//         {showUpload && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//               <h3 className="text-lg font-semibold mb-4">Upload New Photo</h3>
//               <div
//                 className="border-2 border-dashed rounded-md p-4 text-center mb-3"
//               >
//                 <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
//                 <label htmlFor="fileInput" className="cursor-pointer text-sm text-gray-600">
//                   {uploadForm.file ? uploadForm.file.name : "Drag & drop or click to upload"}
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Title"
//                 value={uploadForm.title}
//                 onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
//                 className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
//               />
//               <textarea
//                 placeholder="Description"
//                 value={uploadForm.description}
//                 onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
//                 className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
//               />
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => setShowUpload(false)}
//                   className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpload}
//                   disabled={uploading}
//                   className={`px-4 py-2 text-sm rounded-md text-white ${
//                     uploading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-800"
//                   }`}
//                 >
//                   {uploading ? "Uploading..." : "Upload"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ================= Footer ================= */}
//         <footer className="mt-6 py-4 text-center text-sm text-gray-500 border-t">
//           © {new Date().getFullYear()} SchoolHub. All rights reserved.
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default FrontPage;


import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FaChalkboardTeacher, FaUserAlt } from "react-icons/fa";
import { RiEmpathizeLine, RiAdminLine } from "react-icons/ri";
import { SiGoogleclassroom } from "react-icons/si";
import { BiBus, BiNotepad } from "react-icons/bi";
import { MdPayment } from "react-icons/md";

// ================= Gallery Carousel Component =================
const GalleryCarousel = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const latestImages = gallery.slice(-6).reverse(); // latest 6 images

  useEffect(() => {
    if (latestImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestImages]);

  if (latestImages.length === 0)
    return <p className="text-gray-500 text-sm">No images uploaded yet.</p>;

  return (
    <div className="flex flex-col gap-4 flex-grow">
      {/* Large Image with Title & Description Overlay */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-md border shadow-sm">
        <img
          src={latestImages[currentIndex].url}
          alt={`carousel-${currentIndex}`}
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
          <h3 className="text-lg font-semibold">
            {latestImages[currentIndex].title || "Untitled"}
          </h3>
          {latestImages[currentIndex].description && (
            <p className="text-sm mt-1 line-clamp-2">
              {latestImages[currentIndex].description}
            </p>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {latestImages.map((img, index) => (
          <div
            key={img._id || index}
            className={`overflow-hidden rounded-md border cursor-pointer ${
              index === currentIndex ? "ring-2 ring-indigo-500" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <img
              src={img.url}
              alt={`thumb-${index}`}
              className="w-full h-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// ================= FrontPage Component =================
const FrontPage = () => {
  const [gallery, setGallery] = useState([]);
  const [notices, setNotices] = useState([]);
  const [dashboardData, setDashboardData] = useState({
    admin: 0,
    student: 0,
    teacher: 0,
    notice: 0,
    report: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [expanded, setExpanded] = useState(null);
  const [search, setSearch] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    file: null,
  });

  const { user } = useSelector((state) => state.auth.data);
  const navigate = useNavigate();

  // ================= FETCH =================
  const fetchGallery = async () => {
    try {
      const res = await axios.get("/gallery");
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching gallery:", err);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await axios.get("/notices");
      const sorted = res.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setNotices(sorted);
    } catch (err) {
      console.error("Error fetching notices:", err);
    }
  };

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/schools");
      setDashboardData(res.data.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchGallery();
    fetchNotices();
    fetchDashboardData();
  }, []);

  // ================= FILE UPLOAD =================
  const handleFileChange = (e) => {
    setUploadForm({ ...uploadForm, file: e.target.files[0] });
  };

  const handleUpload = async () => {
    if (!uploadForm.file || !uploadForm.title) {
      toast.error("Please provide at least a title and file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", uploadForm.file);
    formData.append("title", uploadForm.title);
    formData.append("description", uploadForm.description);

    try {
      setUploading(true);
      await axios.post("/gallery", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Image successfully added!");
      fetchGallery();
      setShowUpload(false);
      setUploadForm({ title: "", description: "", file: null });
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  // ================= FILTERED NOTICES =================
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col">
        {/* ================= Overview ================= */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Dashboard Overview
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Teachers", value: dashboardData.teacher, icon: <FaChalkboardTeacher className="text-indigo-500 text-2xl" /> },
            { label: "Students", value: dashboardData.student, icon: <FaUserAlt className="text-blue-500 text-2xl" /> },
            { label: "Staffs", value: 50, icon: <RiEmpathizeLine className="text-green-500 text-2xl" /> },
            { label: "Classrooms", value: 25, icon: <SiGoogleclassroom className="text-yellow-500 text-2xl" /> },
            { label: "School Bus", value: 10, icon: <BiBus className="text-red-500 text-2xl" /> },
            { label: "Admins", value: dashboardData.admin, icon: <RiAdminLine className="text-purple-500 text-2xl" /> },
            { label: "Notices", value: dashboardData.notice, icon: <BiNotepad className="text-pink-500 text-2xl" /> },
            { label: "Reports", value: dashboardData.report, icon: <MdPayment className="text-teal-500 text-2xl" /> },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border rounded-lg p-4 shadow-sm flex items-center gap-3 
                        hover:shadow-md hover:scale-[1.02] transition-transform cursor-pointer"
            >
              <div className="p-2 bg-gray-100 rounded-full">{item.icon}</div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">{item.value}</h2>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Main Split ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">
          {/* ========== Notices ========== */}
          <div className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">E-Notices</h2>

            {/* Search */}
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border px-3 py-2 rounded-md text-sm focus:ring focus:ring-gray-300"
              />
            </div>

            {/* Notices List */}
            <div className="space-y-3 overflow-y-auto flex-grow">
              {filteredNotices.slice(0, visibleCount).map((notice, index) => (
                <div
                  key={notice._id || index}
                  className="border rounded-md p-3 bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-blue-500">
                      {new Date(notice.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h3 className="text-sm font-semibold text-gray-700/90 flex-1 ml-3">
                      {notice.title}
                    </h3>
                    <span className="text-gray-400">
                      {expanded === index ? "−" : "+"}
                    </span>
                  </div>
                  {expanded === index && (
                    <p className="mt-2 text-gray-600 text-sm">{notice.details}</p>
                  )}
                </div>
              ))}

              {/* Load More */}
              {visibleCount < filteredNotices.length && (
                <div className="flex justify-center mt-3">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 10)}
                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ========== Gallery Carousel ========== */}
          <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Gallery Hub</h2>
            <ToastContainer position="top-right" autoClose={3000} />

            <GalleryCarousel gallery={gallery} />

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {user?.userType === "admin" && (
                <button
                  onClick={() => setShowUpload(true)}
                  className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-800 text-white rounded-md"
                >
                  Add Photo
                </button>
              )}
              <button
                onClick={() => navigate("/gallery")}
                className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md"
              >
                View Full Gallery
              </button>
            </div>
          </div>
        </div>

        {/* ================= Upload Modal ================= */}
        {/* {showUpload && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Upload New Photo</h3>
              <div
                className="border-2 border-dashed rounded-md p-4 text-center mb-3"
              >
                <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
                <label htmlFor="fileInput" className="cursor-pointer text-sm text-gray-600">
                  {uploadForm.file ? uploadForm.file.name : "Drag & drop or click to upload"}
                </label>
              </div>
              <input
                type="text"
                placeholder="Title"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
              />
              <textarea
                placeholder="Description"
                value={uploadForm.description}
                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className={`px-4 py-2 text-sm rounded-md text-white ${
                    uploading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )} */}
        {showUpload && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Upload New Photo</h3>

      {/* File Upload */}
      <div className="border-2 border-dashed rounded-md p-4 text-center mb-3">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="cursor-pointer text-sm text-gray-600"
        >
          {uploadForm.file ? uploadForm.file.name : "Drag & drop or click to upload"}
        </label>
      </div>

      {/* ✅ Title replaced with Dropdown */}
      <select
        value={uploadForm.title || ""}
        onChange={(e) =>
          setUploadForm({ ...uploadForm, title: e.target.value })
        }
        className="w-full border px-3 py-2 rounded-md mb-3 text-sm bg-white"
      >
        <option value="">Select Event</option>
        <option value="Annual Day">Annual Day</option>
        <option value="Competition">Competition</option>
        <option value="Fun Fair">Fun Fair</option>
        <option value="Sports Day">Sports Day</option>
      </select>

      {/* Description */}
      <textarea
        placeholder="Description"
        value={uploadForm.description}
        onChange={(e) =>
          setUploadForm({ ...uploadForm, description: e.target.value })
        }
        className="w-full border px-3 py-2 rounded-md mb-3 text-sm"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowUpload(false)}
          className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`px-4 py-2 text-sm rounded-md text-white ${
            uploading ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  </div>
)}

        


        {/* ================= Footer ================= */}
        <footer className="mt-6 py-4 text-center text-sm text-gray-500 border-t">
          © {new Date().getFullYear()} SchoolHub. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default FrontPage;
