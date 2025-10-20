const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const Gallery = require("../models/gallery.model");
require("dotenv").config();

const router = express.Router();

// ✅ Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer (store file in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📌 Upload one photo
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.file) return res.status(400).json({ error: "No file selected" });
    if (!title) return res.status(400).json({ error: "Title is required" });

    // Upload to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      { folder: "school_gallery" },
      async (error, result) => {
        if (error) return res.status(500).json({ error: error.message || error });

        try {
          // Save to MongoDB with title & description
          const newImage = new Gallery({
            url: result.secure_url,
            cloudinary_id: result.public_id, // save public_id for deletion
            title,
            description: description || "",
          });

          const savedImage = await newImage.save();
          res.json(savedImage);
        } catch (mongoErr) {
          res.status(500).json({ error: mongoErr.message || mongoErr });
        }
      }
    );

    // Send the file buffer to Cloudinary
    stream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// 📌 Get all photos
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// 📌 Delete a photo
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Gallery.findById(id);
    if (!image) return res.status(404).json({ error: "Image not found" });

    // Delete from Cloudinary
    if (image.cloudinary_id) {
      await cloudinary.uploader.destroy(image.cloudinary_id);
    }

    // Delete from MongoDB
    await Gallery.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to delete image" });
  }
});

module.exports = router;
