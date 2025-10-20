



// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const ViewAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [animatedWidths, setAnimatedWidths] = useState({});

//   useEffect(() => {
//     const fetchOverview = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students");

//         // Map students to classes and count present today
//         const classMap = {};
//         res.data.forEach((student) => {
//           const cls = student.class || "Unknown";
//           if (!classMap[cls]) classMap[cls] = 0;

//           const today = new Date().toISOString().split("T")[0];
//           const presentToday = (student.attendance || []).some(
//             (a) => a.date === today && a.status === "Present"
//           );
//           if (presentToday) classMap[cls] += 1;
//         });

//         const classArray = Object.keys(classMap).map((cls) => ({
//           className: `Class ${cls}`,
//           presentStudents: classMap[cls],
//           totalStudents: 50, // fixed
//           avgAttendance: (classMap[cls] / 50) * 100,
//         }));

//         setClasses(classArray);
//       } catch (err) {
//         console.error("Error fetching attendance overview:", err);
//       }
//     };

//     fetchOverview();
//   }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const widths = {};
//       classes.forEach((cls) => {
//         widths[cls.className] = cls.avgAttendance;
//       });
//       setAnimatedWidths(widths);
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, [classes]);

//   // Overall summary calculations
//   const totalClasses = classes.length;
//   const totalPossible = totalClasses * 50; // 50 per class
//   const totalPresent = classes.reduce((acc, cls) => acc + cls.presentStudents, 0);
//   const overallAvg = totalPossible ? (totalPresent / totalPossible) * 100 : 0;
//   const highestClass =
//     classes.length > 0
//       ? classes.reduce((prev, curr) =>
//           prev.avgAttendance > curr.avgAttendance ? prev : curr
//         )
//       : null;

//   const getGradient = (percentage) => {
//     if (percentage < 50)
//       return `linear-gradient(90deg, #f87171 ${percentage}%, #fecaca ${percentage}%)`;
//     if (percentage < 80)
//       return `linear-gradient(90deg, #fbbf24 ${percentage}%, #fde68a ${percentage}%)`;
//     return `linear-gradient(90deg, #86efac ${percentage}%, #4ade80 ${percentage}%)`;
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">
//           View Attendance <span className="text-sm text-gray-500">- Today</span>
//         </h2>

//         {/* Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center">
//             <p className="text-gray-500 font-medium">Overall Avg</p>
//             <p className="text-2xl font-bold text-black">{overallAvg.toFixed(1)}%</p>
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center">
//             <p className="text-gray-500 font-medium">Highest Attendance</p>
//             <p className="text-2xl font-bold text-black">
//               {highestClass ? highestClass.avgAttendance.toFixed(1) + "%" : "N/A"}
//             </p>
//             {highestClass && (
//               <p className="text-gray-500 text-sm">{highestClass.className}</p>
//             )}
//           </div>
//           <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center">
//             <p className="text-gray-500 font-medium">Total Classes</p>
//             <p className="text-2xl font-bold text-black">{totalClasses}</p>
//           </div>
//         </div>

//         {/* Attendance Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map((cls, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <h3 className="text-xl font-semibold text-black mb-3">{cls.className}</h3>

//               <div className="mb-3">
//                 <div className="flex justify-between text-gray-700 text-sm mb-1">
//                   <span>Today's Attendance</span>
//                   <span>{cls.avgAttendance.toFixed(1)}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 h-3 rounded-full">
//                   <div
//                     className="h-3 rounded-full transition-all duration-1000"
//                     style={{
//                       width: `${animatedWidths[cls.className] || 0}%`,
//                       background: getGradient(cls.avgAttendance),
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm">
//                 <span className="font-semibold">Present Today:</span> {cls.presentStudents}/50
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAttendance;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const ViewAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [animatedWidths, setAnimatedWidths] = useState({});

//   useEffect(() => {
//     const fetchOverview = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students");

