const express = require("express");
const router = express.Router();
const { getVersesByChapter } = require("../controllers/verse.controller");
const { addAuthHeaders } = require("../services/auth.service");

// --- Verse Routes ---

// Defines the endpoint for getting verses by a specific chapter number.
// The `addAuthHeaders` middleware is used to attach the necessary authentication tokens.
// Example API call: GET /api/verses/by-chapter/1?translations=131
router.get(
  "/verses/by-chapter/:chapterNumber",
  addAuthHeaders,
  getVersesByChapter
);

module.exports = router;
