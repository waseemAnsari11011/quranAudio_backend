const axios = require("axios");
const QURAN_API_BASE_URL = "https://apis.quran.foundation/content/api/v4";

/**
 * Fetches all available reciters.
 */
const getAllRecitations = async (req, res) => {
  try {
    // Corrected the endpoint to fetch the list of reciters
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/resources/recitations`,
      {
        headers: req.apiHeaders, // Headers are attached by middleware
      }
    );
    res.json(response.data);
  } catch (error) {
    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
};

/**
 * Fetches the audio file for a specific chapter by a specific reciter.
 * Handles pagination to get all verses.
 */
const getChapterRecitation = async (req, res) => {
  console.log("Fetching chapter recitation with pagination...");
  try {
    const { recitation_id, chapter_number } = req.params;
    console.log("recitation_id, chapter_number", recitation_id, chapter_number);

    let allAudioFiles = [];
    let currentPage = 1;
    let totalPages = 1;

    // Fetch all pages of audio files
    do {
      const response = await axios.get(
        `${QURAN_API_BASE_URL}/recitations/${recitation_id}/by_chapter/${chapter_number}`,
        {
          params: {
            page: currentPage,
            per_page: 500, // Reasonable page size
          },
          headers: req.apiHeaders,
        }
      );

      // Add audio files from current page
      allAudioFiles = allAudioFiles.concat(response.data.audio_files);

      // Update pagination info
      totalPages = response.data.pagination.total_pages;
      currentPage++;

      console.log(
        `Fetched page ${currentPage - 1}/${totalPages}, got ${
          response.data.audio_files.length
        } files`
      );
    } while (currentPage <= totalPages);

    console.log("Total audio files fetched:", allAudioFiles.length);

    // Return all audio files for the complete chapter
    res.json({ audio_file: allAudioFiles });
  } catch (error) {
    console.log("error", error);

    res
      .status(error.response ? error.response.status : 500)
      .json({ message: error.message });
  }
};

module.exports = {
  getAllRecitations,
  getChapterRecitation,
};
