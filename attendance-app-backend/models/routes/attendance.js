// routes/attendance.js
const express = require("express");
const multer = require("multer");
const Attendance = require("../models/Attendance");
const router = express.Router();

// Multer Setup for Selfie Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Mark Attendance
router.post("/mark", upload.single("selfie"), async (req, res) => {
  const { studentId } = req.body;
  const selfie = req.file.path;

  try {
    const attendance = new Attendance({ studentId, selfie, timestamp: new Date() });
    await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
