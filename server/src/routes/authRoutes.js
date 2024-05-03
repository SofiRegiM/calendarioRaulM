const express = require('express');
const router = express.Router();
const { oauth2Client } = require('../googleAuth'); // Adjust path as necessary

// Redirect to Google's OAuth 2.0 server
router.get('/auth/google', (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Necessary to receive a refresh token
    scope: scopes,
    prompt: 'consent' // Forces the consent screen to be displayed
  });

  res.redirect(url);
});

// Handle OAuth 2.0 server responses
router.get('/oauth2callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    // Store these tokens securely, e.g., in your database
    res.redirect('/success'); // Redirect to a success page or route
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.redirect('/error'); // Redirect to an error page or route
  }
});

module.exports = router;