const express = require("express");
const { StudentModel } = require("../models/student.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

/**
 * ✅ Get all students
 */
router.get("/", async (req, res) => {
  try {
    const students = await StudentModel.find().sort({ studentID: 1 });
    students.forEach(student => {
      if (!student.fees || student.fees.length === 0) {
        student.fees = [
          { term: "First Term", status: "Due", paidOn: null },
          { term: "Mid Term", status: "Due", paidOn: null },
          { term: "Last Term", status: "Due", paidOn: null },
        ];
      }
    });
    res.status(200).send(students);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

/**
 * ✅ Register new student with auto-generated ID
 */
router.post("/register", async (req, res) => {
  try {
    const { email, studentName, class: studentClass } = req.body;

    // 1️⃣ Check if student already exists
    const existing = await StudentModel.findOne({ email });
    if (existing) {
      return res.status(400).send({ message: "Student already exists" });
    }

    // 2️⃣ Get the last student by ID (sorted descending)
    const lastStudent = await StudentModel.findOne().sort({ studentID: -1 }).exec();

    let nextId = "S001"; // default for first student
    if (lastStudent && lastStudent.studentID) {
      const lastNum = parseInt(lastStudent.studentID.replace("S", ""), 10);
      nextId = `S${String(lastNum + 1).padStart(3, "0")}`;
    }

    // 3️⃣ Set generated ID and default password
    const newStudent = new StudentModel({
      ...req.body,
      studentID: nextId,
      password: `${nextId}123`,
    });

    await newStudent.save();

    res.status(201).send({ message: "Registered", data: newStudent });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).send({ message: "Server error during registration" });
  }
});

/**
 * ✅ Login route
 */
router.post("/login", async (req, res) => {
  const { studentID, password } = req.body;
  try {
    const student = await StudentModel.findOne({ studentID });
    if (!student) return res.status(401).send({ message: "Wrong credentials" });

    const isPasswordValid = password === student.password;
    if (!isPasswordValid) return res.status(401).send({ message: "Wrong credentials" });

    const token = jwt.sign(
      { id: student._id, userType: student.userType },
      process.env.key,
      { expiresIn: "24h" }
    );

    res.status(200).send({ message: "Successful", user: student, token });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).send({ message: "Error during login" });
  }
});

// GET student by ID
router.get("/id/:studentID", async (req, res) => {
  try {
    // console.log(req.params.studentID);

    const student = await StudentModel.findOne({ studentID: req.params.studentID });
    if (!student) return res.status(404).send({ message: "Student not found" });
    res.status(200).send(student);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching student" });
  }
});


// -------------------- FEES ROUTES --------------------

// Get a student's fees status
router.get("/fees/:studentID", async (req, res) => {
  try {
    const student = await StudentModel.findOne({ studentID: req.params.studentID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    // If fees array doesn't exist, create default
    if (!student.fees || student.fees.length === 0) {
      student.fees = [
        { term: "First Term", status: "Due", paidOn: null },
        { term: "Mid Term", status: "Due", paidOn: null },
        { term: "Last Term", status: "Due", paidOn: null },
      ];
      await student.save();
    }

    res.status(200).json(student.fees);
  } catch (error) {
    console.error("Error fetching fees:", error);
    res.status(500).json({ message: "Server error while fetching fees" });
  }
});

// Update a term's fee status (Admin)
router.patch("/fees/:studentID/term", async (req, res) => {
  const { term, status } = req.body; // status = "Paid" or "Due"
  try {
    const student = await StudentModel.findOne({ studentID: req.params.studentID });
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (!student.fees || student.fees.length === 0) {
      student.fees = [
        { term: "First Term", status: "Due", paidOn: null },
        { term: "Mid Term", status: "Due", paidOn: null },
        { term: "Last Term", status: "Due", paidOn: null },
      ];
    }

    const feeItem = student.fees.find((f) => f.term === term);
    if (!feeItem) return res.status(400).json({ message: `Term ${term} not found` });

    feeItem.status = status;
    feeItem.paidOn = status === "Paid" ? new Date().toISOString().split("T")[0] : null;

    await student.save();
    res.status(200).json({ message: `${term} status updated`, fees: student.fees });
  } catch (error) {
    console.error("Error updating fees:", error);
    res.status(500).json({ message: "Server error while updating fees" });
  }
});



/**
 * ✅ Update student details
 */
router.patch("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  try {
    const student = await StudentModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!student) return res.status(404).send({ message: `Student with id ${id} not found` });

    res.status(200).send({ message: "Student Updated", user: student });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

/**
 * ✅ Delete student
 */
router.delete("/:studentId", async (req, res) => {
  const id = req.params.studentId;
  try {
    const student = await StudentModel.findByIdAndDelete(id);
    if (!student) return res.status(404).send({ msg: `Student with id ${id} not found` });

    res.status(200).send({ message: `Student with id ${id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

/**
 * ✅ Count students (optional)
 */
router.get("/count", async (req, res) => {
  try {
    const count = await StudentModel.countDocuments();
    res.status(200).send({ count });
  } catch (error) {
    res.status(500).send({ message: "Error fetching student count" });
  }
});


/**
 * ✅ Get today's attendance overview (for Admin)
 * Calculates each class's attendance based on students' attendance data.
 */
router.get("/attendance/overview", async (req, res) => {
  try {
    const students = await StudentModel.find();

    const classData = {};
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    students.forEach((student) => {
      const className = student.class || "Unknown"; // assuming `class` field in student

      if (!classData[className]) {
        classData[className] = { total: 0, present: 0, absent: 0 };
      }

      classData[className].total++;

      const todayAttendance = student.attendance?.find((a) => a.date === today);

      if (todayAttendance?.status === "Present") {
        classData[className].present++;
      } else if (todayAttendance?.status === "Absent") {
        classData[className].absent++;
      }
    });

    const overview = Object.keys(classData).map((className) => {
      const { total, present } = classData[className];
      const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
      return {
        className,
        totalStudents: total,
        avgAttendance: Number(percentage),
      };
    });

    res.status(200).json(overview);
  } catch (error) {
    console.error("Error computing attendance overview:", error);
    res.status(500).json({ message: "Server error while generating overview" });
  }
});


module.exports = router;
