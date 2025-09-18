require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const { getAccessToken } = require("./services/auth.service");
const quranRoutes = require("./routes/chapter.routes");
const verseRoutes = require("./routes/verse.routes");
const recitationRoutes = require("./routes/recitation.routes");
const cors = require("cors");
const app = express();
const port = 8000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// --- Initial Setup ---

// --- Database Connection ---
const connectDB = async () => {
  try {
    // Check if MONGO_URI is set
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in your .env file");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connection established successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Exit the process with a failure code if we can't connect to the DB
    process.exit(1);
  }
};

connectDB();
// -------------------------

// Fetch the initial access token when the server starts.
getAccessToken();

// Set an interval to refresh the token every 55 minutes (3300000 ms).
// The token expires in 1 hour (3600 seconds).
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;
setInterval(getAccessToken, TOKEN_REFRESH_INTERVAL);

// --- Routes ---
app.use("/api", quranRoutes); // Prefix all quran routes with /api
app.use("/api", verseRoutes);
app.use("/api", recitationRoutes);
// --- Server Start ---
app.listen(port, () => {
  console.log(`Quran API proxy server listening at http://localhost:${port}`);
  console.log("API endpoints are available under http://localhost:3000/api/");
});
