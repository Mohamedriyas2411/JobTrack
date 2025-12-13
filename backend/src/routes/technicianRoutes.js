const express = require("express");
const {
  assignTechnician,
  updateWorkStatus,
  completeJob
} = require("../controllers/technicianController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

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
