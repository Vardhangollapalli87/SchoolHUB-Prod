

// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const Classes = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students/"); // your backend endpoint
//         setStudents(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // Compute classes dynamically without sections
//   const classesMap = students.reduce((acc, student) => {
//     const key = student.class; // only class, ignore section
//     if (!acc[key]) acc[key] = { name: student.class, count: 0 };
//     acc[key].count += 1;
//     return acc;
//   }, {});

//   const classesArray = Object.values(classesMap);

//   const maxStrength = 50; // maximum students per class for bar

//   if (loading) {
//     return (
//       <div className="flex min-h-screen justify-center items-center bg-gray-50">
//         <p className="text-gray-500 text-lg">Loading students data...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6">Classes Overview</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//           {classesArray.map((cls, index) => {
//             const percentage = Math.min((cls.count / maxStrength) * 100, 100);

//             return (
//               <div
//                 key={index}
//                 className="bg-white rounded-md shadow-md p-5 hover:shadow-lg transition transform hover:-translate-y-1"
//               >
//                 <h3 className="text-lg font-medium text-gray-700 mb-3">{cls.name}</h3>

//                 <div className="mb-3">
//                   <div className="flex justify-between text-gray-600 text-sm mb-1">
//                     <span>Strength</span>
//                     <span>{cls.count} / {maxStrength}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 h-2 rounded">
//                     <div
//                       className="h-2 rounded bg-gradient-to-r from-indigo-400 to-blue-500 transition-all"
//                       style={{ width: `${percentage}%` }}
//                     ></div>
//                   </div>
//                 </div>

//                 <p className="text-gray-600 text-sm">
//                   <span className="font-medium">Percentage:</span> {percentage.toFixed(1)}%
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classes;

// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";
// import { FaChalkboardTeacher } from "react-icons/fa";

// const Classes = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const allClasses = [
//     "Class 1","Class 2","Class 3","Class 4","Class 5",
//     "Class 6","Class 7","Class 8","Class 9","Class 10"
//   ];

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students/");
//         setStudents(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const maxStrength = 50;

//   const classesArray = allClasses.map((clsName, index) => {
//     const count = students.filter(
//       (student) => parseInt(student.class) === index + 1
//     ).length;
//     const percentage = Math.min((count / maxStrength) * 100, 100);
//     return { name: clsName, count, percentage };
//   });

//   if (loading) {
//     return (
//       <div className="flex min-h-screen justify-center items-center bg-gray-50">
//         <p className="text-gray-500 text-lg">Loading students data...</p>
//       </div>
//     );
//   }

