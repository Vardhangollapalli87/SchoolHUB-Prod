

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const MyAttendance = () => {
//   const [student, setStudent] = useState({});
//   const [attendance, setAttendance] = useState([]);
//   const [filteredAttendance, setFilteredAttendance] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("All");

//   useEffect(() => {
//   const fetchStudentData = async () => {
//     try {
//       const storedData = localStorage.getItem("store"); // key is 'store'
//       if (!storedData) {
//         console.log("Auth data not found");
//         return;
//       }

//       const parsedData = JSON.parse(storedData);
//       // console.log("Parsed Data:", parsedData); // debugging

//       const studentID = parsedData?.auth?.data?.user?.studentID; // correct path

//       // console.log(studentID);

//       if (!studentID) {
//         console.log("Student ID not found in auth data");
//         return;
//       }

//       const response = await axios.get(
//         `http://localhost:7000/students/id/${studentID}`
//       );

//       const studentData = response.data;
//       setStudent(studentData);
//       setAttendance(studentData.attendance || []);
//       setFilteredAttendance(studentData.attendance || []);
//     } catch (error) {
//       console.error("Error fetching student data:", error);
//     }
//   };

//   fetchStudentData();
// }, []);

//   // Filter attendance by month
//   useEffect(() => {
//     let filtered = [...attendance];
//     if (selectedMonth !== "All") {
//       filtered = filtered.filter(
//         (a) => new Date(a.date).getMonth() + 1 === parseInt(selectedMonth)
//       );
//     }
//     setFilteredAttendance(filtered);
//   }, [selectedMonth, attendance]);

//   const totalDays = filteredAttendance.length;
//   const presentDays = filteredAttendance.filter(
//     (a) => a.status === "Present"
//   ).length;
//   const attendancePercent = totalDays
//     ? ((presentDays / totalDays) * 100).toFixed(1)
//     : 0;

//   const months = [
//     { name: "All", value: "All" },
//     { name: "January", value: "1" },
//     { name: "February", value: "2" },
//     { name: "March", value: "3" },
//     { name: "April", value: "4" },
//     { name: "May", value: "5" },
//     { name: "June", value: "6" },
//     { name: "July", value: "7" },
//     { name: "August", value: "8" },
//     { name: "September", value: "9" },
//     { name: "October", value: "10" },
//     { name: "November", value: "11" },
//     { name: "December", value: "12" },
//   ];

//   return (
//     <div className="flex bg-gray-100 min-h-screen">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <div className="bg-white shadow-xl rounded-2xl p-6">
//           <h1 className="text-3xl font-semibold text-gray-700 mb-2">
//             My Attendance
//           </h1>
//           <p className="text-gray-500 mb-6">
//             Welcome back,{" "}
//             <span className="font-medium">
//               {student.studentName || "Student"}
//             </span>
//           </p>

//           {/* Filters */}
//           <div className="flex flex-wrap gap-4 mb-8">
//             <div>
//               <label className="text-sm text-gray-600 mr-2">Month:</label>
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
//               >
//                 {months.map((m) => (
//                   <option key={m.value} value={m.value}>
//                     {m.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Student Info */}
//           <div className="grid grid-cols-3 gap-4 mb-8">
//             <div className="p-4 bg-blue-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Roll No</p>
//               <p className="text-lg font-medium text-gray-700">
//                 {student.studentID}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Class</p>
//               <p className="text-lg font-medium text-gray-700">
//                 {student.class}
//               </p>
//             </div>
//             <div className="p-4 bg-blue-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Attendance %</p>
//               <p
//                 className={`text-lg font-semibold ${
//                   attendancePercent >= 75 ? "text-green-600" : "text-red-500"
//                 }`}
//               >
//                 {attendancePercent}%
//               </p>
//             </div>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
//             <div
//               className={`h-4 rounded-full ${
//                 attendancePercent >= 75 ? "bg-green-500" : "bg-red-500"
//               }`}
//               style={{ width: `${attendancePercent}%` }}
//             ></div>
//           </div>

//           {/* Attendance Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-700">
//                   <th className="py-2 px-4 border-b">Date</th>
//                   <th className="py-2 px-4 border-b">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAttendance.length === 0 ? (
//                   <tr>
//                     <td colSpan="2" className="text-center py-4 text-gray-500">
//                       No attendance records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAttendance.map((day, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 border-b">{day.date}</td>
//                       <td
//                         className={`py-2 px-4 border-b font-medium ${
//                           day.status === "Present"
//                             ? "text-green-600"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {day.status}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Summary */}
//           <div className="mt-8 flex justify-between text-gray-600 text-sm">
//             <p>Total Days: {totalDays}</p>
//             <p>Present: {presentDays}</p>
//             <p>Absent: {totalDays - presentDays}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAttendance;


// import React, { useState, useEffect } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const MyAttendance = () => {
//   const [student, setStudent] = useState({});
//   const [attendance, setAttendance] = useState([]);
//   const [filteredAttendance, setFilteredAttendance] = useState([]);
//   const [selectedMonth, setSelectedMonth] = useState("All");

//   useEffect(() => {
//     const fetchStudentData = async () => {
//       try {
//         const storedData = localStorage.getItem("store");
//         if (!storedData) return;

//         const parsedData = JSON.parse(storedData);
//         const studentID = parsedData?.auth?.data?.user?.studentID;
//         if (!studentID) return;

//         const response = await axios.get(
//           `http://localhost:7000/students/id/${studentID}`
//         );

//         const studentData = response.data;
//         setStudent(studentData);
//         setAttendance(studentData.attendance || []);
//         setFilteredAttendance(studentData.attendance || []);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };
//     fetchStudentData();
//   }, []);

//   useEffect(() => {
//     let filtered = [...attendance];
//     if (selectedMonth !== "All") {
//       filtered = filtered.filter(
//         (a) => new Date(a.date).getMonth() + 1 === parseInt(selectedMonth)
//       );
//     }
//     setFilteredAttendance(filtered);
//   }, [selectedMonth, attendance]);

//   const totalDays = filteredAttendance.length;
//   const presentDays = filteredAttendance.filter(
//     (a) => a.status === "Present"
//   ).length;
//   const attendancePercent = totalDays
//     ? ((presentDays / totalDays) * 100).toFixed(1)
//     : 0;

//   const months = [
//     { name: "All", value: "All" },
//     { name: "January", value: "1" },
//     { name: "February", value: "2" },
//     { name: "March", value: "3" },
//     { name: "April", value: "4" },
//     { name: "May", value: "5" },
//     { name: "June", value: "6" },
//     { name: "July", value: "7" },
//     { name: "August", value: "8" },
//     { name: "September", value: "9" },
//     { name: "October", value: "10" },
//     { name: "November", value: "11" },
//     { name: "December", value: "12" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 p-8">
//         {/* Top Info */}
//         {/* Top Title */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-700">My Attendance</h1>
//         </div>


//         {/* Month Filter */}
//         <div className="mb-6">
//           <label className="mr-3 text-gray-600">Filter by Month:</label>
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             className="border border-gray-300 px-3 py-1 focus:ring focus:ring-blue-200"
//           >
//             {months.map((m) => (
//               <option key={m.value} value={m.value}>
//                 {m.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Attendance Card */}
//         <div className="bg-white shadow-sm p-6">
//           <h2 className="text-xl font-semibold mb-4">Attendance Records</h2>

//           {/* Progress Bar */}
//           <div className="w-full bg-gray-200 h-3 mb-6">
//             <div
//               className="h-3 bg-blue-600"
//               style={{ width: `${attendancePercent}%` }}
//             />
//           </div>

//           {/* Attendance Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="py-2 px-4 border-b text-left">Date</th>
//                   <th className="py-2 px-4 border-b text-left">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredAttendance.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan="2"
//                       className="text-center py-4 text-gray-500"
//                     >
//                       No attendance records found.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredAttendance.map((day, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                       <td className="py-2 px-4 border-b">{day.date}</td>
//                       <td
//                         className={`py-2 px-4 border-b font-medium ${
//                           day.status === "Present"
//                             ? "text-green-600"
//                             : "text-gray-700"
//                         }`}
//                       >
//                         {day.status}
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Summary */}
//           <div className="mt-6 flex justify-between text-gray-600 text-sm">
//             <div>Total Days: {totalDays}</div>
//             <div>Present: {presentDays}</div>
//             <div>Absent: {totalDays - presentDays}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyAttendance;

