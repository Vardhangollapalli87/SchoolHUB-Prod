const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", true); // Add this line to suppress the warning

const connection = mongoose.connect(process.env.dbURL);

module.exports = { connection };
