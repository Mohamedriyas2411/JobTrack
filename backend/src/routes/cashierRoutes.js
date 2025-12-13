const express = require("express");
const { generateBill } = require("../controllers/cashierController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Cashier generates bill after job DONE
router.post(
  "/bill/:id",
  protect(["cashier"]),
  generateBill
);

module.exports = router;
