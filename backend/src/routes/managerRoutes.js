const express = require("express");
const {
  getKanbanView,
  getDashboardSummary,
  getAllTechnicians,
  getAllBills
} = require("../controllers/managerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all technicians (for assignment)
router.get(
  "/technicians",
  protect(["manager", "advisor"]),
  getAllTechnicians
);

// Get all bills
router.get(
  "/bills",
  protect(["manager"]),
  getAllBills
);

// Kanban board
router.get(
  "/kanban",
  protect(["manager"]),
  getKanbanView
);

// Dashboard counts
router.get(
  "/dashboard",
  protect(["manager"]),
  getDashboardSummary
);

// Stats endpoint (alias for dashboard)
router.get(
  "/stats",
  protect(["manager"]),
  getDashboardSummary
);

module.exports = router;
