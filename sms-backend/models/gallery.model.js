const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    cloudinary_id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);

