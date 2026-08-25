const mongoose = require("mongoose");

const healthProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      default: ""
    },

    dateOfBirth: {
      type: String,
      default: ""
    },

    bloodGroup: {
      type: String,
      default: ""
    },

    allergies: {
      type: [String],
      default: []
    },

    conditions: {
      type: [String],
      default: []
    },

    medications: {
      type: [
        {
          name: String,
          dosage: String,
          frequency: String
        }
      ],
      default: []
    },

    surgeries: {
      type: [
        {
          name: String,
          year: String
        }
      ],
      default: []
    },

    emergencyContact: {
      name: {
        type: String,
        default: ""
      },
      phone: {
        type: String,
        default: ""
      },
      relationship: {
        type: String,
        default: ""
      }
    },

    insurance: {
      provider: {
        type: String,
        default: ""
      },
      policyNumber: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("HealthProfile", healthProfileSchema);