import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";

const MyAttendance = () => {
  const [student, setStudent] = useState({});
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  // Default: current month & year
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    String(currentDate.getMonth() + 1)
  );
  const [selectedYear, setSelectedYear] = useState(
    String(currentDate.getFullYear())
  );

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const storedData = localStorage.getItem("store");
        if (!storedData) return;

        const parsedData = JSON.parse(storedData);
        const studentID = parsedData?.auth?.data?.user?.studentID;
        if (!studentID) return;

        const response = await axios.get(
          `/students/id/${studentID}`
        );

        const studentData = response.data;
        setStudent(studentData);
        setAttendance(studentData.attendance || []);
        setFilteredAttendance(studentData.attendance || []);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  useEffect(() => {
    let filtered = [...attendance];
    filtered = filtered.filter((a) => {
      const dateObj = new Date(a.date);
      const monthMatch =
        selectedMonth === "All" ||
        dateObj.getMonth() + 1 === parseInt(selectedMonth);
      const yearMatch =
        selectedYear === "All" ||
        dateObj.getFullYear() === parseInt(selectedYear);
      return monthMatch && yearMatch;
    });
    setFilteredAttendance(filtered);
  }, [selectedMonth, selectedYear, attendance]);

  // Attendance stats
  const totalDays = filteredAttendance.length;
  const presentDays = filteredAttendance.filter(
    (a) => a.status === "Present"
  ).length;
  const absentDays = totalDays - presentDays;
  const attendancePercent = totalDays
    ? ((presentDays / totalDays) * 100).toFixed(1)
    : 0;

  // Options
  const months = [
    { name: "All", value: "All" },
    { name: "January", value: "1" },
    { name: "February", value: "2" },
    { name: "March", value: "3" },
    { name: "April", value: "4" },
    { name: "May", value: "5" },
    { name: "June", value: "6" },
    { name: "July", value: "7" },
    { name: "August", value: "8" },
    { name: "September", value: "9" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  const years = ["All", "2023", "2024", "2025", "2026"];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Attendance
          </h1>
          <div className="flex gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:ring focus:ring-blue-200"
            >
              {months.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.name}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white focus:ring focus:ring-blue-200"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-4 gap-6 mb-4">
            <div className="text-center">
              <div className="text-gray-600 text-sm">Total Days</div>
              <div className="text-2xl font-semibold text-gray-800">
                {totalDays}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Present</div>
              <div className="text-2xl font-semibold text-green-600">
                {presentDays}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Absent</div>
              <div className="text-2xl font-semibold text-red-500">
                {absentDays}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">Attendance %</div>
              <div className="text-2xl font-semibold text-blue-600">
                {attendancePercent}%
              </div>
            </div>
          </div>

          {/* Attendance Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 mt-3">
            <div
              className="h-4 bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${attendancePercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Overall Attendance Progress
          </p>
        </div>

        {/* Attendance Table */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Attendance Records
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center py-6 text-gray-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((day, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{day.date}</td>
                      <td
                        className={`py-2 px-4 border-b ${
                          day.status === "Present"
                            ? "text-green-600 font-medium"
                            : "text-red-500 font-medium"
                        }`}
                      >
                        {day.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAttendance;



