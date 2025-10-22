

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../../GlobalFiles/Sidebar";

// const notify = (msg) => toast(msg);

// const MyDoubts = () => {
//   const { data } = useSelector((store) => store.auth);
//   const [doubts, setDoubts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newDoubt, setNewDoubt] = useState({ subject: "", details: "" });
//   const [answerModal, setAnswerModal] = useState({ visible: false, doubt: null });

//   const studentID = data?.user?.studentID;
//   const studentClass = data?.user?.class;

//   // Fetch doubts
//   const fetchDoubts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch("http://localhost:7000/doubts");
//       const allDoubts = await res.json();
//       if (Array.isArray(allDoubts)) {
//         const filtered = allDoubts.filter((d) => d.studentID === studentID);
//         setDoubts(filtered);
//       } else {
//         notify("Invalid data received");
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while fetching doubts");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (studentID) fetchDoubts();
//   }, [studentID]);

//   const handleAddDoubtSubmit = async (e) => {
//     e.preventDefault();
//     if (!newDoubt.subject || !newDoubt.details) return notify("Fill all fields");

//     const today = new Date().toISOString().slice(0, 10);
//     const payload = {
//       studentID,
//       class: studentClass,
//       subject: newDoubt.subject,
//       details: newDoubt.details,
//       date: today,
//       status: "Pending",
//     };

//     try {
//       const res = await fetch("http://localhost:7000/doubts/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         notify("Doubt added successfully!");
//         setNewDoubt({ subject: "", details: "" });
//         setShowAddForm(false);
//         fetchDoubts();
//       } else {
//         notify(data.error || "Failed to add doubt");
//       }
//     } catch (err) {
//       console.error(err);
//       notify("Network error while adding doubt");
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <ToastContainer position="top-right" autoClose={2000} />

//         {!showAddForm ? (
//           <>
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-xl font-semibold text-blue-700">My Doubts</h1>
//               <button
//                 onClick={() => setShowAddForm(true)}
//                 className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
//               >
//                 + Ask New Doubt
//               </button>
//             </div>

//             {loading ? (
//               <p className="text-gray-500 text-center mt-20">Loading doubts...</p>
//             ) : doubts.length === 0 ? (
//               <p className="text-gray-600 text-center mt-20">You haven't asked any doubts yet.</p>
//             ) : (
//               <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {doubts.map((d) => (
//                   <div key={d._id} className="bg-white shadow-md rounded-xl p-4 border border-gray-100">
//                     <p className="text-gray-700 text-sm mb-2">
//                       <span className="font-medium">Subject:</span> {d.subject}
//                     </p>
//                     <p className="text-gray-800 text-sm mb-3 line-clamp-2">
//                       <span className="font-medium">Question:</span> {d.details}
//                     </p>
//                     {d.status === "Answered" ? (
//                       <button
//                         onClick={() => setAnswerModal({ visible: true, doubt: d })}
//                         className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
//                       >
//                         View Answer
//                       </button>
//                     ) : (
//                       <p className="text-yellow-600 font-medium mt-3 text-sm">
//                         ⏳ Waiting for teacher’s response...
//                       </p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </>
//         ) : (
//           // Add Doubt Form
//           <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
//             <h2 className="text-lg font-semibold text-blue-700 mb-4">Ask a New Doubt</h2>
//             <form onSubmit={handleAddDoubtSubmit} className="space-y-4 text-sm">
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">Subject</label>
//                 <select
//                   className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                   value={newDoubt.subject}
//                   onChange={(e) => setNewDoubt({ ...newDoubt, subject: e.target.value })}
//                   required
//                 >
//                   <option value="">Select Subject</option>
//                   <option value="math">Math</option>
//                   <option value="science">Science</option>
//                   <option value="socialScience">Social Science</option>
//                   <option value="english">English</option>
//                   <option value="general">General</option>
//                   <option value="telugu">Telugu</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block font-medium text-gray-700 mb-1">Question</label>
//                 <textarea
//                   value={newDoubt.details}
//                   onChange={(e) => setNewDoubt({ ...newDoubt, details: e.target.value })}
//                   className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none h-24"
//                   placeholder="Enter your doubt here..."
//                   required
//                 />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddForm(false)}
//                   className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                 >
//                   Back
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                 >
//                   Submit Doubt
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         {/* Answer Modal */}
//         {/* {answerModal.visible && (
//           <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
//             <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
//               <button
//                 onClick={() => setAnswerModal({ visible: false, doubt: null })}
//                 className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
//               >
//                 ×
//               </button>
//               <h3 className="text-lg font-semibold text-green-600 mb-3">Answer</h3>
//               <p className="text-gray-800 mb-3">{answerModal.doubt.answer}</p>
//               {answerModal.doubt.image && (
//                 <img
//                   src={`http://localhost:7000/${answerModal.doubt.image}`}
//                   alt="Answer"
//                   className="w-full rounded-md"
//                 />
//               )}
//             </div>
//           </div>
//         )} */}
//         {answerModal.visible && (
//   <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-start">
//     <div
//       className="bg-gray-100 shadow-md w-80 p-4 relative max-w-full"
//       style={{ marginLeft: "45%", marginTop: "10%" }}
//     >
//       <button
//         onClick={() => setAnswerModal({ visible: false, doubt: null })}
//         className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
//       >
//         ×
//       </button>
//       <h3 className="text-md font-semibold text-green-600 mb-2">Answer</h3>
//       <p className="text-gray-800 text-sm mb-2">{answerModal.doubt.answer}</p>
//       {answerModal.doubt.image && (
//         <img
//           src={`http://localhost:7000/${answerModal.doubt.image}`}
//           alt="Answer"
//           className="w-full h-auto object-contain"
//         />
//       )}
//     </div>
//   </div>
// )}


