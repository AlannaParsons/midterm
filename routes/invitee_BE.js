
/*
  accept_dates.js

  secondary user select available day/s to schedule w primary user

*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/queries");
const helpers = require("../helpers/helpers");

router.get('/ty', function (req, res) {

  res.render('ty');

});

router.get('/:uniq_url', async function (req, res) {

  const schedule = await userQueries.getScheduleByURL(req.params.uniq_url);
  if (!schedule) {
    const templateVars = {
      errMsg: "Schedule does not exist"
    };
    res.render('error', templateVars)
    return;
  }

  const cookie = req.cookies.cookieName;
  const voters = await userQueries.getVoters(schedule.id);
  const voterCookies = voters.map((voter) => voter.cookie);

  if (voterCookies.includes(cookie)) {
    const templateVars = {
      errMsg: "User has already voted"
    };
    res.render('error', templateVars)
    return;
  }

  const dates = await userQueries.getDates(schedule.id);
  const templateVars = {
    dates: helpers.dateStructuring(dates)
  };

  res.render('invitee', templateVars)


});


router.post("/:uniq_url", async function(req, res) {

  const schedule = await userQueries.getScheduleByURL(req.params.uniq_url);
  const dates = await userQueries.getDates(schedule.id);
  const cookie = req.cookies.cookieName.toString();
  const voter = await userQueries.addVoter(req.body.name, cookie);

  //change to "batching". try probably wont catch this because loop
  for (let i in req.body.dates) {
    userQueries.addVotes(req.body.dates[i], voter.id, dates.length-i);
  }
//return voter, successful creation?. or votes
return res.status(201);

})

module.exports = router;
