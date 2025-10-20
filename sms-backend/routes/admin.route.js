const express = require("express");
const { AdminModel } = require("../models/admin.model")
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { StudentModel } = require("../models/student.model");
const { TeacherModel } = require("../models/teacher.model");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).send(admins);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong" });
  }
});

router.post("/register", async (req, res) => {
  const { email} = req.body;
  try {
    const admin = await AdminModel.findOne({ email });
    if (admin) {
      return res.send({ message: "Admin already exists" });
    }

    // Hash password before saving
    // const hashedPassword = await bcrypt.hash(password, 8);
    let value = new AdminModel({ ...req.body});
    await value.save();

    const data = await AdminModel.findOne({ email });
    return res.send({ data, message: "Registered",success:true });  
  } catch (error) {
    console.log(error);
    res.send({ message: "error" });
  }
});

router.post("/login", async (req, res) => {
  const { adminID, password } = req.body;
  try {
    // Find the admin by adminID
    const admin = await AdminModel.findOne({ adminID });
    if (!admin) {
      return res.send({ message: "Wrong credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = (password === admin.password) ? true : false;
    if (!isPasswordValid) {
      return res.send({ message: "Wrong credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ foo: "bar" }, process.env.key, {
      expiresIn: "24h",
    });

    res.send({ message: "Successful", user: admin, token: token });
  } catch (error) {
    console.log({ message: "Error" });
    console.log(error);
    res.status(500).send({ message: "Error" });
  }
});

router.patch("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  const payload = req.body;
  try {
    const admin = await AdminModel.findByIdAndUpdate({ _id: id }, payload);
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} updated`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Update." });
  }
});

router.delete("/:adminId", async (req, res) => {
  const id = req.params.adminId;
  try {
    const admin = await AdminModel.findByIdAndDelete({ _id: id });
    if (!admin) {
      res.status(404).send({ msg: `Admin with id ${id} not found` });
    }
    res.status(200).send(`Admin with id ${id} deleted`);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Something went wrong, unable to Delete." });
  }
});

router.post("/password", (req, res) => {
  const { email, userId, password } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_GMAIL,
      pass: process.env.SENDER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "vardhangollapalli@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User Id : ${userId} and  Password : ${password} .\n IF YOU ARE NOT THE ONE WHO RESPONSIBLE FOR THIS, PLEASE IGNORE.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Email failed:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to send email. Please check the email address.",
        error
      });
    }
  
    console.log("✅ Email sent:", info.response);
    return res.status(200).json({
      success: true,
      message: "Password  & email sent successfully!"
    });
  });
});

router.post("/forgot", async (req, res) => {
  const { email, type } = req.body;
  let user, userId, password;

  if (type === "student") {
    user = await StudentModel.findOne({ email });
    userId = user?.studentID;
    password = user?.password;
  } else if (type === "admin") {
    user = await AdminModel.findOne({ email });
    userId = user?.adminID;
    password = user?.password;
  } else if (type === "teacher") {
    user = await TeacherModel.findOne({ email });
    userId = user?.teacherID;
    password = user?.password;
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found with this email",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_GMAIL,
      pass: process.env.SENDER_GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "vardhangollapalli@gmail.com",
    to: email,
    subject: "Account ID and Password",
    text: `This is your User ID: ${userId} and Password: ${password}.\n\nIF YOU DID NOT REQUEST THIS, PLEASE IGNORE.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Email failed:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to send email. Please check the email address.",
        error,
      });
    }

    console.log("Email sent:", info.response);
    return res.status(200).json({
      success: true,
      message: "Password & email sent successfully!",
    });
  });
});


module.exports = router;
