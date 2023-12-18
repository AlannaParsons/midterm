/*
  schedule.js

  primary user. aggrigate schedule.
  see individual events and go to create event page

*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");
//const db = require("../db/connection");
//const userQueries = require("../db/queries/users");
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

//why is data a key?!
// is and array of obj { day: '16', month: 'November', year: '2023', selected: 'true' }
router.post("/create", async function(req, res) {
  if (req.body.dates) {

    console.log('POSTING IN SCHeDULE')

    //if user, no? create. move into helper?
    let userIDcookie = helpers.generateRandomString(1) + 'USER';
    let randomURL = helpers.generateRandomString(4);

    //rem to set cookie
    //req.session.user_id = cookie
    //userQueries.existingUser(req.cookies.cookieName)


    //const id = await addUser()
    const id = req.cookies.cookieName.toString();
    console.log('cookie in create post be', id)

    //new user added create new schedule then add dates w schedule id
    let schedule_id = await userQueries.addSchedule(id, randomURL, req.body.eventType);
    for (let dateStr of req.body.dates) {
      //date string should be utc here
      var date = new Date(dateStr);
      console.log('req body dates inside create schedule', typeof date, date instanceof Date)
      userQueries.addDates(dateStr, schedule_id);




    }

    res.status(201).json('valid request: POST body');
    return;
  }
})


router.get('/:uniq_url', async function (req, res) {

  const schedule = await userQueries.getSchedule(req.params.uniq_url);

  console.log('schedu',schedule)
  // unneeded, same info in votes?
  //const dates = await userQueries.getDates(schdule_id.id);
  //const votes = await userQueries.getVotes(schdule_id.id);
  const results= await userQueries.getResults(schedule.id);
  // turn dates into date types??
  const voters= await userQueries.getVoters(schedule.id);
  const formatOptions = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  //assumes largest result is first
  let max = results[0].rank_sum
  // add info & format votes
console.log('contributors:', voters)

  for (let result of results){
    result['style'] = helpers.percentageToColor(result.rank_sum/max * 100);

    var formattedDate = new Date(result.utc).toLocaleDateString(undefined, formatOptions);
    result['utc'] = formattedDate;
  }
//get percentages for ranks


  // for (let date of dates) {
    //sum = arr.reduce(function (a, b) {return a + b;}, 0);

  //   const votes = await userQueries.getVotes(date.id);
  //   console.log("date:", date, votes)
  //   //make sql do aggrigate work??? total votes of each date maybe
  //   //var date = new Date(dateStr);
  // }
  //array of obj
  // [
  //   { id: 1, schedule_id: 1, utc: 'Mon, 06 Nov 2023 07:00:00 GMT' },
  //   { id: 2, schedule_id: 1, utc: 'Tue, 07 Nov 2023 07:00:00 GMT' },
  //   { id: 3, schedule_id: 1, utc: 'Wed, 08 Nov 2023 07:00:00 GMT' }
  // ]

  //styles attatched to results inside votes to be used by ejs
  const templateVars = {
    //dates: dates,
    results: results,
    voters: voters,
    schedule: schedule
    //user: users[req.session.user_id]
  };


  res.render('results', templateVars)

});


    //ADD IN CATCHES LATER
    // db
    // .addSchedule(req.body.dates)
    // .then((user) => {
      // if (!user) {
      //   return res.send({ error: "error" });
      // }

      // req.session.userId = user.id;
      // res.send("🤗");
    //})
    //.catch((e) => res.send(e));

    //STANDARD: change to fetch data from database for return



module.exports = router;
