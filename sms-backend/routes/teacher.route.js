


const express = require("express");
const { TeacherModel } = require("../models/teacher.model");
const { StudentModel } = require("../models/student.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");



const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

// GET all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await TeacherModel.find();
    res.status(200).send(teachers);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

// GET total teacher count (for auto ID generation)
router.get("/count", async (req, res) => {
  try {
    const count = await TeacherModel.countDocuments();
    res.status(200).send({ count });
  } catch (err) {
    res.status(500).send({ message: "Error fetching teacher count" });
  }
});

// GET teacher by teacherID
router.get("/:teacherID", async (req, res) => {
  try {
    const teacher = await TeacherModel.findOne({ teacherID: req.params.teacherID });
    if (!teacher) return res.status(404).send({ message: "Teacher not found" });
    res.status(200).send(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching teacher" });
  }
});

// POST /register - add teacher
router.post("/register", async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await TeacherModel.findOne({ email });
    if (exists) return res.send({ message: "Teacher already exists" });

    // Auto-generate teacherID if not provided
    if (!req.body.teacherID) {
      const count = await TeacherModel.countDocuments();
      const id = (count + 1).toString().padStart(3, "0");
      req.body.teacherID = `T${id}`;
    }

    const teacher = new TeacherModel(req.body);
    await teacher.save();
    res.send({ data: teacher, message: "Registered" });
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
});

// POST /login
router.post("/login", async (req, res) => {
  const { teacherID, password } = req.body;
  try {
    const teacher = await TeacherModel.findOne({ teacherID });
    if (!teacher || teacher.password !== password) {
      return res.status(401).send({ message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: teacher._id, userType: teacher.userType }, process.env.key, {
      expiresIn: "24h",
    });

    res.status(200).send({ message: "Successful", user: teacher, token });
  } catch (error) {
    console.error("Error during teacher login:", error);
    res.status(500).send({ message: "Error during login" });
  }
});

// PATCH - update teacher
router.patch("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  const payload = req.body;
  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(id, payload, { new: true });
    if (!updatedTeacher) {
      return res.status(404).send({ message: `Teacher with id ${id} not found` });
    }
    res.status(200).send({ message: "Teacher Updated", user: updatedTeacher });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

// DELETE - remove teacher
router.delete("/:teacherId", async (req, res) => {
  const id = req.params.teacherId;
  try {
    const deletedTeacher = await TeacherModel.findByIdAndDelete(id);
    if (!deletedTeacher) {
      return res.status(404).send({ message: `Teacher with id ${id} not found` });
    }
    res.status(200).send({ message: `Teacher with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});


// ✅ POST - Mark attendance for a student
router.post("/mark-attendance", async (req, res) => {
  const { studentID, date, status } = req.body;

  if (!studentID || !date || !status) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  try {
    const student = await StudentModel.findOne({ studentID });
    if (!student) {
      return res.status(404).send({ message: "Student not found" });
    }

    // Initialize attendances if not present
    if (!student.attendances) student.attendances = [];

    // Check if attendance for this date already exists
    const existing = student.attendances.find((a) => a.date === date);
    if (existing) {
      existing.status = status; // Update status if already exists
    } else {
      student.attendances.push({ date, status }); // Add new entry
    }

    await student.save();
    res.status(200).send({ message: "Attendance marked successfully", student });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).send({ message: "Error marking attendance" });
  }
});

// ✅ GET - Get attendance of a specific student
router.get("/attendance/:studentID", async (req, res) => {
  try {
    const student = await StudentModel.findOne({ studentID: req.params.studentID });
    if (!student) return res.status(404).send({ message: "Student not found" });

    res.status(200).send({ attendances: student.attendances || [] });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching attendance" });
  }
});

router.post("/upload/:teacherId", upload.single("image"), async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const filePath = req.file.path;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "teacher_profiles",
    });

    // Delete local file
    fs.unlinkSync(filePath);

    // Update teacher image in DB
    const teacher = await TeacherModel.findByIdAndUpdate(
      teacherId,
      { image: result.secure_url },
      { new: true }
    );

    if (!teacher) return res.status(404).send({ message: "Teacher not found" });

    res.status(200).send({ message: "Image updated successfully", user: teacher });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send({ message: "Error uploading image" });
  }
});

// GET single teacher by ID (for refetch after image update)
router.get("/:teacherId", async (req, res) => {
  try {
    const teacher = await TeacherModel.findById(req.params.teacherId);
    if (!teacher) return res.status(404).send({ message: "Teacher not found" });
    res.status(200).send({ user: teacher });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching teacher" });
  }
});

module.exports = router;
