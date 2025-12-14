const JobCard = require("../models/JobCard");

exports.createJobCard = async (req, res) => {
  try {
    const jobCard = await JobCard.create({
      ...req.body,
      jobCardNumber: "JC-" + Date.now(),
      serviceAdvisorId: req.user.id
    });
    res.status(201).json(jobCard);
  } catch (error) {
    console.error("Error creating job card:", error);
    res.status(500).json({ message: "Failed to create job card", error: error.message });
  }
};

exports.getAllJobCards = async (req, res) => {
  try {
    const jobCards = await JobCard.find()
      .populate("serviceAdvisorId", "name")
      .populate("technicianId", "name")
      .sort({ createdAt: -1 });
    res.json(jobCards);
  } catch (error) {
    console.error("Error fetching job cards:", error);
    res.status(500).json({ message: "Failed to fetch job cards", error: error.message });
  }
};
