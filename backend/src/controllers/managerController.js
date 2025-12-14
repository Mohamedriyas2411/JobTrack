const JobCard = require("../models/JobCard");

// Kanban view (group by status)
exports.getKanbanView = async (req, res) => {
  try {
    const jobCards = await JobCard.find()
      .populate("serviceAdvisorId", "name")
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });

    const kanban = {
      CREATED: [],
      IN_PROGRESS: [],
      DONE: [],
      BILLED: []
    };

    jobCards.forEach(job => {
      kanban[job.status].push(job);
    });

    res.json(kanban);
  } catch (error) {
    console.error("Error fetching kanban data:", error);
    res.status(500).json({ message: "Failed to fetch kanban data", error: error.message });
  }
};

// Dashboard summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const total = await JobCard.countDocuments();
    const created = await JobCard.countDocuments({ status: "CREATED" });
    const inProgress = await JobCard.countDocuments({ status: "IN_PROGRESS" });
    const done = await JobCard.countDocuments({ status: "DONE" });
    const billed = await JobCard.countDocuments({ status: "BILLED" });

    res.json({
      totalJobs: total,
      created,
      inProgress,
      done,
      billed
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);
    res.status(500).json({ message: "Failed to fetch dashboard data", error: error.message });
  }
};
