const mongoose = require("mongoose");

const ServiceSummarySchema = new mongoose.Schema({
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
  workDone: String,
  nextServiceAdvice: String,
  preventionTips: String
}, { timestamps: true });

module.exports = mongoose.model("ServiceSummary", ServiceSummarySchema);
