const axios = require("axios");
const express = require("express");
const router = express.Router();
const apicache = require("apicache");
const baseURL = "https://zenkai-api.vercel.app/meta/anilist";
let cache = apicache.middleware;

router.get("/search/:q", cache("5 seconds"), async (req, res) => {
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

router.get("/info/:id", cache("10 seconds"), async (req, res) => {
  const provider = ["gogoanime", "anify", "zoro"];
  try {
    const id = req.params.id;
    const promises = provider.map(async (p) => {
      try {
        const response = await axios.get(`${baseURL}/info/${id}?provider=${p}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    });

    const response = await Promise.any(promises);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/watch/:id", cache("5 minutes"), async (req, res) => {
  try {
    const id = req.params.id;
    const response = await axios.get(`${baseURL}/watch/${id}`);
    res.json(response.data.sources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/airing-schedule", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/airing-schedule`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
