const axios = require("axios");

const QURAN_API_BASE_URL = "https://apis.quran.foundation/content/api/v4";

/**
 * Handles errors from Axios requests and sends a structured response.
 * @param {object} res - The Express response object.
 * @param {Error} error - The error object from the catch block.
 */
const handleError = (res, error) => {
  console.error("API call failed:", error.message);
  const status = error.response ? error.response.status : 500;
  const message = error.response
    ? error.response.data
    : { error: "An internal server error occurred" };
  res.status(status).json(message);
};

/**
 * Controller to list all chapters.
 */
const listChapters = async (req, res) => {
  try {
    const response = await axios.get(`${QURAN_API_BASE_URL}/chapters`, {
      headers: req.apiHeaders, // Headers are attached by middleware
    });
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Controller to get a specific chapter by its ID.
 */
const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${QURAN_API_BASE_URL}/chapters/${id}`, {
      headers: req.apiHeaders,
    });
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Controller to get information about a specific chapter.
 */
const getChapterInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/chapters/${id}/info`,
      {
        headers: req.apiHeaders,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Controller to get verses for a specific chapter.
 */
const getVersesByChapter = async (req, res) => {
  try {
    const { id } = req.params;
    // Pass any query params from the client to the Quran API
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/verses/by_chapter/${id}`,
      {
        headers: req.apiHeaders,
        params: req.query,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Controller to get tafsirs for a specific chapter.
 */
const getTafsirByChapter = async (req, res) => {
  try {
    const { chapterId, tafsirId } = req.params;
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/tafsirs/${tafsirId}/by_chapter/${chapterId}`,
      {
        headers: req.apiHeaders,
        params: req.query,
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

/**
 * Controller to list all available reciters.
 */
const getReciters = async (req, res) => {
  try {
    const response = await axios.get(
      `${QURAN_API_BASE_URL}/resources/recitations`,
      {
        headers: req.apiHeaders,
        params: { language: "en" }, // Fetch english names
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    handleError(res, error);
  }
};

module.exports = {
  listChapters,
  getChapterById,
  getChapterInfo,
  getVersesByChapter,
  getTafsirByChapter,
  getReciters,
};
