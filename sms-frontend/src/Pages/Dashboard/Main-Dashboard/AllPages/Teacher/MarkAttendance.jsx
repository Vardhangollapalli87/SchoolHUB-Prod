

// import React, { useEffect, useState } from "react";
// import { Table, DatePicker, Select, Button, Radio, message } from "antd";
// import dayjs from "dayjs";
// import axios from "axios";
// import Sidebar from "../../GlobalFiles/Sidebar";

// const MarkAttendance = () => {
//   const [students, setStudents] = useState([]);
//   const [classSelected, setClassSelected] = useState("All");
//   const [date, setDate] = useState(dayjs()); // default today
//   const [attendance, setAttendance] = useState({});

//   const classes = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

//   // Fetch all students and filter for those whose attendance not marked for selected date
//   const fetchStudents = async () => {
//     try {
//       const classQuery = classSelected === "All" ? "" : `?class=${classSelected}`;
//       const res = await axios.get(`http://localhost:7000/students${classQuery}`);

//       const selectedDate = date.format("YYYY-MM-DD");

//       const unmarkedStudents = res.data.filter((s) => {
//         // Check if attendance for that date exists
//         const exists = s.attendance?.some((a) => a.date === selectedDate);
//         return !exists; // show only if not marked
//       });

//       setStudents(unmarkedStudents);
//     } catch (error) {
//       console.error(error);
//       message.error("Failed to load students");
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, [classSelected, date]);

//   const handleMark = (studentId, status) => {
//     setAttendance((prev) => ({ ...prev, [studentId]: status }));
//   };

//   const submitAttendance = async () => {
//     if (students.length === 0) {
//       message.info("All students already marked for this date");
//       return;
//     }

//     try {
//       const selectedDate = date.format("YYYY-MM-DD");

//       for (const s of students) {
//         const status = attendance[s._id] || "Absent";

//         await axios.patch(`http://localhost:7000/students/${s._id}`, {
//           attendance: { date: selectedDate, status },
//         });
//       }

//       message.success("Attendance marked successfully!");
//       setAttendance({});
//       fetchStudents(); // refresh to show remaining unmarked
//     } catch (error) {
//       console.error(error);
//       message.error("Error marking attendance");
//     }
//   };

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "studentName",
//       key: "studentName",
//     },
//     {
//       title: "Class",
//       dataIndex: "class",
//       key: "class",
//     },
//     {
//       title: "Mark Attendance",
//       key: "attendance",
//       render: (_, record) => (
//         <Radio.Group
//           value={attendance[record._id] || "Absent"}
//           onChange={(e) => handleMark(record._id, e.target.value)}
//         >
//           <Radio value="Present">Present</Radio>
//           <Radio value="Absent">Absent</Radio>
//         </Radio.Group>
//       ),
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>

//         <div className="flex flex-wrap gap-4 mb-6">
//           <Select
//             value={classSelected}
//             onChange={setClassSelected}
//             options={classes.map((c) => ({
//               value: c,
//               label: c === "All" ? "All Classes" : `Class ${c}`,
//             }))}
//             style={{ minWidth: 150 }}
//           />

//           <DatePicker
//             value={date}
//             onChange={(d) => setDate(d || dayjs())}
//             style={{ minWidth: 150 }}
//           />

//           <Button type="primary" onClick={submitAttendance}>
//             Submit Attendance
//           </Button>
//         </div>

//         <Table
//           dataSource={students}
//           columns={columns}
//           rowKey="_id"
//           pagination={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default MarkAttendance;



import React, { useEffect, useState } from "react";
import { Table, DatePicker, Select, Button, Radio, message } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import Sidebar from "../../GlobalFiles/Sidebar";

const MarkAttendance = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classSelected, setClassSelected] = useState("All");
  const [date, setDate] = useState(dayjs()); // ✅ default date = today
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = ["All", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  /**
   * ✅ Fetch all students (with attendance info)
   */
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:7000/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      message.error("Error fetching students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  /**
   * ✅ Filter students by:
   * 1️⃣ Selected class (or all)
   * 2️⃣ Attendance not yet marked for the selected date
   */
  useEffect(() => {
    if (students.length === 0) return;

    const selectedDate = date.format("YYYY-MM-DD");
    let list = [...students];

    // Filter by class if not 'All'
    if (classSelected !== "All") {
      list = list.filter((s) => s.class === classSelected);
    }

    // Filter out students whose attendance for selected date already exists
    list = list.filter(
      (s) => !s.attendance?.some((a) => a.date === selectedDate)
    );

    setFilteredStudents(list);
  }, [classSelected, date, students]);

  /**
   * ✅ Handle marking attendance (Present/Absent)
   */
  const handleMark = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  /**
   * ✅ Submit attendance
   * - Append new record for selected date
   * - Do NOT overwrite existing data
   */
  const submitAttendance = async () => {
    const selectedDate = date.format("YYYY-MM-DD");

    if (filteredStudents.length === 0) {
      message.info("No unmarked students for this date.");
      return;
    }

    try {
      for (const s of filteredStudents) {
        const status = attendance[s._id] || "Absent";

        // ✅ Append attendance record, not overwrite
        const updatedAttendance = [
          ...(s.attendance || []),
          { date: selectedDate, status },
        ];

        await axios.patch(`http://localhost:7000/students/${s._id}`, {
          attendance: updatedAttendance,
        });
      }

      message.success("Attendance marked successfully!");
      setAttendance({});
      fetchStudents(); // Refresh to hide marked students
    } catch (err) {
      console.error(err);
      message.error("Error submitting attendance");
    }
  };

  /**
   * ✅ Table columns
   */
  const columns = [
    { title: "Name", dataIndex: "studentName", key: "name" },
    { title: "Class", dataIndex: "class", key: "class" },
    {
      title: "Mark Attendance",
      key: "attendance",
      render: (_, record) => (
        <Radio.Group
          onChange={(e) => handleMark(record._id, e.target.value)}
          value={attendance[record._id] || "Absent"}
        >
          <Radio value="Present">Present</Radio>
          <Radio value="Absent">Absent</Radio>
        </Radio.Group>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mark Attendance</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <Select
            value={classSelected}
            onChange={setClassSelected}
            options={classes.map((c) => ({
              value: c,
              label: c === "All" ? "All Classes" : `Class ${c}`,
            }))}
            style={{ minWidth: 150 }}
          />

          <DatePicker
            value={date}
            onChange={(d) => setDate(d || dayjs())}
            style={{ minWidth: 160 }}
          />

          <Button
            type="primary"
            className="bg-blue-600"
            onClick={submitAttendance}
          >
            Submit Attendance
          </Button>
        </div>

        <Table
          dataSource={filteredStudents}
          columns={columns}
          rowKey="_id"
          pagination={false}
          loading={loading}
          locale={{
            emptyText:
              "All students are marked for this date .",
          }}
        />
      </div>
    </div>
  );
};

export default MarkAttendance;
