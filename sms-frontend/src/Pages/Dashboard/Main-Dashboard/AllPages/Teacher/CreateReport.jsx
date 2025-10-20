// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import {  CreateReport } from "../../../../../Redux/Datas/action";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import "react-toastify/dist/ReactToastify.css";
// import { toast, ToastContainer } from "react-toastify";
// const notify = (text) => toast(text);

// const Discharge_and_Create_Slip = () => {
//   const { data } = useSelector((store) => store.auth);

//   const [loading, setLoading] = useState(false);

//   const dispatch = useDispatch();
//   const initmark = {
//     subject: "",
//     score: "",
//     total: "",
//   };
//   const [mark, setmark] = useState(initmark);

//   const [marks, setmarks] = useState([]);

//   const HandlemarkChange = (e) => {
//     setmark({ ...mark, [e.target.name]: e.target.value });
//   };

//   const InitData = {
//     name: "",
//     class: "",
//     age: "",
//     mobile: "",
//     email: "",
//     gender: "",
//     details: "",
//     date: "",
//     marks: [],
//   };

//   const [ReportValue, setReportValue] = useState(InitData);

//   const HandleReportChange = (e) => {
//     setReportValue({ ...ReportValue, [e.target.name]: e.target.value });
//   };

//   const HandlemarkAdd = (e) => {
//     e.preventDefault();
//     setmarks([...marks, mark]);
//     setmark(initmark);
//   };

//   const HandleReportSubmit = (e) => {
//     e.preventDefault();
//     let data = {
//       ...ReportValue,
//       marks,
//     };
//     console.log(data);
//     try {
//       setLoading(true);
//       dispatch(CreateReport(data)).then((res) => {
//         console.log(res);
//         if (res.message === "Report successfully created") {
//           notify("Report Created Sucessfully");
//           setLoading(false);
//           setReportValue(InitData);
//         } else {
//           setLoading(false);
//           notify("Something went Wrong");
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (data?.isAuthenticated === false) {
//     return <Navigate to={"/"} />;
//   }

//   if (data?.user.userType !== "teacher") {
//     return <Navigate to={"/dashboard"} />;
//   }
//   return (
//     <>
//       <ToastContainer />
//       <div className="container">
//         <Sidebar />
//         <div className="AfterSideBar">
//           <div className="Main_Add_Doctor_div">
//             <h1>Create Report</h1>
//             <form>
//               <div>
//                 <label>Student Name</label>
//                 <div className="inputdiv">
//                   <input
//                     type="text"
//                     placeholder="Full Name"
//                     name="name"
//                     value={ReportValue.name}
//                     onChange={HandleReportChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* <div>
//                 <label>Mobile</label>
//                 <div className="inputdiv">
//                   <input
//                     type="number"
//                     placeholder="No"
//                     name="mobile"
//                     value={ReportValue.mobile}
//                     onChange={HandleReportChange}
//                   />
//                 </div>
//               </div> */}

//               <div>
//                 <label>Age</label>
//                 <div className="inputdiv">
//                   <input
//                     type="number"
//                     placeholder="Age"
//                     name="age"
//                     value={ReportValue.age}
//                     onChange={HandleReportChange}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* <div>
//                 <label>Email</label>
//                 <div className="inputdiv">
//                   <input
//                     type="email"
//                     placeholder="abc@abc"
//                     name="email"
//                     value={ReportValue.email}
//                     onChange={HandleReportChange}
//                     required
//                   />
//                 </div>
//               </div> */}

//               <div>
//                 <label>Student Gender</label>
//                 <div className="inputdiv">
//                   <select
//                     name="gender"
//                     value={ReportValue.gender}
//                     onChange={HandleReportChange}
//                   >
//                     <option value="">Choose Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Others">Others</option>
//                   </select>
//                 </div>
//               </div>
//               <div>
//                 <label>Class</label>
//                 <div className="inputdiv">
//                   <select
//                     name="class"
//                     value={ReportValue.class}
//                     onChange={HandleReportChange}
//                     required
//                   >
//                     <option value="">Select Class</option>
//                     <option value="6">6</option>
//                     <option value="7">7</option>
//                     <option value="8">8</option>
//                     <option value="9">9</option>
//                     <option value="10">10</option>
//                     <option value="11">11</option>
//                     <option value="12">12</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label>Teacher Remarks</label>
//                 <div className="inputdiv">
//                   <input
//                     type="text"
//                     placeholder="details"
//                     name="details"
//                     value={ReportValue.details}
//                     onChange={HandleReportChange}
//                   />
//                 </div>
//               </div>
//               {/* ******************************************** */}
//               <div>
//                 <label>marks</label>
//                 <div className="inputdiv">
//                   <input
//                     type="text"
//                     placeholder="subject"
//                     name="subject"
//                     value={mark.subject}
//                     onChange={HandlemarkChange}
//                   />
//                   <input
//                     type="number"
//                     placeholder="mark obtained"
//                     name="score"
//                     value={mark.score}
//                     onChange={HandlemarkChange}
//                   />
//                   <input
//                     type="number"
//                     placeholder="total mark"
//                     name="total"
//                     value={mark.total}
//                     onChange={HandlemarkChange}
//                   />

//                   <input type="submit" value={"Add"} onClick={HandlemarkAdd} />
//                 </div>
//               </div>
//               {/* *********************************** */}
//               <div>
//                 <label>Date</label>
//                 <div className="inputdiv">
//                   <input
//                     type="date"
//                     placeholder="dd-mm-yyyy"
//                     name="date"
//                     value={ReportValue.date}
//                     onChange={HandleReportChange}
//                   />
//                 </div>
//               </div>

//               <button
//                 className="formsubmitbutton bookingbutton"
//                 onClick={HandleReportSubmit}
//               >
//                 {loading ? "Loading..." : "Generate Report"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Discharge_and_Create_Slip;


// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import { CreateReport } from "../../../../../Redux/Datas/action";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const notify = (text) => toast(text);

// const Discharge_and_Create_Slip = () => {
//   const { data } = useSelector((store) => store.auth);
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);

