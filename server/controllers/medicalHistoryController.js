const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");

const User = require("../models/User");
const MedicalReport = require("../models/MedicalReport");

const { generateMedicalSummary } = require("../services/healthAIService");
const { generateLatex } = require("../services/latexService");

async function uploadMedicalReport(req, res) {
  let uploadedFilePath = null;
  let parser = null;

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF medical report"
      });
    }

    uploadedFilePath = req.file.path;

    const {
      clerkId,
      title,
      date,
      hospital,
      doctor,
      diagnosis,
      notes
    } = req.body;

    if (!clerkId) {
      return res.status(400).json({
        message: "clerkId is required"
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const pdfBuffer = fs.readFileSync(uploadedFilePath);

    parser = new PDFParse({
      data: pdfBuffer
    });

    const pdfData = await parser.getText();

    const extractedText = (pdfData.text || "").trim();

    await parser.destroy();
    parser = null;

    if (!extractedText) {
      return res.status(400).json({
        message:
          "No readable text was found in the PDF. This may be a scanned PDF."
      });
    }

    const aiResponse = await generateMedicalSummary(extractedText);

    let englishSummary = "";
    let japaneseSummary = "";

    let extractedTitle = title || "";
    let extractedDate = date || "";
    let extractedHospital = hospital || "";
    let extractedDoctor = doctor || "";
    let extractedDiagnosis = diagnosis || "";
    let extractedNotes = notes || "";

    const titleMatch = aiResponse.match(
      /TITLE:\s*(.*)/i
    );

    const dateMatch = aiResponse.match(
      /DATE:\s*(.*)/i
    );

    const hospitalMatch = aiResponse.match(
      /HOSPITAL:\s*(.*)/i
    );

    const doctorMatch = aiResponse.match(
      /DOCTOR:\s*(.*)/i
    );

    const diagnosisMatch = aiResponse.match(
      /DIAGNOSIS:\s*(.*)/i
    );

    const notesMatch = aiResponse.match(
      /NOTES:\s*([\s\S]*?)(?=ENGLISH SUMMARY:|$)/i
    );

    const englishMatch = aiResponse.match(
      /ENGLISH SUMMARY:\s*([\s\S]*?)(?=JAPANESE SUMMARY:|$)/i
    );

    const japaneseMatch = aiResponse.match(
      /JAPANESE SUMMARY:\s*([\s\S]*)/i
    );

    if (!extractedTitle && titleMatch) {
      extractedTitle = titleMatch[1].trim();
    }

    if (!extractedDate && dateMatch) {
      extractedDate = dateMatch[1].trim();
    }

    if (!extractedHospital && hospitalMatch) {
      extractedHospital = hospitalMatch[1].trim();
    }

    if (!extractedDoctor && doctorMatch) {
      extractedDoctor = doctorMatch[1].trim();
    }

    if (!extractedDiagnosis && diagnosisMatch) {
      extractedDiagnosis = diagnosisMatch[1].trim();
    }

    if (!extractedNotes && notesMatch) {
      extractedNotes = notesMatch[1].trim();
    }

    if (englishMatch) {
      englishSummary = englishMatch[1].trim();
    }

    if (japaneseMatch) {
      japaneseSummary = japaneseMatch[1].trim();
    }

    const savedFileName = path.basename(uploadedFilePath);

    const reportData = {
      userId: user._id,
      title: extractedTitle || "Medical Report",
      date: extractedDate,
      hospital: extractedHospital,
      doctor: extractedDoctor,
      diagnosis: extractedDiagnosis,
      notes: extractedNotes,
      originalFileName: req.file.originalname,
      extractedText,
      englishSummary,
      japaneseSummary,
      generatedPdf: savedFileName
    };

    const latexContent = generateLatex(reportData);

    reportData.latexContent = latexContent;

    const medicalReport = await MedicalReport.create(reportData);

    uploadedFilePath = null;

    return res.status(201).json({
      message: "Medical report uploaded and processed successfully",
      report: medicalReport
    });

  } catch (error) {
    console.error("Medical report processing error:", error);

    if (parser) {
      try {
        await parser.destroy();
      } catch (destroyError) {
        console.error("PDF parser cleanup error:", destroyError);
      }
    }

    return res.status(500).json({
      message: "Failed to process medical report",
      error: error.message
    });

  } finally {
    if (
      uploadedFilePath &&
      fs.existsSync(uploadedFilePath)
    ) {
      try {
        fs.unlinkSync(uploadedFilePath);
      } catch (fileError) {
        console.error("Uploaded file cleanup error:", fileError);
      }
    }
  }
}

async function getMedicalHistory(req, res) {
  try {
    const { clerkId } = req.params;

    if (!clerkId) {
      return res.status(400).json({
        message: "clerkId is required"
      });
    }

    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const reports = await MedicalReport.find({
      userId: user._id
    }).sort({
      createdAt: -1
    });

    return res.status(200).json({
      reports
    });

  } catch (error) {
    console.error("Get medical history error:", error);

    return res.status(500).json({
      message: "Failed to retrieve medical history",
      error: error.message
    });
  }
}

async function getMedicalReport(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Report ID is required"
      });
    }

    const report = await MedicalReport.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Medical report not found"
      });
    }

    return res.status(200).json({
      report
    });

  } catch (error) {
    console.error("Get medical report error:", error);

    return res.status(500).json({
      message: "Failed to retrieve medical report",
      error: error.message
    });
  }
}

async function viewMedicalReport(req, res) {
  try {
    const { id } = req.params;

    const report = await MedicalReport.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Medical report not found"
      });
    }

    if (!report.generatedPdf) {
      return res.status(404).json({
        message: "Original PDF is not available for this report"
      });
    }

    const filePath = path.join(
      __dirname,
      "../uploads",
      report.generatedPdf
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "Original PDF file not found on server"
      });
    }

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${report.originalFileName || "medical-report.pdf"}"`
    );

    return res.sendFile(
      path.resolve(filePath)
    );

  } catch (error) {
    console.error("View medical report error:", error);

    return res.status(500).json({
      message: "Failed to open medical report",
      error: error.message
    });
  }
}
async function deleteMedicalReport(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Report ID is required"
      });
    }

    const report = await MedicalReport.findById(id);

    if (!report) {
      return res.status(404).json({
        message: "Medical report not found"
      });
    }

    if (report.generatedPdf) {
      const filePath = path.join(
        __dirname,
        "../uploads",
        report.generatedPdf
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await MedicalReport.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Medical report deleted successfully"
    });

  } catch (error) {
    console.error("Delete medical report error:", error);

    return res.status(500).json({
      message: "Failed to delete medical report",
      error: error.message
    });
  }
}
module.exports = {
  uploadMedicalReport,
  getMedicalHistory,
  getMedicalReport,
  viewMedicalReport,
  deleteMedicalReport
};