const JobCard = require("../models/JobCard");
const User = require("../models/User");
const Bill = require("../models/Bill");

// Get all technicians
exports.getAllTechnicians = async (req, res) => {
  try {
    const technicians = await User.find({ role: "technician" }).select("name email");
    res.json(technicians);
    res.status(500).json({ message: "Failed to fetch technicians", error: error.message });
  }
};

// Get all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate({
        path: "jobCardId",
        populate: { path: "serviceAdvisorId technicianId", select: "name" }
      .sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error("Error fetching bills:", error);
    res.status(500).json({ message: "Failed to fetch bills", error: error.message });
  }
};

// Kanban view (group by status)
exports.getKanbanView = async (req, res) => {
  try {
    const jobCards = await JobCard.find()
      .populate("serviceAdvisorId", "name")
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });

    const kanban = {
      IN_PROGRESS: [],
      DONE: [],
      BILLED: []
    };

    jobCards.forEach(job => {
      kanban[job.status].push(job);
    });

    res.json(kanban);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch kanban data", error: error.message });
  }
};

// Dashboard summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const total = await JobCard.countDocuments();
    const created = await JobCard.countDocuments({ status: "CREATED" });
    const billed = await JobCard.countDocuments({ status: "BILLED" });

    res.json({
      totalJobs: total,
      created,
      inProgress,
      done,
      billed
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};