//   // Single mark input
//   const initMark = { subject: "", score: "", total: "" };
//   const [mark, setMark] = useState(initMark);

//   // Marks array
//   const [marks, setMarks] = useState([]);

//   // Report initial values
//   const initData = {
//     name: "",
//     rollNo: "",
//     class: "",
//     section: "",
//     age: "",
//     gender: "",
//     details: "",
//     date: "",
//     marks: [],
//   };

//   const [reportValue, setReportValue] = useState(initData);

//   const handleReportChange = (e) => {
//     setReportValue({ ...reportValue, [e.target.name]: e.target.value });
//   };

//   const handleMarkChange = (e) => {
//     setMark({ ...mark, [e.target.name]: e.target.value });
//   };

//   const handleMarkAdd = (e) => {
//     e.preventDefault();
//     if (!mark.subject || !mark.score || !mark.total) {
//       notify("Please fill subject, score and total");
//       return;
//     }
//     setMarks([...marks, mark]);
//     setMark(initMark);
//   };

//   const handleReportSubmit = (e) => {
//     e.preventDefault();
//     let finalData = { ...reportValue, marks };
//     console.log("📌 Report Submitted:", finalData);

//     try {
//       setLoading(true);
//       dispatch(CreateReport(finalData)).then((res) => {
//         if (res.message === "Report successfully created") {
//           notify("✅ Report Created Successfully");
//           setLoading(false);
//           setReportValue(initData);
//           setMarks([]);
//         } else {
//           setLoading(false);
//           notify("❌ Something went wrong");
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   if (data?.isAuthenticated === false) return <Navigate to="/" />;
//   if (data?.user.userType !== "teacher") return <Navigate to="/dashboard" />;

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex min-h-screen bg-gray-100">
//         {/* Sidebar */}
//         <Sidebar />

//         {/* Main Content */}
//         <div className="flex-1 p-6">
//           <h1 className="text-3xl font-bold mb-6 text-indigo-700">
//             Create Student Report
//           </h1>

