const express = require("express");
const killPort = require("kill-port");
const { connection } = require("./Config/db"); // <-- connection is a Promise
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
// const helmet = require("helmet");
const axios = require("axios");


// Routers
const adminRouter = require("./routes/admin.route");
const teacherRouter = require("./routes/teacher.route");
const studentRouter = require("./routes/student.route");
const reportRouter = require("./routes/reports.route");
const doubtRouter = require("./routes/doubt.route");
const noticeRouter = require("./routes/notice.route");
const schoolRouter = require("./routes/school.route");
const galleryRoutes = require( "./routes/gallery.route");

const app = express();
const PORT = process.env.port || 7000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json());
app.use(cors());
// app.use(helmet());

// Health Check
app.get("/", (req, res) => {
  res.send("Homepage");
});

// Routes
app.use("/admin", adminRouter);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/reports", reportRouter);
app.use("/doubts", doubtRouter);
app.use("/notices", noticeRouter);
app.use("/schools", schoolRouter);
app.use("/gallery", galleryRoutes);

app.post("/verify-email", async (req, res) => {
  const { email } = req.body;

  const result = await verifyEmail(email);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  }
});

async function verifyEmail(email) {
  try {
    const API_KEY = "0910deb8c1cd4e03b25fc8c10de06ed8";  // 🔑 Replace with your key
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`;

    const response = await axios.get(url);
    const data = response.data;

    // Debug: see full response
    // console.log("📩 Email Check Result:", data);

    // ✅ AbstractAPI returns multiple fields, key ones:
    if (
      data.is_valid_format.value &&   // Proper email format
      data.deliverability === "DELIVERABLE" && // Deliverable via SMTP
      data.is_mx_found.value          // MX record exists
    ) {
      return { success: true, message: "Valid email address." };
    } else {
      return { success: false, message: "Invalid or undeliverable email." };
    }

  } catch (error) {
    console.error("❌ Email verification error:", error.message);
    return { success: false, message: "Error checking email validity." };
  }
}


// ✅ Function to create default Admin
// const createDefaultAdmin = async () => {
//   try {
//     const existingAdmin = await AdminModel.findOne({ adminID: 4 });
//     if (!existingAdmin) {
//       const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "vardhan1234", 10);
//       const newAdmin = new AdminModel({
//         adminID: 4,
//         adminName: "Vardhan Gollapalli",
//         email: process.env.ADMIN_EMAIL || "vardhangollapalli@gmail.com",
//         password: hashedPassword,
//         gender: "Male",
//         age: 20,
//         mobile: 1234567890,
//         DOB: "1995-01-01",
//         address: "Admin Address",
//         education: "Master's Degree",
//       });
//       await newAdmin.save();
//       console.log("✅ Default admin created successfully!");
//     } else {
//       console.log("ℹ️ Default admin already exists.");
//     }
//   } catch (error) {
//     console.error("❌ Error creating default admin:", error);
//   }
// };

// // ✅ Function to create default Student & Teacher
// const createDefaultUsers = async () => {
//   try {
//     // Student
//     const existingStudent = await StudentModel.findOne({ studentID: 1 });
//     if (!existingStudent) {
//       const hashedPassword = await bcrypt.hash(process.env.STUDENT_PASSWORD || "student123", 10);
//       const newStudent = new StudentModel({
//         studentID: 1,
//         studentName: "Default Student",
//         mobile: 1234567890,
//         email: process.env.STUDENT_EMAIL || "student@example.com",
//         password: hashedPassword,
//         age: 18,
//         gender: "Male",
//         DOB: "2005-01-01",
//         address: "Student Address",
//         class: "10th Grade",
//         details: "Default student details",
//       });
//       await newStudent.save();
//       console.log("✅ Default student created successfully!");
//     } else {
//       console.log("ℹ️ Default student already exists.");
//     }

//     // Teacher
//     const existingTeacher = await TeacherModel.findOne({ teacherID: 1 });
//     if (!existingTeacher) {
//       const hashedPassword = await bcrypt.hash(process.env.TEACHER_PASSWORD || "teacher123", 10);
//       const newTeacher = new TeacherModel({
//         teacherID: 1,
//         teacherName: "Default Teacher",
//         mobile: 9876543210,
//         email: process.env.TEACHER_EMAIL || "teacher@example.com",
//         password: hashedPassword,
//         age: 30,
//         gender: "Female",
//         DOB: "1993-01-01",
//         address: "Teacher Address",
//         education: "Master's Degree",
//         details: "Default teacher details",
//       });
//       await newTeacher.save();
//       console.log("✅ Default teacher created successfully!");
//     } else {
//       console.log("ℹ️ Default teacher already exists.");
//     }
//   } catch (error) {
//     console.error("❌ Error creating default users:", error);
//   }
// };

// // ✅ Start server only after DB connection
// connection
//   .then(async () => {
//     console.log("✅ Database connected successfully!");

//     // Create default users after DB is ready
//     await createDefaultAdmin();
//     await createDefaultUsers();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err);
//   });

// // Global Error Handler
// app.use((err, req, res, next) => {
//   console.error("Unexpected error:", err);
//   res.status(500).json({ message: "Something went wrong!" });
// });

connection
  .then(async () => {
    console.log("✅ Database connected successfully!");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
