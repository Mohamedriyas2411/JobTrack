const express = require("express");
const {
  assignTechnician,
  updateWorkStatus,
  completeJob,
  getAssignedJobs,
  getJobUpdates,
  getServiceSummary
} = require("../controllers/technicianController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get assigned jobs for logged-in technician
router.get(
  "/jobs",
  protect(["technician"]),
  getAssignedJobs
);

// Get all updates for a specific job (for advisors/managers)
router.get(
  "/updates/:id",
  protect(["advisor", "manager", "technician"]),
  getJobUpdates
);

// Get service summary for a specific job (for advisors/managers)
router.get(
  "/summary/:id",
  protect(["advisor", "manager"]),
  getServiceSummary
);

// Manager / Advisor assigns technician
router.patch(
  "/assign/:id",
  protect(["manager", "advisor"]),
  assignTechnician
);

// Technician updates progress / critical issue
router.post(
  "/update/:id",
  protect(["technician"]),
  updateWorkStatus
);

// Technician completes job
router.post(
  "/complete/:id",
  protect(["technician"]),
  completeJob
);

module.exports = router;