//           <form
//             onSubmit={handleReportSubmit}
//             className="bg-white p-6 rounded-2xl shadow-md space-y-6"
//           >
//             {/* Student Info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block font-semibold">Student Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={reportValue.name}
//                   onChange={handleReportChange}
//                   placeholder="Full Name"
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Roll No</label>
//                 <input
//                   type="text"
//                   name="rollNo"
//                   value={reportValue.rollNo}
//                   onChange={handleReportChange}
//                   placeholder="Roll No"
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Class</label>
//                 <select
//                   name="class"
//                   value={reportValue.class}
//                   onChange={handleReportChange}
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                   required
//                 >
//                   <option value="">Select Class</option>
//                   {[6, 7, 8, 9, 10, 11, 12].map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-semibold">Section</label>
//                 <select
//                   name="section"
//                   value={reportValue.section}
//                   onChange={handleReportChange}
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                   required
//                 >
//                   <option value="">Select Section</option>
//                   {["A", "B", "C", "D"].map((sec) => (
//                     <option key={sec} value={sec}>
//                       {sec}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="block font-semibold">Age</label>
//                 <input
//                   type="number"
//                   name="age"
//                   value={reportValue.age}
//                   onChange={handleReportChange}
//                   placeholder="Age"
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block font-semibold">Gender</label>
//                 <select
//                   name="gender"
//                   value={reportValue.gender}
//                   onChange={handleReportChange}
//                   className="w-full border rounded-lg px-3 py-2 mt-1"
//                 >
//                   <option value="">Choose Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Others">Others</option>
//                 </select>
//               </div>
//             </div>

//             {/* Teacher Remarks */}
//             <div>
//               <label className="block font-semibold">Teacher Remarks</label>
//               <textarea
//                 name="details"
//                 value={reportValue.details}
//                 onChange={handleReportChange}
//                 placeholder="Enter remarks about student"
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//                 rows="3"
//               />
//             </div>

//             {/* Marks Section */}
//             <div>
//               <label className="block font-semibold mb-2">Marks</label>
//               <div className="flex flex-col md:flex-row gap-3">
//                 <input
//                   type="text"
//                   name="subject"
//                   value={mark.subject}
//                   onChange={handleMarkChange}
//                   placeholder="Subject"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="score"
//                   value={mark.score}
//                   onChange={handleMarkChange}
//                   placeholder="Score"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="total"
//                   value={mark.total}
//                   onChange={handleMarkChange}
//                   placeholder="Total"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <button
//                   onClick={handleMarkAdd}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Marks Table */}
//               {marks.length > 0 && (
//                 <table className="w-full mt-4 border rounded-lg">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="px-3 py-2 border">Subject</th>
//                       <th className="px-3 py-2 border">Score</th>
//                       <th className="px-3 py-2 border">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {marks.map((m, index) => (
//                       <tr key={index}>
//                         <td className="px-3 py-2 border">{m.subject}</td>
//                         <td className="px-3 py-2 border">{m.score}</td>
//                         <td className="px-3 py-2 border">{m.total}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* Date */}
//             <div>
//               <label className="block font-semibold">Date</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={reportValue.date}
//                 onChange={handleReportChange}
//                 className="w-full border rounded-lg px-3 py-2 mt-1"
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
//             >
//               {loading ? "Loading..." : "Generate Report"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Discharge_and_Create_Slip;


// import React, { useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";

// const Discharge_and_Create_Slip = () => {
//   const [classSelected, setClassSelected] = useState("");
//   const [sectionSelected, setSectionSelected] = useState("");
//   const [students, setStudents] = useState([]);
//   const [activeStudent, setActiveStudent] = useState(null);
//   const [mark, setMark] = useState({ subject: "", score: "", total: "" });
//   const [marks, setMarks] = useState({}); // store marks per student

//   // Dummy students data
//   const dummyData = {
//     "7A": [
//       { _id: "1", rollNo: "101", name: "Rahul Sharma" },
//       { _id: "2", rollNo: "102", name: "Ananya Gupta" },
//     ],
//     "7B": [
//       { _id: "3", rollNo: "201", name: "Vikram Reddy" },
//       { _id: "4", rollNo: "202", name: "Meena Kumari" },
//     ],
//   };

//   const loadStudents = () => {
//     if (!classSelected || !sectionSelected) {
//       alert("Please select class and section");
//       return;
//     }
//     const key = `${classSelected}${sectionSelected}`;
//     setStudents(dummyData[key] || []);
//   };

