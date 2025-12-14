const express = require("express");
const { generateBill, getCompletedJobs } = require("../controllers/cashierController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get completed jobs ready for billing
router.get(
  "/completed-jobs",
  protect(["cashier"]),
  getCompletedJobs
);

// Cashier generates bill after job DONE
router.post(
  "/bill/:id",
  protect(["cashier"]),
  generateBill
);

module.exports = router;
