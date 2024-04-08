const axios = require("axios");
const express = require("express");
const router = express.Router();
const apicache = require("apicache");
const baseURL = "https://zenkai-api.vercel.app/meta/anilist";
let cache = apicache.middleware;
router.get("/search/:q", async (req, res) => {
  try {
    const q = req.params.q;
    const response = await axios.get(`${baseURL}/${q}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/trending", cache("5 minutes"), async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/trending?perPage=15`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/popular", cache("5 minutes"), async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/popular`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/info/:id", cache("40 seconds"), async (req, res) => {
  const provider = ["gogoanime", "anify", "zoro"];
  try {
    const id = req.params.id;
    const promises = provider.map(async (p) => {
      try {
        // ...
      } catch (error) {
        // ...
      }
    });
    // ...
  } catch (error) {
    // ...
  }
});

module.exports = router;
