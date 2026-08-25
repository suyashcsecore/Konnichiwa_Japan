const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  uploadMedicalReport,
  getMedicalHistory,
  getMedicalReport,
  viewMedicalReport,
  deleteMedicalReport
} = require("../controllers/medicalHistoryController");
const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});

router.post(
  "/medical-history/upload",
  upload.single("medicalReport"),
  uploadMedicalReport
);

router.get(
  "/medical-history/:clerkId",
  getMedicalHistory
);

router.get(
  "/medical-history/report/:id",
  getMedicalReport
);

router.get(
  "/medical-history/report/:id/pdf",
  viewMedicalReport
);

router.delete(
  "/medical-history/:id",
  deleteMedicalReport
);

module.exports = router;