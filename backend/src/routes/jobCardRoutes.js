const express = require("express");
const { createJobCard, getAllJobCards } = require("../controllers/jobCardController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect(["advisor"]), createJobCard);
router.get("/", protect(["manager"]), getAllJobCards);

module.exports = router;
