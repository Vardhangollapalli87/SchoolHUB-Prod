
const express = require("express");
const { DoubtModel } = require("../models/doubt.model");
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // optional image storage



// router.post("/", async (req, res) => {
//   let query = req.body;
//   try {
//     const doubts = await DoubtModel.find(query);
//     res.status(200).send(doubts);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const doubts = await DoubtModel.find();
    res.status(200).json(doubts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch doubts" });
  }
});


router.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const doubt = new DoubtModel(payload);
    await doubt.save();
    res.send({ message: "doubt successfully created", doubt });
  } catch (error) {
    res.send(error);
  }
});


router.patch("/:doubtId", upload.single("image"), async (req, res) => {
  const { doubtId } = req.params;
  const { answer, status } = req.body;

  let updateData = { answer, status };
  if (req.file) {
    updateData.image = req.file.path;
  }

  try {
    const updatedDoubt = await DoubtModel.findByIdAndUpdate(
      doubtId,
      updateData,
      { new: true }
    );
    if (!updatedDoubt) return res.status(404).send({ error: "Doubt not found" });

    res.send({ message: "Doubt answered successfully", doubt: updatedDoubt });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update doubt" });
  }
});

module.exports = router;
