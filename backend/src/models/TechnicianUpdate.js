const mongoose = require("mongoose");

const TechnicianUpdateSchema = new mongoose.Schema({
  jobCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobCard",
    required: true
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  statusMessage: String,
  criticalIssue: {
    type: Boolean,
    default: false
  },
  issueDescription: String
}, { timestamps: true });

module.exports = mongoose.model("TechnicianUpdate", TechnicianUpdateSchema);