//         const classMap = {};
//         res.data.forEach((student) => {
//           const cls = student.class || "Unknown";
//           if (!classMap[cls]) classMap[cls] = 0;

//           const today = new Date().toISOString().split("T")[0];
//           const presentToday = (student.attendance || []).some(
//             (a) => a.date === today && a.status === "Present"
//           );
//           if (presentToday) classMap[cls] += 1;
//         });

//         const classArray = Object.keys(classMap).map((cls) => ({
//           className: `Class ${cls}`,
//           presentStudents: classMap[cls],
//           totalStudents: 50,
//           avgAttendance: (classMap[cls] / 50) * 100,
//         }));

//         setClasses(classArray);
//       } catch (err) {
//         console.error("Error fetching attendance overview:", err);
//       }
//     };

//     fetchOverview();
//   }, []);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const widths = {};
//       classes.forEach((cls) => {
//         widths[cls.className] = cls.avgAttendance;
//       });
//       setAnimatedWidths(widths);
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, [classes]);

//   const totalClasses = classes.length;
//   const totalPossible = totalClasses * 50;
//   const totalPresent = classes.reduce((acc, cls) => acc + cls.presentStudents, 0);
//   const overallAvg = totalPossible ? (totalPresent / totalPossible) * 100 : 0;
//   const highestClass =
//     classes.length > 0
//       ? classes.reduce((prev, curr) =>
//           prev.avgAttendance > curr.avgAttendance ? prev : curr
//         )
//       : null;

//   const getGradient = (percentage) => {
//     if (percentage < 50)
//       return `linear-gradient(90deg, #f87171 ${percentage}%, #fecaca ${percentage}%)`;
//     if (percentage < 80)
//       return `linear-gradient(90deg, #fbbf24 ${percentage}%, #fde68a ${percentage}%)`;
//     return `linear-gradient(90deg, #86efac ${percentage}%, #4ade80 ${percentage}%)`;
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         {/* Title */}
//         <h2 className="text-3xl font-semibold text-gray-800 mb-8">
//           View Attendance <span className="text-sm text-gray-500">- Today</span>
//         </h2>

//         {/* Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Overall Avg</p>
//             <p className="text-2xl font-medium text-gray-800">{overallAvg.toFixed(1)}%</p>
//           </div>
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Highest Attendance</p>
//             <p className="text-2xl font-medium text-gray-800">
//               {highestClass ? highestClass.avgAttendance.toFixed(1) + "%" : "N/A"}
//             </p>
//             {highestClass && <p className="text-gray-500 text-sm mt-1">{highestClass.className}</p>}
//           </div>
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Total Classes</p>
//             <p className="text-2xl font-medium text-gray-800">{totalClasses}</p>
//           </div>
//         </div>

//         {/* Attendance Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map((cls, idx) => (
//             <div
//               key={idx}
//               className="bg-white rounded-md shadow border p-5 hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <h3 className="text-xl font-medium text-gray-800 mb-3">{cls.className}</h3>

