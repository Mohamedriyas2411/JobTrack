const express = require("express");
const {
  getKanbanView,
  getDashboardSummary
} = require("../controllers/managerController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

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

module.exports = router;
