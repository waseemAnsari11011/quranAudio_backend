const axios = require("axios");

// Replace with your actual credentials
const CLIENT_ID = "a5752881-33f3-49cf-b3bd-392cae98fc71";
const CLIENT_SECRET = "3rGS51DOC-uwm6skTEbn70zO78";

// This object will hold our token
const tokenState = {
  accessToken: null,
};

/**
 * Fetches a new access token from the Quran Foundation API.
 */
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );
    const response = await axios({
      method: "post",
      url: "https://oauth2.quran.foundation/oauth2/token",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials&scope=content",
    });
    tokenState.accessToken = response.data.access_token;
    console.log("Access token has been successfully obtained and updated!");
  } catch (error) {
    console.error(
      "Error getting access token:",
      error.response ? error.response.data : error.message
    );
    tokenState.accessToken = null; // Clear token on failure
  }
};

/**
 * Middleware to check for the access token and attach API headers to the request.
 */
const addAuthHeaders = (req, res, next) => {
  if (!tokenState.accessToken) {
    return res.status(503).json({
      error: "API token is not available. Please try again in a moment.",
    });
  }
  // Attach headers for the downstream API call
  req.apiHeaders = {
    "x-auth-token": tokenState.accessToken,
    "x-client-id": CLIENT_ID,
  };
  next();
};

module.exports = {
  getAccessToken,
  addAuthHeaders,
};