//               <div className="mb-3">
//                 <div className="flex justify-between text-gray-700 text-sm mb-1">
//                   <span>Today's Attendance</span>
//                   <span>{cls.avgAttendance.toFixed(1)}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 h-3">
//                   <div
//                     className="h-3 transition-all duration-1000"
//                     style={{
//                       width: `${animatedWidths[cls.className] || 0}%`,
//                       background: getGradient(cls.avgAttendance),
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm">
//                 <span className="font-medium">Present Today:</span> {cls.presentStudents}/50
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAttendance;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const getGradient = (percentage) => {
//   if (percentage < 50)
//     return `linear-gradient(90deg, #f87171 ${percentage}%, #fecaca ${percentage}%)`;
//   if (percentage < 80)
//     return `linear-gradient(90deg, #fbbf24 ${percentage}%, #fde68a ${percentage}%)`;
//   return `linear-gradient(90deg, #86efac ${percentage}%, #4ade80 ${percentage}%)`;
// };

// const ViewAttendance = () => {
//   const [classes, setClasses] = useState([]);
//   const [animatedWidths, setAnimatedWidths] = useState({});

//   useEffect(() => {
//     const fetchOverview = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students");
//         const students = res.data;

//         // Initialize 10 classes
//         const classMap = {};
//         for (let i = 1; i <= 10; i++) {
//           classMap[i] = 0; // default 0 present
//         }

//         const today = new Date().toISOString().split("T")[0];

//         // Count present students per class
//         students.forEach((student) => {
//           const cls = parseInt(student.class, 10); // student's class
//           if (cls >= 1 && cls <= 10) {
//             const presentToday = (student.attendance || []).some(
//               (a) => a.date === today && a.status === "Present"
//             );
//             if (presentToday) classMap[cls] += 1;
//           }
//         });

//         // Convert to array
//         const classArray = Object.keys(classMap).map((clsNum) => ({
//           className: `Class ${clsNum}`,
//           presentStudents: classMap[clsNum],
//           totalStudents: 50,
//           avgAttendance: (classMap[clsNum] / 50) * 100,
//         }));

//         setClasses(classArray);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       }
//     };

//     fetchOverview();
//   }, []);

//   // Animate progress bars
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const widths = {};
//       classes.forEach((cls) => {
//         widths[cls.className] = cls.avgAttendance;
//       });
//       setAnimatedWidths(widths);
//     }, 200);
//     return () => clearTimeout(timeout);
//   }, [classes]);

//   // Overall calculations
//   const totalClasses = 10;
//   const totalPossible = totalClasses * 50;
//   const totalPresent = classes.reduce((acc, cls) => acc + cls.presentStudents, 0);
//   const overallAvg = totalPossible ? (totalPresent / totalPossible) * 100 : 0;

//   const highestClass =
//     classes.length > 0
//       ? classes.reduce((prev, curr) =>
//           prev.avgAttendance > curr.avgAttendance ? prev : curr
//         )
//       : null;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-8">
//         <h2 className="text-3xl font-semibold text-gray-800 mb-8">
//           View Attendance <span className="text-sm text-gray-500">- Today</span>
//         </h2>

//         {/* Summary */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Overall Avg</p>
//             <p className="text-2xl font-medium text-gray-800">{overallAvg.toFixed(1)}%</p>
//           </div>
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Highest Attendance</p>
//             <p className="text-2xl font-medium text-gray-800">
//               {highestClass ? highestClass.avgAttendance.toFixed(1) + "%" : "N/A"}
//             </p>
//             {highestClass && <p className="text-gray-500 text-sm mt-1">{highestClass.className}</p>}
//           </div>
//           <div className="bg-white shadow border p-6 flex flex-col items-center">
//             <p className="text-gray-600 font-medium mb-2">Total Classes</p>
//             <p className="text-2xl font-medium text-gray-800">{totalClasses}</p>
//           </div>
//         </div>

//         {/* Attendance Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {classes.map((cls, idx) => (
//             <div
//               key={idx}
//               className="bg-white shadow border p-5 hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <h3 className="text-xl font-medium text-gray-800 mb-3">{cls.className}</h3>

//               <div className="mb-3">
//                 <div className="flex justify-between text-gray-700 text-sm mb-1">
//                   <span>Today's Attendance</span>
//                   <span>{cls.avgAttendance.toFixed(1)}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 h-3">
//                   <div
//                     className="h-3 transition-all duration-1000"
//                     style={{
//                       width: `${animatedWidths[cls.className] || 0}%`,
//                       background: getGradient(cls.avgAttendance),
//                     }}
//                   ></div>
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm">
//                 <span className="font-medium">Present Today:</span> {cls.presentStudents}/50
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewAttendance;

import React, { useEffect, useState } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";

const getGradient = (percentage) => {
  if (percentage < 50)
    return `linear-gradient(90deg, #f87171 ${percentage}%, #fecaca ${percentage}%)`;
  if (percentage < 80)
    return `linear-gradient(90deg, #fbbf24 ${percentage}%, #fde68a ${percentage}%)`;
  return `linear-gradient(90deg, #86efac ${percentage}%, #4ade80 ${percentage}%)`;
};

const ViewAttendance = () => {
  const [classes, setClasses] = useState([]);
  const [animatedWidths, setAnimatedWidths] = useState({});

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await axios.get("http://localhost:7000/students");
        const students = res.data;

        // Initialize 10 classes
        const classMap = {};
        for (let i = 1; i <= 10; i++) classMap[i] = 0;

        const today = new Date().toISOString().split("T")[0];

        // Count present students per class
        students.forEach((student) => {
          const cls = parseInt(student.class, 10);
          if (cls >= 1 && cls <= 10) {
            const presentToday = (student.attendance || []).some(
              (a) => a.date === today && a.status === "Present"
            );
            if (presentToday) classMap[cls] += 1;
          }
        });

        const classArray = Object.keys(classMap).map((clsNum) => ({
          className: `Class ${clsNum}`,
          presentStudents: classMap[clsNum],
          totalStudents: 50,
          avgAttendance: (classMap[clsNum] / 50) * 100,
        }));

        setClasses(classArray);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchOverview();
  }, []);

  // Animate progress bars
  useEffect(() => {
    const timeout = setTimeout(() => {
      const widths = {};
      classes.forEach((cls) => {
        widths[cls.className] = cls.avgAttendance;
      });
      setAnimatedWidths(widths);
    }, 200);
    return () => clearTimeout(timeout);
  }, [classes]);

  // Overall calculations
  const totalClasses = 10;
  const totalPossible = totalClasses * 50;
  const totalPresent = classes.reduce((acc, cls) => acc + cls.presentStudents, 0);
  const overallAvg = totalPossible ? (totalPresent / totalPossible) * 100 : 0;
  const highestClass =
    classes.length > 0
      ? classes.reduce((prev, curr) =>
          prev.avgAttendance > curr.avgAttendance ? prev : curr
        )
      : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          View Attendance <span className="text-sm text-gray-500">- Today</span>
        </h1>

        {/* Overall Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-100 rounded-lg shadow-md p-6 flex flex-col items-center">
            <p className="text-blue-500 font-medium mb-2">Overall Avg</p>
            <p className="text-2xl font-semibold text-blue-800">{overallAvg.toFixed(1)}%</p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-lg shadow-md p-6 flex flex-col items-center">
            <p className="text-green-500 font-medium mb-2">Highest Attendance</p>
            <p className="text-2xl font-semibold text-green-800">
              {highestClass ? highestClass.avgAttendance.toFixed(1) + "%" : "N/A"}
            </p>
            {highestClass && <p className="text-green-600 text-sm mt-1">{highestClass.className}</p>}
          </div>
          <div className="bg-purple-50 border border-purple-100 rounded-lg shadow-md p-6 flex flex-col items-center">
            <p className="text-purple-500 font-medium mb-2">Total Classes</p>
            <p className="text-2xl font-semibold text-purple-800">{totalClasses}</p>
          </div>
        </div>

        {/* Class Attendance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg shadow p-5 hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-medium text-gray-800 mb-3">{cls.className}</h3>

              <div className="mb-3">
                <div className="flex justify-between text-gray-700 text-sm mb-1">
                  <span>Today's Attendance</span>
                  <span>{cls.avgAttendance.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 h-3 rounded-md">
                  <div
                    className="h-3 rounded-md transition-all duration-1000"
                    style={{
                      width: `${animatedWidths[cls.className] || 0}%`,
                      background: getGradient(cls.avgAttendance),
                    }}
                  ></div>
                </div>
              </div>

              <p className="text-gray-700 text-sm">
                <span className="font-medium">Present Today:</span> {cls.presentStudents}/50
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewAttendance;
