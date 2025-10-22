// const express = require("express");
// const killPort = require("kill-port");
// const { connection } = require("./Config/db"); // <-- connection is a Promise
// require("dotenv").config();
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// // const helmet = require("helmet");
// const axios = require("axios");


// // Routers
// const adminRouter = require("./routes/admin.route");
// const teacherRouter = require("./routes/teacher.route");
// const studentRouter = require("./routes/student.route");
// const reportRouter = require("./routes/reports.route");
// const doubtRouter = require("./routes/doubt.route");
// const noticeRouter = require("./routes/notice.route");
// const schoolRouter = require("./routes/school.route");
// const galleryRoutes = require( "./routes/gallery.route");

// const app = express();
// const PORT = process.env.port || 7000;

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
// // app.use(express.json());
// app.use(cors());
// // app.use(helmet());

// // Health Check
// app.get("/", (req, res) => {
//   res.send("Homepage");
// });

// // Routes
// app.use("/admin", adminRouter);
// app.use("/teachers", teacherRouter);
// app.use("/students", studentRouter);
// app.use("/reports", reportRouter);
// app.use("/doubts", doubtRouter);
// app.use("/notices", noticeRouter);
// app.use("/schools", schoolRouter);
// app.use("/gallery", galleryRoutes);

// app.post("/verify-email", async (req, res) => {
//   const { email } = req.body;

//   const result = await verifyEmail(email);
//   if (result.success) {
//     res.status(200).json(result);
//   } else {
//     res.status(400).json(result);
//   }
// });

// async function verifyEmail(email) {
//   try {
//     const API_KEY = "0910deb8c1cd4e03b25fc8c10de06ed8";  // 🔑 Replace with your key
//     const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`;

//     const response = await axios.get(url);
//     const data = response.data;

//     // Debug: see full response
//     // console.log("📩 Email Check Result:", data);

//     // ✅ AbstractAPI returns multiple fields, key ones:
//     if (
//       data.is_valid_format.value &&   // Proper email format
//       data.deliverability === "DELIVERABLE" && // Deliverable via SMTP
//       data.is_mx_found.value          // MX record exists
//     ) {
//       return { success: true, message: "Valid email address." };
//     } else {
//       return { success: false, message: "Invalid or undeliverable email." };
//     }

//   } catch (error) {
//     console.error("❌ Email verification error:", error.message);
//     return { success: false, message: "Error checking email validity." };
//   }
// }


// connection
//   .then(async () => {
//     console.log("✅ Database connected successfully!");
//   })
//   .catch((err) => {
//     console.error("❌ Database connection failed:", err);
//   });

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const path = require("path");
const { connection } = require("./Config/db"); // your MongoDB connection Promise
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");

// Routers
const adminRouter = require("./routes/admin.route");
const teacherRouter = require("./routes/teacher.route");
const studentRouter = require("./routes/student.route");
const reportRouter = require("./routes/reports.route");
const doubtRouter = require("./routes/doubt.route");
const noticeRouter = require("./routes/notice.route");
const schoolRouter = require("./routes/school.route");
const galleryRoutes = require("./routes/gallery.route");

const app = express();
const PORT = process.env.PORT || 7000;

// ------------------ Middleware ------------------
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

// ------------------ API Routes ------------------
app.use("/admin", adminRouter);
app.use("/teachers", teacherRouter);
app.use("/students", studentRouter);
app.use("/reports", reportRouter);
app.use("/doubts", doubtRouter);
app.use("/notices", noticeRouter);
app.use("/schools", schoolRouter);
app.use("/gallery", galleryRoutes);

// ------------------ Email Verification ------------------
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
    const API_KEY = process.env.ABSTRACT_API_KEY; // put your key in .env
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`;

    const response = await axios.get(url);
    const data = response.data;

    if (
      data.is_valid_format.value &&
      data.deliverability === "DELIVERABLE" &&
      data.is_mx_found.value
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

// ------------------ Serve React Frontend ------------------
if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../sms-frontend/build");
  app.use(express.static(frontendBuildPath));

  // For SPA routing — send index.html for all other requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

// ------------------ Database Connection ------------------
connection
  .then(() => {
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

// ------------------ Global Error Handler ------------------
app.use((err, req, res, next) => {
  console.error("Unexpected error:", err);
  res.status(500).json({ message: "Something went wrong!" });
});
