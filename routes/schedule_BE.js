/*
  schedule.js

  primary user to see aggregate schedule
  "homepage"

*/

const express = require('express');
const router  = express.Router();
//const db = require("../db/connection");
//const userQueries = require("../db/queries/users");
//const helpers = require("../helpers/helpers");

router.get('/', (req, res) => {
  res.render('schedule');
});



module.exports = router;
