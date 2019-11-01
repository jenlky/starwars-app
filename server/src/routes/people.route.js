const express = require("express");
const router = express.Router();
const { fetchAndStore } = require("../utils/text-file-functions");

router.get("/", async (req, res) => {
  const name = req.query.name;
  const result = await fetchAndStore(name);
  res.status(200).json(result);
});

module.exports = router;
