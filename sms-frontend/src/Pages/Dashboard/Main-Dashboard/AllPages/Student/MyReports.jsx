
// const MyReports = () => {
//     return <div>MyReports Page</div>;
//   };
//   export default MyReports;
  
import React, { useEffect, useState } from "react";
import Sidebar from "../../GlobalFiles/Sidebar";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyReports = () => {
  const [student, setStudent] = useState({
    name: "Rohith Kumar",
    roll: "23A101",
    class: "10-A",
  });

  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Dummy data for now — replace with your backend API later
    const sampleReports = [
      { subject: "Mathematics", marks: 92, grade: "A+" },
      { subject: "Science", marks: 88, grade: "A" },
      { subject: "English", marks: 81, grade: "B+" },
      { subject: "Social Studies", marks: 75, grade: "B" },
      { subject: "Computer Science", marks: 95, grade: "A+" },
    ];
    setReports(sampleReports);
  }, []);

  const totalMarks = reports.reduce((sum, r) => sum + r.marks, 0);
  const average = (reports.length > 0 ? totalMarks / reports.length : 0).toFixed(2);
  const cgpa = (average / 9.5).toFixed(2);

  // Function to generate downloadable PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Report Card", 70, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${student.name}`, 20, 35);
    doc.text(`Roll No: ${student.roll}`, 20, 42);
    doc.text(`Class: ${student.class}`, 20, 49);

    const tableData = reports.map((r) => [r.subject, r.marks, r.grade]);
    doc.autoTable({
      startY: 60,
      head: [["Subject", "Marks", "Grade"]],
      body: tableData,
    });

    doc.text(`Average Marks: ${average}`, 20, doc.lastAutoTable.finalY + 10);
    doc.text(`CGPA: ${cgpa}`, 20, doc.lastAutoTable.finalY + 17);

    doc.save(`${student.name}_ReportCard.pdf`);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h1 className="text-3xl font-semibold text-gray-700 mb-2">My Reports</h1>
          <p className="text-gray-500 mb-6">
            Hello <span className="font-medium">{student.name}</span>, here’s your academic performance summary.
          </p>

          {/* Student Info */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">Roll No</p>
              <p className="text-lg font-medium text-gray-700">{student.roll}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">Class</p>
              <p className="text-lg font-medium text-gray-700">{student.class}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">CGPA</p>
              <p className="text-lg font-semibold text-green-600">{cgpa}</p>
            </div>
          </div>

          {/* Report Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-3 px-4 border-b">Subject</th>
                  <th className="py-3 px-4 border-b">Marks</th>
                  <th className="py-3 px-4 border-b">Grade</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{report.subject}</td>
                    <td className="py-2 px-4 border-b text-center">{report.marks}</td>
                    <td className="py-2 px-4 border-b text-center font-medium">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          report.grade === "A+" || report.grade === "A"
                            ? "bg-green-100 text-green-600"
                            : report.grade === "B" || report.grade === "B+"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {report.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-8 flex justify-between text-gray-600 text-sm">
            <p>Total Marks: {totalMarks}</p>
            <p>Average: {average}%</p>
            <p>CGPA: {cgpa}</p>
          </div>

          {/* Download Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all font-semibold"
            >
              Download Report Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReports;

