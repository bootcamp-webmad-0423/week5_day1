const express = require('express')
const router = express.Router()

// index page
router.get("/", (req, res, next) => {
  res.render("index")
})

module.exports = router