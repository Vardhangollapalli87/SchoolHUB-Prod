

// import React, { useState, useEffect } from "react";
// import Sidebar from "../../GlobalFiles/Sidebar";
// import axios from "axios";

// const MyFees = () => {
//   const [fees, setFees] = useState([]);

//   // Frontend-only amounts for each term
//   const termAmounts = {
//     "First Term": 10000,
//     "Mid Term": 15000,
//     "Last Term": 15000,
//   };

//   useEffect(() => {
//     let intervalId;

//     const fetchStudentFees = async () => {
//       try {
//         const storedData = localStorage.getItem("store");
//         if (!storedData) return;

//         const parsedData = JSON.parse(storedData);
//         const studentID = parsedData?.auth?.data?.user?.studentID;
//         if (!studentID) return;

//         const res = await axios.get(
//           `http://localhost:7000/students/fees/${studentID}`
//         );
//         setFees(res.data);
//       } catch (err) {
//         console.error("Error fetching fees:", err);
//       }
//     };

//     // Initial fetch
//     fetchStudentFees();

//     // Auto-refresh every 5 seconds
//     intervalId = setInterval(fetchStudentFees, 5000);

//     // Cleanup interval on unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   // Calculate totals dynamically
//   const totalFees = fees.reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);
//   const totalPaid = fees
//     .filter((f) => f.status === "Paid")
//     .reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);
//   const totalDue = totalFees - totalPaid;
//   const paidPercent = ((totalPaid / totalFees) * 100).toFixed(1);

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar />

//       <div className="flex-1 p-8">
//         <div className="bg-white shadow-xl rounded-2xl p-6 max-w-5xl mx-auto">

//           {/* Heading */}
//           <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">MyFees</h1>

//           {/* --- Summary Section --- */}
//           <div className="grid grid-cols-3 gap-4 mb-8">
//             <div className="p-4 bg-blue-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Total Fees</p>
//               <p className="text-lg font-semibold text-gray-700">₹{totalFees}</p>
//             </div>
//             <div className="p-4 bg-green-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Paid</p>
//               <p className="text-lg font-semibold text-green-600">₹{totalPaid}</p>
//             </div>
//             <div className="p-4 bg-red-50 rounded-lg text-center">
//               <p className="text-sm text-gray-500">Due</p>
//               <p className="text-lg font-semibold text-red-600">₹{totalDue}</p>
//             </div>
//           </div>

//           {/* --- Progress Bar --- */}
//           <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
//             <div
//               className={`h-4 rounded-full ${
//                 paidPercent >= 75 ? "bg-green-500" : "bg-yellow-500"
//               }`}
//               style={{ width: `${paidPercent}%` }}
//             ></div>
//           </div>

//           {/* --- Fees Table --- */}
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="bg-gray-200 text-gray-700">
//                   <th className="py-2 px-4 border-b">Term</th>
//                   <th className="py-2 px-4 border-b">Amount (₹)</th>
//                   <th className="py-2 px-4 border-b">Status</th>
//                   <th className="py-2 px-4 border-b">Paid On</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fees.map((fee, index) => (
//                   <tr key={index} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border-b">{fee.term}</td>
//                     <td className="py-2 px-4 border-b">₹{termAmounts[fee.term]}</td>
//                     <td
//                       className={`py-2 px-4 border-b font-medium ${
//                         fee.status === "Paid" ? "text-green-600" : "text-red-500"
//                       }`}
//                     >
//                       {fee.status}
//                     </td>
//                     <td className="py-2 px-4 border-b">
//                       {fee.paidOn ? fee.paidOn : "-"}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyFees;


import React, { useState, useEffect } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import axios from "axios";

const MyFees = () => {
  const [fees, setFees] = useState([]);

  const termAmounts = {
    "First Term": 10000,
    "Mid Term": 15000,
    "Last Term": 15000,
  };

  useEffect(() => {
    let intervalId;

    const fetchStudentFees = async () => {
      try {
        const storedData = localStorage.getItem("store");
        if (!storedData) return;

        const parsedData = JSON.parse(storedData);
        const studentID = parsedData?.auth?.data?.user?.studentID;
        if (!studentID) return;

        const res = await axios.get(
          `/students/fees/${studentID}`
        );
        setFees(res.data);
      } catch (err) {
        console.error("Error fetching fees:", err);
      }
    };

    fetchStudentFees();
    intervalId = setInterval(fetchStudentFees, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const totalFees = fees.reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);
  const totalPaid = fees
    .filter((f) => f.status === "Paid")
    .reduce((sum, f) => sum + (termAmounts[f.term] || 0), 0);
  const totalDue = totalFees - totalPaid;
  const paidPercent = ((totalPaid / totalFees) * 100).toFixed(1);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        {/* --- Page Heading --- */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Fee Management</h1>

        <div className="bg-gray-50 shadow-lg rounded-md p-6 max-w-5xl mx-auto">
          {/* --- Summary Section --- */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="p-5 bg-gray-200 rounded-lg text-center">
              <p className="text-sm text-gray-600">Total Fees</p>
              <p className="text-xl font-semibold text-gray-800">₹{totalFees}</p>
            </div>
            <div className="p-5 bg-green-100 rounded-lg text-center">
              <p className="text-sm text-gray-600">Paid</p>
              <p className="text-xl font-semibold text-green-600">₹{totalPaid}</p>
            </div>
            <div className="p-5 bg-red-100 rounded-lg text-center">
              <p className="text-sm text-gray-600">Due</p>
              <p className="text-xl font-semibold text-red-600">₹{totalDue}</p>
            </div>
          </div>

          {/* --- Progress Bar --- */}
          <div className="w-full bg-gray-300 rounded-full h-4 mb-8">
            <div
              className={`h-4 rounded-full ${
                paidPercent >= 75 ? "bg-green-500" : "bg-yellow-500"
              }`}
              style={{ width: `${paidPercent}%` }}
            ></div>
          </div>

          {/* --- Fees Table --- */}
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-gray-300 text-gray-700">
                  <th className="py-3 px-4 border-b">Term</th>
                  <th className="py-3 px-4 border-b">Amount (₹)</th>
                  <th className="py-3 px-4 border-b">Status</th>
                  <th className="py-3 px-4 border-b">Paid On</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((fee, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{fee.term}</td>
                    <td className="py-2 px-4 border-b">₹{termAmounts[fee.term]}</td>
                    <td
                      className={`py-2 px-4 border-b font-medium ${
                        fee.status === "Paid" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {fee.status}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {fee.paidOn ? fee.paidOn : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFees;