//       </div>
//     </div>
//   );
// };

// export default MyDoubts;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../GlobalFiles/Sidebar";

const notify = (msg) => toast(msg);

const MyDoubts = () => {
  const { data } = useSelector((store) => store.auth);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoubt, setNewDoubt] = useState({ subject: "", details: "" });
  const [answerModal, setAnswerModal] = useState({ visible: false, doubt: null });

  const studentID = data?.user?.studentID;
  const studentClass = data?.user?.class;

  // Fetch doubts
  const fetchDoubts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/doubts");
      const allDoubts = await res.json();
      if (Array.isArray(allDoubts)) {
        const filtered = allDoubts.filter((d) => d.studentID === studentID);
        setDoubts(filtered);
      } else {
        notify("Invalid data received");
      }
    } catch (err) {
      console.error(err);
      notify("Network error while fetching doubts");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (studentID) fetchDoubts();
  }, [studentID]);

  const handleAddDoubtSubmit = async (e) => {
    e.preventDefault();
    if (!newDoubt.subject || !newDoubt.details) return notify("Fill all fields");

    const today = new Date().toISOString().slice(0, 10);
    const payload = {
      studentID,
      class: studentClass,
      subject: newDoubt.subject,
      details: newDoubt.details,
      date: today,
      status: "Pending",
    };

    try {
      const res = await fetch("/doubts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        notify("Doubt added successfully!");
        setNewDoubt({ subject: "", details: "" });
        setShowAddForm(false);
        fetchDoubts();
      } else {
        notify(data.error || "Failed to add doubt");
      }
    } catch (err) {
      console.error(err);
      notify("Network error while adding doubt");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <ToastContainer position="top-right" autoClose={2000} />

        {!showAddForm ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-semibold text-blue-700">My Doubts</h1>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
              >
                + Ask New Doubt
              </button>
            </div>

            {loading ? (
              <p className="text-gray-500 text-center mt-20">Loading doubts...</p>
            ) : doubts.length === 0 ? (
              <p className="text-gray-600 text-center mt-20">You haven't asked any doubts yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {doubts.map((d) => (
                  <div
                    key={d._id}
                    className="bg-white shadow-md p-4 border border-gray-100"
                  >
                    <p className="text-gray-700 text-sm mb-2">
                      <span className="font-medium">Subject:</span> {d.subject}
                    </p>
                    <p
                      className="text-gray-800 text-sm mb-3"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      <span className="font-medium">Question:</span> {d.details}
                    </p>
                    {d.status === "Answered" ? (
                      <button
                        onClick={() => setAnswerModal({ visible: true, doubt: d })}
                        className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        View Answer
                      </button>
                    ) : (
                      <p className="text-yellow-600 font-medium mt-3 text-sm">
                        ⏳ Waiting for teacher’s response...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Add Doubt Form
          <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-700 mb-4">Ask a New Doubt</h2>
            <form onSubmit={handleAddDoubtSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Subject</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={newDoubt.subject}
                  onChange={(e) =>
                    setNewDoubt({ ...newDoubt, subject: e.target.value })
                  }
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="math">Math</option>
                  <option value="science">Science</option>
                  <option value="socialScience">Social Science</option>
                  <option value="english">English</option>
                  <option value="general">General</option>
                  <option value="telugu">Telugu</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-1">Question</label>
                <textarea
                  value={newDoubt.details}
                  onChange={(e) =>
                    setNewDoubt({ ...newDoubt, details: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none h-24"
                  placeholder="Enter your doubt here..."
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Submit Doubt
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Answer Modal */}
        {answerModal.visible && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-start justify-start">
            <div
              className="bg-gray-100 shadow-md w-80 p-4 relative max-w-full"
              style={{ marginLeft: "45%", marginTop: "10%" }}
            >
              <button
                onClick={() => setAnswerModal({ visible: false, doubt: null })}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
              >
                ×
              </button>
              <h3 className="text-md font-semibold text-green-600 mb-2">Answer</h3>
              <p className="text-gray-800 text-sm mb-2" style={{ whiteSpace: "pre-wrap" }}>
                {answerModal.doubt.answer}
              </p>
              {answerModal.doubt.image && (
                <img
                  src={`/${answerModal.doubt.image}`}
                  alt="Answer"
                  className="w-full h-auto object-contain"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDoubts;




