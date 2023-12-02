/*
  schedule.js

  primary user. aggrigate schedule.
  add individual events and go to create event page

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


router.get('/create', (req, res) => {
  res.render('create_schedule');

  //req.cookies.cookieName

});

//why is data a key?!
// is and array of obj { day: '16', month: 'November', year: '2023', selected: 'true' }
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
    console.log('cookie in create post be', id)

    //new user added create new schedule then add dates w schedule id
    let schedule_id = await userQueries.addSchedule(id, randomURL);
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

  console.log('schedule id returned', req.params.uniq_url);

  // get results
  const schdule_id = await userQueries.getSchedule(req.params.uniq_url);


  // unneeded, same info in votes?
  const dates = await userQueries.getDates(schdule_id.id);
  //const votes = await userQueries.getVotes(schdule_id.id);
  const votes= await userQueries.getVotes(schdule_id.id);
  // turn dates into date types??
  const voters= await userQueries.getVoters(schdule_id.id);


  for (let vote of votes){
    //add color to vote?  pickHex(color1, color2, weight)

    vote['style'] = helpers.perc2color(vote.percentage)
    console.log('BE. prim. get uniq id',votes.length, helpers.perc2color(vote.percentage))

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
  const templateVars = {
    dates: dates,
    results: votes,
    voters: voters
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