//   // Function to pick color based on occupancy
//   const occupancyColor = (perc) => {
//     if (perc >= 80) return "bg-red-500";
//     if (perc >= 50) return "bg-yellow-400";
//     return "bg-green-500";
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Classes Overview</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {classesArray.map((cls, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer relative"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center gap-2">
  
//                   <h3 className="text-xl font-semibold text-gray-800">{cls.name}</h3>
//                 </div>
//                 <span className="text-sm text-gray-500">{cls.count} students</span>
//               </div>

//               {/* Occupancy Bar */}
//               <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
//                 <div
//                   className={`h-4 rounded-full transition-all ${occupancyColor(cls.percentage)}`}
//                   style={{ width: `${cls.percentage}%` }}
//                 ></div>
//                 <span className="absolute right-2 top-0 text-xs text-gray-700 font-semibold">
//                   {cls.percentage.toFixed(1)}%
//                 </span>
//               </div>

//               {/* Footer Info */}
//               <p className="text-gray-500 text-sm mt-2">
//                 Max Capacity: {maxStrength} students
//               </p>

//               {/* Hover Tooltip */}
//               <div className="absolute top-2 right-2 text-xs text-gray-400 opacity-0 hover:opacity-100 transition">
//                 {cls.count === 0 ? "No students yet" : `${cls.count} enrolled`}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classes;


// import React, { useEffect, useState } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const Classes = () => {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [maxCapacity, setMaxCapacity] = useState(
//     Array(10).fill(50) // default max per class
//   );

//   const allClasses = [
//     "Class 1","Class 2","Class 3","Class 4","Class 5",
//     "Class 6","Class 7","Class 8","Class 9","Class 10"
//   ];

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await axios.get("http://localhost:7000/students/");
//         setStudents(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const classesArray = allClasses.map((clsName, index) => {
//     const count = students.filter(
//       (student) => parseInt(student.class) === index + 1
//     ).length;
//     const percentage = Math.min((count / maxCapacity[index]) * 100, 100);
//     return { name: clsName, count, percentage };
//   });

//   if (loading) {
//     return (
//       <div className="flex min-h-screen justify-center items-center bg-gray-50">
//         <p className="text-gray-500 text-lg">Loading students data...</p>
//       </div>
//     );
//   }

//   const occupancyColor = (perc) => {
//     if (perc >= 80) return "bg-red-500";
//     if (perc >= 50) return "bg-yellow-400";
//     return "bg-green-500";
//   };

//   const handleMaxChange = (index, value) => {
//     const newMax = [...maxCapacity];
//     newMax[index] = Number(value) || 1; // minimum 1 to avoid division by 0
//     setMaxCapacity(newMax);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="flex-1 p-6">
//         <h2 className="text-3xl font-bold text-gray-800 mb-8">Classes Overview</h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {classesArray.map((cls, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-md shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-xl font-semibold text-gray-800">{cls.name}</h3>
//                 <span className="text-sm text-gray-500">{cls.count} students</span>
//               </div>

//               {/* Occupancy Bar */}
//               <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
//                 <div
//                   className={`h-4 rounded-full transition-all ${occupancyColor(cls.percentage)}`}
//                   style={{ width: `${cls.percentage}%` }}
//                 ></div>
//                 <span className="absolute right-2 top-0 text-xs text-gray-700 font-semibold">
//                   {cls.percentage.toFixed(1)}%
//                 </span>
//               </div>

//               {/* Max Capacity Input */}
//               <div className="flex items-center justify-between mt-2">
//                 <label className="text-gray-500 text-sm font-medium">Max Capacity:</label>
//                 <input
//                   type="number"
//                   min={1}
//                   value={maxCapacity[index]}
//                   onChange={(e) => handleMaxChange(index, e.target.value)}
//                   className="w-16 p-1 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-blue-400"
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Classes;

import React, { useEffect, useState } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";

const Classes = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxCapacity, setMaxCapacity] = useState(
    Array(10).fill(50) // default max per class
  );

  const allClasses = [
    "Class 1","Class 2","Class 3","Class 4","Class 5",
    "Class 6","Class 7","Class 8","Class 9","Class 10"
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("/students/");
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const classesArray = allClasses.map((clsName, index) => {
    const count = students.filter(
      (student) => parseInt(student.class) === index + 1
    ).length;
    const percentage = Math.min((count / maxCapacity[index]) * 100, 100);
    return { name: clsName, count, percentage };
  });

  const occupancyColor = (perc) => {
    if (perc >= 80) return "bg-red-500";
    if (perc >= 50) return "bg-yellow-400";
    return "bg-green-500";
  };

  const handleMaxChange = (index, value) => {
    const newMax = [...maxCapacity];
    newMax[index] = Number(value) || 1; // minimum 1 to avoid division by 0
    setMaxCapacity(newMax);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Classes Overview</h2>

        {/* Only Classes Section Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-gray-50 rounded-md">
            <p className="text-gray-500 text-lg">Loading classes data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classesArray.map((cls, index) => (
              <div
                key={index}
                className="bg-white rounded-md shadow-lg p-6 hover:shadow-2xl transition transform hover:-translate-y-2 relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{cls.name}</h3>
                  <span className="text-sm text-gray-500">{cls.count} students</span>
                </div>

                {/* Occupancy Bar */}
                <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className={`h-4 rounded-full transition-all ${occupancyColor(cls.percentage)}`}
                    style={{ width: `${cls.percentage}%` }}
                  ></div>
                  <span className="absolute right-2 top-0 text-xs text-gray-700 font-semibold">
                    {cls.percentage.toFixed(1)}%
                  </span>
                </div>

                {/* Max Capacity Input */}
                <div className="flex items-center justify-between mt-2">
                  <label className="text-gray-500 text-sm font-medium">Max Capacity:</label>
                  <input
                    type="number"
                    min={1}
                    value={maxCapacity[index]}
                    onChange={(e) => handleMaxChange(index, e.target.value)}
                    className="w-16 p-1 border rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;






