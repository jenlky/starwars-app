const express = require("express");
const router = express.Router();
const searchPersonName = require("../utils/searchPersonName");
const fetchAndStore = require("../utils/fetchAndStore");

router.get("/", async (req, res) => {
  const name = req.query.name;
  let result = await searchPersonName(name);
  if (result.length === 0) {
    result = await fetchAndStore(name);
  }
  res.status(200).json(result);
});

module.exports = router;
