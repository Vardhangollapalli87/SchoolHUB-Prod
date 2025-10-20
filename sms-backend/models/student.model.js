const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  userType: {
    type: String,
    default: "student",
  },

  studentID: {
    type: String,
    required: true,
    unique: true,
  },

  studentName: {
    type: String,
  },

  mobile: {
    type: Number,
    minlength: 10,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
  },

  gender: {
    type: String,
  },
  
  DOB: {
    type: String,
  },

  address: {
    type: String,
  },

  class: {
    type: String,
  },

  image: {
    type: String,
    default:
      "https://res.cloudinary.com/diverse/image/upload/v1674562453/diverse/oipm1ecb1yudf9eln7az.jpg",
  },

  details: {
    type: String,
  },
  
  attendance: [
    {
      date: { type: String },
      status: { type: String, enum: ["Present", "Absent"] },
    },
  ],

  fees: [
    {
      term: { type: String }, // e.g., First Term, Mid Term, Last Term
      status: { type: String, enum: ["Paid", "Due"], default: "Due" },
      paidOn: { type: String, default: null },
    },
  ],
  
});

const StudentModel = mongoose.model("student", studentSchema);

module.exports = { StudentModel };
