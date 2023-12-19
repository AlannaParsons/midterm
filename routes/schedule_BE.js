/*
  schedule.js

  primary user. aggrigate schedule.
  see individual events and go to create event page

*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/queries");

const helpers = require("../helpers/helpers");

router.get('/', async function (req, res) {
//get reults from db to set up results page
  const cookie = req.cookies.cookieName;
  // hard code id for testing


  let urls_dates = new Array();
  //rename...to what

  //get schedules created by user
  const schedules = await userQueries.getScheduleByUser(cookie);

  console.log('whats going on then', cookie, schedules)
  //get all dates of all schedules, make object to hold data
  for (let schedule of schedules) {
    let UTCdates = await userQueries.getDates(schedule.id);

    //pull info out of utc for showing
    //var result = UTCdates.map(date => ({ month: date.utc.getUTCMonth}));
    //based on order from db (CHECK)
    let min = UTCdates[0].utc;
    let max = UTCdates[UTCdates.length - 1].utc;
    let range = [min, max];
    let dateRangeStr = `${helpers.monthToLong(min.getMonth())} ${min.getDate()} ${min.getFullYear()}` +
    ' - ' +
    `${helpers.monthToLong(max.getMonth())} ${max.getDate()} ${max.getFullYear()}`;

    //let currentVotes = await userQueries.getVoterCount(schedule.id);
    //let currentVoters = await userQueries.getVoters(schedule.id);
    //console.log('schedule bhow many voted:',currentVoters)

    const scheduleOBJ = {
      id: schedule.id,
      url: schedule.url,
      type: schedule.type,
      dates: UTCdates,
      count: schedule.voter_count,
      range: dateRangeStr
    }
    urls_dates.push(scheduleOBJ);

  }


  const templateVars = {
    schedules: urls_dates
    //user: users[req.session.user_id]
  };


  res.render('schedule', templateVars);
});


router.get('/create', (req, res) => {
  res.render('create_schedule');

  //req.cookies.cookieName

});

router.post("/create", async function(req, res) {
  if (req.body.dates) {
    //if user, no? create. move into helper?
    let userIDcookie = helpers.generateRandomString(1) + 'USER';
    let randomURL = helpers.generateRandomString(4);

    //rem to set cookie
    //req.session.user_id = cookie
    //userQueries.existingUser(req.cookies.cookieName)


    //const id = await addUser()
    const id = req.cookies.cookieName.toString();

    //new user added create new schedule then add dates w schedule id
    let schedule_id = await userQueries.addSchedule(id, randomURL, req.body.eventType);
    for (let dateStr of req.body.dates) {
      userQueries.addDates(dateStr, schedule_id);
    }

    res.status(201).json('valid request: POST body');
    return;
  }
})

router.get('/:uniq_url', async function (req, res) {
  const schedule = await userQueries.getScheduleByURL(req.params.uniq_url);

  if (!schedule) {
    const templateVars = {
      errMsg: "Schedule does not exist"
    };
    res.render('error', templateVars)
  } else {

    const results = await userQueries.getResults(schedule.id);
    const voters = await userQueries.getVoters(schedule.id);
    //largest result is first (ordered by db). used to set color of dates
    let max = results[0].rank_sum
    const formatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    // add info & format votes for FE
    for (let result of results){
      result['style'] = helpers.percentageToColor(result.rank_sum/max * 100);
      result['utc'] = new Date(result.utc).toLocaleDateString(undefined, formatOptions);
    }

    const templateVars = {
      results: results,
      voters: voters,
      schedule: schedule
    };

    res.render('results', templateVars)
  }
});

module.exports = router;
