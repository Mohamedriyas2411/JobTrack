const express = require("express");
const { createJobCard, getAllJobCards } = require("../controllers/jobCardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["advisor"]), createJobCard);
// Allow both advisor and manager to view job cards
router.get("/", protect(["advisor", "manager"]), getAllJobCards);

module.exports = router;
