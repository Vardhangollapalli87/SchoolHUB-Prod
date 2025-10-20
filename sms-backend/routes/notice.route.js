// const express = require("express");
// const { NoticeModel } = require("../models/notice.model");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   let query = req.query;
//   try {
//     const notices = await NoticeModel.find(query);
//     res.status(200).send(notices);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong" });
//   }
// });

// router.post("/create", async (req, res) => {
//   const payload = req.body;
//   try {
//     const notice = new NoticeModel(payload);
//     await notice.save();
//     res.send({ message: "Notice successfully created", notice });
//   } catch (error) {
//     res.send(error);
//   }
// });



// router.delete("/:noticeId", async (req, res) => {
//   const id = req.params.noticeId;
//   try {
//     const notice = await NoticeModel.findByIdAndDelete({ _id: id });
//     if (!notice) {
//       res.status(404).send({ msg: `Notice with id ${id} not found` });
//     }
//     res.status(200).send(`Notice with id ${id} deleted`);
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ error: "Something went wrong, unable to Delete." });
//   }
// });

// module.exports = router;


const express = require("express");
const { NoticeModel } = require("../models/notice.model");

const router = express.Router();

// 📌 Get all notices (with optional query filters)
router.get("/", async (req, res) => {
  try {
    const notices = await NoticeModel.find(req.query).sort({ date: -1 }); // ✅ newest first
    res.status(200).json(notices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// 📌 Create a new notice
router.post("/create", async (req, res) => {
  try {
    const notice = new NoticeModel(req.body);
    await notice.save();
    res.status(201).json({ message: "Notice successfully created", notice });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to create notice" });
  }
});

// 📌 Delete a notice by ID
router.delete("/:noticeId", async (req, res) => {
  const { noticeId } = req.params;
  try {
    const notice = await NoticeModel.findByIdAndDelete(noticeId);
    if (!notice) {
      return res.status(404).json({ msg: `Notice with id ${noticeId} not found` });
    }
    res.status(200).json({ message: `Notice with id ${noticeId} deleted` });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong, unable to delete." });
  }
});

module.exports = router;
