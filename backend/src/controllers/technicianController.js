const JobCard = require("../models/JobCard");
const TechnicianUpdate = require("../models/TechnicianUpdate");
const ServiceSummary = require("../models/ServiceSummary");

// Assign technician (Manager / Advisor)
exports.assignTechnician = async (req, res) => {
  const { technicianId } = req.body;

  const jobCard = await JobCard.findByIdAndUpdate(
    req.params.id,
    { technicianId, status: "IN_PROGRESS" },
    { new: true }
  );

  res.json(jobCard);
};

// Technician updates work status / critical issue
exports.updateWorkStatus = async (req, res) => {
  const { statusMessage, criticalIssue, issueDescription } = req.body;

  const update = await TechnicianUpdate.create({
    jobCardId: req.params.id,
    technicianId: req.user.id,
    statusMessage,
    criticalIssue,
    issueDescription
  });

  res.status(201).json(update);
};

// Technician completes job
exports.completeJob = async (req, res) => {
  const { workDone, nextServiceAdvice, preventionTips } = req.body;

  await JobCard.findByIdAndUpdate(req.params.id, { status: "DONE" });

  const summary = await ServiceSummary.create({
    jobCardId: req.params.id,
    technicianId: req.user.id,
    workDone,
    nextServiceAdvice,
    preventionTips
  });

  res.status(201).json(summary);
};