//   const handleMarkChange = (e) => {
//     setMark({ ...mark, [e.target.name]: e.target.value });
//   };

//   const handleMarkAdd = (studentId) => {
//     if (!mark.subject || !mark.score || !mark.total) {
//       alert("Please fill all fields");
//       return;
//     }
//     setMarks((prev) => ({
//       ...prev,
//       [studentId]: [...(prev[studentId] || []), mark],
//     }));
//     setMark({ subject: "", score: "", total: "" });
//   };

//   const submitReport = (studentId) => {
//     console.log("📌 Report Submitted:", {
//       studentId,
//       marks: marks[studentId] || [],
//     });
//     alert(`Report submitted for student ${studentId}`);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Create Student Report</h1>

//         {/* Class / Section */}
//         <div className="flex gap-4 mb-6">
//           <select
//             className="border px-3 py-2 rounded-lg"
//             onChange={(e) => setClassSelected(e.target.value)}
//           >
//             <option value="">Select Class</option>
//             <option value="7">Class 7</option>
//             <option value="8">Class 8</option>
//           </select>
//           <select
//             className="border px-3 py-2 rounded-lg"
//             onChange={(e) => setSectionSelected(e.target.value)}
//           >
//             <option value="">Select Section</option>
//             <option value="A">Section A</option>
//             <option value="B">Section B</option>
//           </select>
//           <button
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             onClick={loadStudents}
//           >
//             Load Students
//           </button>
//         </div>

//         {/* Students List */}
//         <div className="bg-white shadow rounded-lg p-4">
//           {students.length === 0 ? (
//             <p className="text-gray-500">No students loaded</p>
//           ) : (
//             <table className="w-full border rounded-lg">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="px-3 py-2 border">Roll No</th>
//                   <th className="px-3 py-2 border">Name</th>
//                   <th className="px-3 py-2 border">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((s) => (
//                   <tr key={s._id}>
//                     <td className="px-3 py-2 border">{s.rollNo}</td>
//                     <td className="px-3 py-2 border">{s.name}</td>
//                     <td className="px-3 py-2 border text-center">
//                       <button
//                         onClick={() =>
//                           setActiveStudent(
//                             activeStudent === s._id ? null : s._id
//                           )
//                         }
//                         className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700"
//                       >
//                         {activeStudent === s._id ? "Close" : "Add Report"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Marks Input for Active Student */}
//         {activeStudent && (
//           <div className="mt-6 bg-white shadow rounded-lg p-6">
//             <h2 className="text-xl font-semibold mb-4">
//               Add Marks for{" "}
//               {
//                 students.find((s) => s._id === activeStudent)?.name
//               }
//             </h2>

//             <div>
//               <label className="block font-semibold mb-2">Marks</label>
//               <div className="flex flex-col md:flex-row gap-3">
//                 <input
//                   type="text"
//                   name="subject"
//                   value={mark.subject}
//                   onChange={handleMarkChange}
//                   placeholder="Subject"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="score"
//                   value={mark.score}
//                   onChange={handleMarkChange}
//                   placeholder="Score"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <input
//                   type="number"
//                   name="total"
//                   value={mark.total}
//                   onChange={handleMarkChange}
//                   placeholder="Total"
//                   className="flex-1 border rounded-lg px-3 py-2"
//                 />
//                 <button
//                   onClick={() => handleMarkAdd(activeStudent)}
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//                 >
//                   Add
//                 </button>
//               </div>

//               {/* Marks Table */}
//               {(marks[activeStudent] || []).length > 0 && (
//                 <table className="w-full mt-4 border rounded-lg">
//                   <thead className="bg-gray-200">
//                     <tr>
//                       <th className="px-3 py-2 border">Subject</th>
//                       <th className="px-3 py-2 border">Score</th>
//                       <th className="px-3 py-2 border">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {marks[activeStudent].map((m, index) => (
//                       <tr key={index}>
//                         <td className="px-3 py-2 border">{m.subject}</td>
//                         <td className="px-3 py-2 border">{m.score}</td>
//                         <td className="px-3 py-2 border">{m.total}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             <button
//               onClick={() => submitReport(activeStudent)}
//               className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             >
//               Submit Report
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Discharge_and_Create_Slip;


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
