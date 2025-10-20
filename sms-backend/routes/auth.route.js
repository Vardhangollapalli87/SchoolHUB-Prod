import express from "express";
import AdminModel from "../models/AdminModel.js";
import StudentModel from "../models/StudentModel.js";
import TeacherModel from "../models/TeacherModel.js";
import nodemailer from "nodemailer";

const router = express.Router();

const models = {
  student: StudentModel,
  teacher: TeacherModel,
  admin: AdminModel,
};

// ✅ Forget Password (send mail with reset link)
router.post("/forget-password", async (req, res) => {
  const { type, email } = req.body;

  try {
    const Model = models[type];
    if (!Model) return res.send({ message: "Invalid user type" });

    const user = await Model.findOne({ email });
    if (!user) return res.send({ message: "User not found" });

    // Create reset link (for simplicity use user ID)
    const resetLink = `http://localhost:3000/reset-password/${type}/${user._id}`;

    // Setup mail transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_email@gmail.com",
        pass: "your_email_password", // use App Password for Gmail
      },
    });

    // Send mail
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h3>Hello ${user.adminName || user.teacherName || user.studentName}</h3>
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
      `,
    });

    return res.send({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.send({ message: "Error sending email" });
  }
});

// ✅ Reset Password API
router.post("/reset-password/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const { password } = req.body;

  try {
    const Model = models[type];
    if (!Model) return res.send({ message: "Invalid user type" });

    const user = await Model.findByIdAndUpdate(
      id,
      { password },
      { new: true }
    );

    if (!user) return res.send({ message: "User not found" });

    return res.send({ message: "Password updated successfully" });
  } catch (error) {
    res.send({ message: "Error resetting password" });
  }
});

export default router;
