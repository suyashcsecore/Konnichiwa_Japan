const mongoose = require("mongoose");

const medicalReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      default: "Medical Report"
    },

    date: {
      type: String,
      default: ""
    },

    hospital: {
      type: String,
      default: ""
    },

    doctor: {
      type: String,
      default: ""
    },

    diagnosis: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    },

    originalFileName: {
      type: String,
      default: ""
    },

    extractedText: {
      type: String,
      default: ""
    },

    englishSummary: {
      type: String,
      default: ""
    },

    japaneseSummary: {
      type: String,
      default: ""
    },

    latexContent: {
      type: String,
      default: ""
    },

    generatedPdf: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MedicalReport", medicalReportSchema);