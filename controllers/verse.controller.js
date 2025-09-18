const axios = require("axios");

// The base URL for the Quran Foundation API.
const QURAN_API_BASE_URL =
  "https://apis-prelive.quran.foundation/content/api/v4";

/**
 * Controller to fetch verses for a specific chapter.
 * It forwards any query parameters from the client to the external API.
 * This allows for flexible requests (e.g., fetching specific translations).
 */
const getVersesByChapter = async (req, res) => {
  try {
    const { chapterNumber } = req.params;

    // Make a request to the external API.
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/chapters/${chapterNumber}/verses`,
      {
        headers: {
          // Auth headers are added by the addAuthHeaders middleware.
          "x-auth-token": req.headers["x-auth-token"],
          "x-client-id": req.headers["x-client-id"],
        },
        // Forward all query parameters (e.g., translations, fields) from the original request.
        params: req.query,
      }
    );

    // Send the data back to the client.
    res.json(response.data);
  } catch (error) {
    // Log the error for debugging.
    console.error("Error fetching verses by chapter:", error.message);
    // Send a structured error response to the client.
    res.status(error.response ? error.response.status : 500).json({
      message: "Failed to fetch verses.",
      error: error.response ? error.response.data : "An unknown error occurred",
    });
  }
};

module.exports = {
  getVersesByChapter,
};
