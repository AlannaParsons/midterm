/*
  schedule.js
RENAME???

  schedule results

*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");
//const db = require("../db/connection");
//const userQueries = require("../db/queries/users");
//const helpers = require("../helpers/helpers");

router.get('/', async function (req, res) {
//get reults from db to set up results page
  const cookie = req.cookies.cookieName;
  // hard code id for testing
  const testCookie = 5315284635178175;
  console.log('coo',cookie)
  let urls_dates = new Array();


  const schedules = await userQueries.getScheduleByUser(testCookie);

  for (let schedule of schedules) {
    let data = await userQueries.getDates(schedule.id);
    const scheduleOBJ = {
      id: schedule.id,
      url: schedule.url,
      dates: data
    }
    urls_dates.push(scheduleOBJ);

  }


  console.log('schedules in schedule get', urls_dates);

  const templateVars = {
    schedules: urls_dates
    //user: users[req.session.user_id]
  };


  res.render('schedule', templateVars);
});



module.exports = router;
