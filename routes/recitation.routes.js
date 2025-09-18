const express = require("express");
const router = express.Router();
const {
  getAllRecitations,
  getChapterRecitation,
} = require("../controllers/recitation.controller");

// GET all available recitations
router.get("/reciters", getAllRecitations);

// GET audio file for a specific chapter by a specific reciter
router.get(
  "/recitations/:recitation_id/by-chapter/:chapter_number",
  getChapterRecitation
);

module.exports = router;
