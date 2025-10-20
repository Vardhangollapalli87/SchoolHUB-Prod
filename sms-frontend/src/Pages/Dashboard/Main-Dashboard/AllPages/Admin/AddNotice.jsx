// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const notify = (text, type = "success") =>
//   toast[type](text, { position: "top-center" });

// const AddNotice = () => {
//   const { data } = useSelector((store) => store.auth);

//   const InitData = { title: "", details: "", date: "" };
//   const [NoticeData, setNoticeData] = useState(InitData);
//   const [loading, setLoading] = useState(false);

//   const HandleNoticeChange = (e) => {
//     setNoticeData({ ...NoticeData, [e.target.name]: e.target.value });
//   };

//   const HandleNoticeSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:7000/notices/create", NoticeData);
//       if (res.data.message) {
//         notify("Notice Added Successfully", "success");
//         setNoticeData(InitData);
//       } else {
//         notify("Failed to add notice", "error");
//       }
//     } catch (error) {
//       console.error(error);
//       notify("Something went wrong", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (data?.isAuthenticated === false) return <Navigate to={"/"} />;
//   if (data?.user.userType !== "admin") return <Navigate to={"/dashboard"} />;

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex min-h-screen bg-gray-50">
//         <Sidebar />

//         <div className="flex-1 p-4 flex justify-center">
//           <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
//             <h1 className="text-2xl font-bold text-blue-700 mb-4 border-b border-gray-200 pb-1 text-center">
//               Add Notice
//             </h1>

//             <form className="space-y-4 text-sm" onSubmit={HandleNoticeSubmit}>
//               {/* Title */}
//               <div>
//                 <label className="block mb-1 font-medium text-gray-700">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={NoticeData.title}
//                   onChange={HandleNoticeChange}
//                   required
//                   placeholder="Notice title"
//                   className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </div>

//               {/* Details */}
//               <div>
//                 <label className="block mb-1 font-medium text-gray-700">Details</label>
//                 <textarea
//                   name="details"
//                   value={NoticeData.details}
//                   onChange={HandleNoticeChange}
//                   required
//                   placeholder="Notice details"
//                   rows="4"
//                   className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
//                 />
//               </div>

//               {/* Date */}
//               <div>
//                 <label className="block mb-1 font-medium text-gray-700">Date</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={NoticeData.date}
//                   onChange={HandleNoticeChange}
//                   required
//                   className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition"
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm"
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddNotice;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../GlobalFiles/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import axios from "axios";

const notify = (text, type = "success") =>
  toast[type](text, { position: "top-center" });

const AddNotice = () => {
  const { data } = useSelector((store) => store.auth);

  const InitData = {
    title: "",
    details: "",
    date: "",
    // category: "",
    // priority: "Medium",
  };
  const [NoticeData, setNoticeData] = useState(InitData);
  const [loading, setLoading] = useState(false);

  const HandleNoticeChange = (e) => {
    setNoticeData({
      ...NoticeData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleNoticeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:7000/notices/create",
        NoticeData
      );

      if (res.data.message) {
        notify("Notice Added Successfully", "success");
        setNoticeData(InitData);
      } else {
        notify("Failed to add notice", "error");
      }
    } catch (error) {
      console.error(error);
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const HandleReset = () => setNoticeData(InitData);

  // Auth checks
  if (data?.isAuthenticated === false) return <Navigate to="/" />;
  if (data?.user.userType !== "admin") return <Navigate to="/dashboard" />;

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
              Add Notice
            </h1>

            <form onSubmit={HandleNoticeSubmit} className="space-y-4 text-sm">
              {/* Title */}
              <div>
                <label className="block font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={NoticeData.title}
                  onChange={HandleNoticeChange}
                  placeholder="Enter notice title"
                  required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Details */}
              <div>
                <label className="block font-medium mb-1">Details</label>
                <textarea
                  name="details"
                  value={NoticeData.details}
                  onChange={HandleNoticeChange}
                  placeholder="Enter notice details"
                  rows="4"
                  required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>

              {/* Date */}
              <div>
                <label className="block font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={NoticeData.date}
                  onChange={HandleNoticeChange}
                  required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Category */}
              {/* <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                  name="category"
                  value={NoticeData.category}
                  onChange={HandleNoticeChange}
                  required
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                  <option value="Reminder">Reminder</option>
                </select>
              </div> */}

              {/* Priority */}
              {/* <div>
                <label className="block font-medium mb-1">Priority</label>
                <select
                  name="priority"
                  value={NoticeData.priority}
                  onChange={HandleNoticeChange}
                  className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div> */}

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={HandleReset}
                  className="flex-1 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Live Preview */}
            {NoticeData.title || NoticeData.details ? (
              <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h2 className="font-bold text-blue-700 mb-1">{NoticeData.title}</h2>
                <p className="text-gray-800 mb-1">{NoticeData.details}</p>
                <p className="text-gray-600 text-sm">
                  {NoticeData.date} 
                   {/* {NoticeData.category} 
                  {NoticeData.priority} */}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNotice;

