const JobCard = require("../models/JobCard");
const TechnicianUpdate = require("../models/TechnicianUpdate");
const ServiceSummary = require("../models/ServiceSummary");

// Get all updates for a specific job card
exports.getJobUpdates = async (req, res) => {
  try {
    const updates = await TechnicianUpdate.find({ 
      jobCardId: req.params.id 
    })
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });
    
    res.json(updates);
  } catch (error) {
    console.error("Error fetching job updates:", error);
    res.status(500).json({ message: "Failed to fetch updates", error: error.message });
  }
};

// Get service summary for a specific job card
exports.getServiceSummary = async (req, res) => {
  try {
    const summary = await ServiceSummary.findOne({ 
      jobCardId: req.params.id 
    }).populate("technicianId", "name");
    
    if (!summary) {
      return res.status(404).json({ message: "Service summary not found" });
    }
    
    res.json(summary);
  } catch (error) {
    console.error("Error fetching service summary:", error);
    res.status(500).json({ message: "Failed to fetch summary", error: error.message });
  }
};

// Get jobs assigned to logged-in technician
exports.getAssignedJobs = async (req, res) => {
  try {
    const jobCards = await JobCard.find({ 
      technicianId: req.user.id 
    }).sort({ createdAt: -1 });
    
    res.json(jobCards);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// Assign technician (Manager / Advisor)
exports.assignTechnician = async (req, res) => {
  try {
    const { technicianId } = req.body;

    const jobCard = await JobCard.findByIdAndUpdate(
      req.params.id,
      { technicianId, status: "IN_PROGRESS" },
      { new: true }
    );

    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }

    res.json(jobCard);
  } catch (error) {
    console.error("Error assigning technician:", error);
    res.status(500).json({ message: "Failed to assign technician", error: error.message });
  }
};

// Technician updates work status / critical issue
exports.updateWorkStatus = async (req, res) => {
  try {
    const { statusMessage, criticalIssue, issueDescription } = req.body;

    const update = await TechnicianUpdate.create({
      jobCardId: req.params.id,
      technicianId: req.user.id,
      statusMessage,
      criticalIssue,
      issueDescription
    });

    res.status(201).json(update);
  } catch (error) {
    console.error("Error updating work status:", error);
    res.status(500).json({ message: "Failed to update status", error: error.message });
  }
};

// Technician completes job
exports.completeJob = async (req, res) => {
  try {
    const { workDone, nextServiceAdvice, preventionTips } = req.body;

    const jobCard = await JobCard.findByIdAndUpdate(
      req.params.id, 
      { status: "DONE" },
      { new: true }
    );

    if (!jobCard) {
      return res.status(404).json({ message: "Job card not found" });
    }

    const summary = await ServiceSummary.create({
      jobCardId: req.params.id,
      technicianId: req.user.id,
      workDone,
      nextServiceAdvice,
      preventionTips
    });

    res.status(201).json(summary);
  } catch (error) {
    console.error("Error completing job:", error);
    res.status(500).json({ message: "Failed to complete job", error: error.message });
  }
};
