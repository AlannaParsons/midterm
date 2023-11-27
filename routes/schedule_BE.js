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
//get reults from db to set up results page


  const templateVars = {
    dates: dates
    //user: users[req.session.user_id]
  };


  res.render('schedule', templateVars);
});



module.exports = router;
