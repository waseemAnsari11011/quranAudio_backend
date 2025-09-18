const express = require("express");
const router = express.Router();
const quranController = require("../controllers/chapter.controller");
const { addAuthHeaders } = require("../services/auth.service");

// Apply the authentication middleware to all routes in this file
router.use(addAuthHeaders);

// Define the routes and map them to controller functions
router.get("/chapters", quranController.listChapters);
router.get("/chapters/:id", quranController.getChapterById);
router.get("/chapters/:id/info", quranController.getChapterInfo);

// --- Verse Routes ---
router.get("/verses/by_chapter/:id", quranController.getVersesByChapter);

// --- Tafsir Routes ---
router.get(
  "/tafsirs/:tafsirId/by_chapter/:chapterId",
  quranController.getTafsirByChapter
);

// --- Resources Routes ---
router.get("/reciters", quranController.getReciters);

module.exports = router;
