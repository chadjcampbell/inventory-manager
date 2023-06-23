const express = require("express");
const protect = require("../middleware/authMiddleware");
const { contactUs } = require("../controllers/contactController");

const router = express.Router();

router.post("/", protect, contactUs);

module.exports = router;
