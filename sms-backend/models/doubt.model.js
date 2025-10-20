const mongoose = require("mongoose");

const doubtSchema = mongoose.Schema({
  class: {
    type: String,
  },

  studentID: {
    type: String
  },


  subject: {
    type: String,
  },


  teacher: {
    type: String,
  },

  details: {
    type: String,
  },

  image: {
    type: String,
  },

  answer: {
    type: String,
  },
  
  status: {
    type: String,
    enum: ["Pending", "Answered"],
    default: "Pending",
  },

  date: {
    type: Date,
  },
});

const DoubtModel = mongoose.model("doubt", doubtSchema);

module.exports = { DoubtModel };
