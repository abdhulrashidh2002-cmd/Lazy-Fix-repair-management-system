const express = require("express");
const router = express.Router();

const {analyzeImage, getAllAiAnalysis} = require('../controllers/aiController');

router.post("/analyze", analyzeImage);
router.get("/:id", getAllAiAnalysis);

module.exports = router;