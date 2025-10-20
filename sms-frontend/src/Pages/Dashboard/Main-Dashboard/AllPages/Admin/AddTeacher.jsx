

// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = (text) => toast(text);

// const AddTeacher = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const editId = new URLSearchParams(location.search).get("edit");

//   const [loading, setLoading] = useState(false);
//   const [teachersCount, setTeachersCount] = useState(0);

//   // 🔹 Fetch teacher count
//   const fetchTeacherCount = async () => {
//     try {
//       const res = await fetch("http://localhost:7000/teachers/count");
//       const data = await res.json();
//       setTeachersCount(data.count || 0);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchTeacherCount();
//   }, []);

//   const getDefaultTeacherID = () => {
//     const id = (teachersCount + 1).toString().padStart(3, "0");
//     return `T${id}`;
//   };

//   const initData = {
//     teacherName: "",
//     age: "",
//     mobile: "",
//     email: "",
//     gender: "",
//     DOB: "",
//     address: "",
//     education: "",
//     subject: "",
//     teacherID: getDefaultTeacherID(),
//     password: "",
//     details: "",
//   };

//   const [TeacherValue, setTeacherValue] = useState(initData);

//   // 🔹 Update teacherID whenever count changes
//   useEffect(() => {
//     if (!editId) {
//       setTeacherValue((prev) => ({
//         ...prev,
//         teacherID: getDefaultTeacherID(),
//         password: `${getDefaultTeacherID()}123`, // auto password rule
//       }));
//     }
//   }, [teachersCount, editId]);

//   // Fetch data if editing
//   useEffect(() => {
//     if (editId) {
//       fetch(`http://localhost:7000/teachers/${editId}`)
//         .then((res) => res.json())
//         .then((data) => setTeacherValue(data))
//         .catch(() => notify("Failed to fetch teacher data"));
//     }
//   }, [editId]);

//   const HandleTeacherChange = (e) => {
//     const { name, value } = e.target;
//     setTeacherValue((prev) => ({ ...prev, [name]: value }));
//   };

//   const HandleTeacherSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const url = editId
//         ? `http://localhost:7000/teachers/${editId}`
//         : "http://localhost:7000/teachers/register";
//       const method = editId ? "PATCH" : "POST";

//       const res = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(TeacherValue),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (data.message?.includes("exists")) return notify(data.message);

//       notify(editId ? "Teacher updated successfully!" : "Teacher added successfully!");

//       // 🔹 Refresh count after successful add
//       if (!editId) {
//         await fetchTeacherCount();
//       }

//       navigate("/teachers");
//     } catch (err) {
//       setLoading(false);
//       notify("Network Error");
//     }
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex min-h-screen bg-gray-100">
//         <Sidebar />
//         <div className="flex-1 p-6">
//           <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
//             <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
//               {editId ? "Edit Teacher" : "Add Teacher"}
//             </h1>

//             <form onSubmit={HandleTeacherSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Teacher ID (read-only) */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">
//                   Teacher ID
//                 </label>
//                 <input
//                   type="text"
//                   name="teacherID"
//                   value={TeacherValue.teacherID}
//                   readOnly
//                   className="w-full p-3 border border-gray-300 rounded bg-gray-100"
//                 />
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="teacherName"
//                   value={TeacherValue.teacherName || ""}
//                   onChange={HandleTeacherChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={TeacherValue.email || ""}
//                   onChange={HandleTeacherChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//               </div>

//               {/* Education */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
//                 <input
//                   type="text"
//                   name="education"
//                   value={TeacherValue.education || ""}
//                   onChange={HandleTeacherChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//               </div>

//               {/* Subject */}
//               <div>
//                 <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
//                 <input
//                   type="text"
//                   name="subject"
//                   value={TeacherValue.subject || ""}
//                   onChange={HandleTeacherChange}
//                   required
//                   className="w-full p-3 border border-gray-300 rounded"
//                 />
//               </div>

//               {/* Submit Button */}
//               <div className="md:col-span-2 flex gap-4">
//                 <button
//                   type="submit"
//                   className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
//                 >
//                   {loading ? "Loading..." : editId ? "Update Teacher" : "Add Teacher"}
//                 </button>

//                 {/* 🔹 Back button */}
//                 <button
//                   type="button"
//                   onClick={() => navigate("/teachers")}
//                   className="flex-1 py-3 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500 transition"
//                 >
//                   Back
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddTeacher;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../GlobalFiles/Sidebar";
import { useDispatch } from "react-redux";
import { SendPassword } from "../../../../../Redux/auth/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);

const AddTeacher = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({
    teacherID: "",
    teacherName: "",
    email: "",
    education: "",
    subject: "",
    password: "",
  });
  const [confirm, setConfirm] = useState(false);

  // Fetch teachers to calculate next ID
  useEffect(() => {
    fetch("http://localhost:7000/teachers")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data);

        let nextIdNumber = 1;
        if (data.length > 0) {
          // Sort descending by numeric part of ID
          const sorted = data.sort((a, b) => {
            const idA = parseInt(a.teacherID.replace("T", ""));
            const idB = parseInt(b.teacherID.replace("T", ""));
            return idB - idA;
          });
          const lastId = parseInt(sorted[0].teacherID.replace("T", ""));
          nextIdNumber = lastId + 1;
        }

        const nextId = `T${String(nextIdNumber).padStart(3, "0")}`;
        setForm((prev) => ({ ...prev, teacherID: nextId, password: `${nextId}123` }));
      })
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:7000/teachers/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        // Send email using Redux action
        const emailData = {
          email: form.email,
          password: form.password,
          userId: form.teacherID,
        };

        dispatch(SendPassword(emailData));
        notify("Account Details Sent");

        navigate("/teachers");
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Add Teacher
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setConfirm(true);
              }}
              className="space-y-4 text-sm"
            >
              {/* Teacher ID */}
              <div>
                <label className="block mb-1 font-medium">Teacher ID</label>
                <input
                  type="text"
                  value={form.teacherID}
                  readOnly
                  className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="teacherName"
                  value={form.teacherName}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter teacher name"
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
                  placeholder="Enter correct email *"
                />
              </div>

              {/* Education */}
              <div>
                <label className="block mb-1 font-medium">Education</label>
                <input
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter education"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-1 font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter subject"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/teachers")}
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
                Are you sure you want to add <strong>{form.teacherName}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setConfirm(false);
                    handleSubmit();
                  }}
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
    </>
  );
};

export default AddTeacher;
