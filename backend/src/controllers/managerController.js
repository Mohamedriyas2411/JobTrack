const JobCard = require("../models/JobCard");

// Kanban view (group by status)
exports.getKanbanView = async (req, res) => {
  const jobCards = await JobCard.find()
    .populate("serviceAdvisorId", "name")
    .populate("technicianId", "name");

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
};

// Dashboard summary
exports.getDashboardSummary = async (req, res) => {
  const total = await JobCard.countDocuments();
  const created = await JobCard.countDocuments({ status: "CREATED" });
  const inProgress = await JobCard.countDocuments({ status: "IN_PROGRESS" });
  const done = await JobCard.countDocuments({ status: "DONE" });
  const billed = await JobCard.countDocuments({ status: "BILLED" });

  res.json({
    totalJobCards: total,
    created,
    inProgress,
    done,
    billed
  });
};
