const express = require("express");
const { getGoogleAuthURL } = require("../shared/authenticate.js");
const urlparse = require("urlparse");
const queryParse = require("query-string")
const { oauth2Client } = require("../shared/authenticate.js");
const { google } = require("googleapis");
const { getJWT } = require("../shared/jwt.js");

const router = express.Router();

// Send to server link to authorize google account
router.get("/", (req, res) => {
  res.json({
    googleURL: getGoogleAuthURL(),
  });
});

// Callback router after user successfully authorizes account
// Using Google profile info, generate JWT Token and return token to FE
router.get("/callback", async (req, res) => {
  try {

    const queryURL = new urlparse(req.url);
    const code = queryParse.parse(queryURL.query).code;
    const { tokens } = await oauth2Client.getToken(code);
    access = tokens.access_token;
    oauth2Client.setCredentials({ access_token: access });
    let oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    const infoData = await oauth2.userinfo.get();
    const token = getJWT(infoData.data);
    res.json({
      token: token,
    });
  }catch (e) {
    res.status(500).send({Error: "Error logging in"})
  }
});

router.get('/logout', (req, res) => {
  try {
    const access_token = req.headers.access_token; 
    oauth2Client.setCredentials({ access_token: access_token });
    oauth2Client.revokeToken(access_token, (err, result) => {
      if (err) {
        console.error('Error revoking access token:', err);
      // Handle any error that might occur while revoking the token
      } else {
        console.log('Access token revoked successfully.', result);
      }

      // Respond to the frontend with a success message
      res.status(200).json({ message: 'Logout successful' });
    });
  } catch (e) {
    res.status(500).send({ error: "Error Logging out" });
  }
});

module.exports = router;