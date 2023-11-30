/*
  results.js
  results loading in schedule_be rn


*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");
//const db = require("../db/connection");
//const userQueries = require("../db/queries/users");
//const helpers = require("../helpers/helpers");

router.get('/madeup', async function (req, res) {
//get reults from db to set up results page
  const cookie = req.cookies.cookieName;
  // hard code id for testing
  const testCookie = 5315284635178175;

  let urls_dates = new Array();
  //rename...to what

  //get schedules created by user
  const schedules = await userQueries.getScheduleByUser(testCookie);

  //get all dates of all schedules, make object to hold data
  for (let schedule of schedules) {
    let data = await userQueries.getDates(schedule.id);
    const scheduleOBJ = {
      id: schedule.id,
      url: schedule.url,
      dates: data
    }
    urls_dates.push(scheduleOBJ);

  }


  const templateVars = {
    schedules: urls_dates
    //user: users[req.session.user_id]
  };


  res.render('schedule', templateVars);
});



module.exports = router;
