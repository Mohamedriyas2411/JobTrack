const JobCard = require("../models/JobCard");

exports.createJobCard = async (req, res) => {
  const jobCard = await JobCard.create({
    ...req.body,
    jobCardNumber: "JC-" + Date.now(),
    serviceAdvisorId: req.user.id
  });
  res.status(201).json(jobCard);
};

exports.getAllJobCards = async (req, res) => {
  const jobCards = await JobCard.find();
  res.json(jobCards);
};
