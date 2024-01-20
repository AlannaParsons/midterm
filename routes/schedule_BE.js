/*
  schedule.js

  primary user. aggrigate schedule.
  see individual event results and create event page

*/

const express = require('express');
const router  = express.Router();
const dbQueries = require("../db/queries/queries");
const helpers = require("../helpers/helpers");

router.get('/', async function (req, res) {

  const cookie = req.cookies.cookieName;
  let urls_dates = new Array();
  const schedules = await dbQueries.getScheduleByUser(cookie);

  for (let schedule of schedules) {
    let UTCdates = await dbQueries.getDates(schedule.id);
    let min = UTCdates[0].utc;
    let max = UTCdates[UTCdates.length - 1].utc;
    let range = [min, max];
    let dateRangeStr = `
    ${helpers.monthToLong(min.getMonth())} ${min.getDate()} ${min.getFullYear()}`
    + ' - ' +
    `${helpers.monthToLong(max.getMonth())} ${max.getDate()} ${max.getFullYear()}
    `;

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
  };

  res.render('schedule', templateVars);
});


router.get('/create', (req, res) => {
  res.render('create_schedule');
});

router.post("/create", async function(req, res) {
  try {

    //if user, no? loggin check? beyond scope....

    let randomURL = helpers.generateRandomString(4);
    const cookie = req.cookies.cookieName.toString();
    //maybe turn into single query
    let user = await dbQueries.getUser(cookie);
    let schedule_id = await dbQueries.addSchedule(user.id, randomURL, req.body.eventType, req.body.eventDescription);

    for (let dateStr of req.body.dates) {
      dbQueries.addDates(dateStr, schedule_id);
    }
    return res.status(201).send('success create');

  } catch (e) {

    return res.status(400).json(e.message);
  }
})

router.get('/:uniq_url', async function (req, res) {
  try {
    const schedule = await dbQueries.getScheduleByURL(req.params.uniq_url);

    if (!schedule) {
      const templateVars = {
        errMsg: "Schedule does not exist"
      };
      res.render('error', templateVars);
      return
    }

    const results = await dbQueries.getResults(schedule.id);
    const voters = await dbQueries.getVoters(schedule.id);

    console.log('results:',results)
    //should you be able to see empty results?
    if (!voters) {
      const templateVars = {
        errMsg: "No results available at this time"
      };
      res.render('error', templateVars);
      return
    }

    //largest result is first (ordered by db). used to set color of dates
    //use datestructuring helper?
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
  } catch (e) {
    const templateVars = {
      errMsg: e
    };
    return res.render('error', templateVars);
  }
});

module.exports = router;
