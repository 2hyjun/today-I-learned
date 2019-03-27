const express = require("express");
const router = express.Router();
const { test } = require("../util");

router.get("/", (req, res) => {
  const a = test();
  res.send(a);
});

module.exports = router;
