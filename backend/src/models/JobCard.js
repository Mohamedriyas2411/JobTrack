const mongoose = require("mongoose");

const JobCardSchema = new mongoose.Schema({
  jobCardNumber: String,
  vehicleType: { type: String, enum: ["2W", "4W"] },
  vehicleNumber: String,
  customerName: String,
  customerPhone: String,
  reportedIssues: String,
  status: {
    type: String,
    enum: ["CREATED", "IN_PROGRESS", "DONE", "BILLED"],
    default: "CREATED"
  },
  serviceAdvisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  technicianId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("JobCard", JobCardSchema);
