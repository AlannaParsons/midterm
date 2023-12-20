
/*
  invitee_BE.js

  secondary user select available day/s to schedule w primary user

*/

const express = require('express');
const router  = express.Router();
const dbQueries = require("../db/queries/queries");
const helpers = require("../helpers/helpers");

router.get('/ty', function (req, res) {

  res.render('ty');

});

router.get('/:uniq_url', async function (req, res) {
  try {

    const schedule = await dbQueries.getScheduleByURL(req.params.uniq_url);
    if (!schedule) {
      const templateVars = {
        errMsg: "Schedule does not exist"
      };
      res.render('error', templateVars)
      return;
    }

    const cookie = req.cookies.cookieName;
    const voters = await dbQueries.getVoters(schedule.id);
    const voterCookies = voters.map((voter) => voter.cookie);

    if (voterCookies.includes(cookie)) {
      const templateVars = {
        //allow edit here
        errMsg: "User has already voted"
      };
      res.render('error', templateVars)
      return;
    }

    const dates = await dbQueries.getDates(schedule.id);
    const structuredDates = helpers.dateStructuring(dates)
    console.log('structured?:', structuredDates)
    const templateVars = {
      dates: structuredDates
    };

    res.render('invitee', templateVars)
  } catch (e) {
    const templateVars = {
      errMsg: e
    };
    return res.render('error', templateVars);
  }
});


router.post("/:uniq_url", async function(req, res) {
  console.log('postingBE')
  try {
    console.log('postingBE trying')
    const schedule = await dbQueries.getScheduleByURL(req.params.uniq_url);
    const dates = await dbQueries.getDates(schedule.id);
    const cookie = req.cookies.cookieName.toString();
    const voter = await dbQueries.addVoter(req.body.name, req.body.email, cookie);
    //change to "batching". try probably wont catch this because loop. or internal catch if lazy
    //ranking is handled here. ranks based of order of array given by user.
    // ranked based on # of dates in schedule
    for (let i in req.body.dates) {
      dbQueries.addVotes(req.body.dates[i], voter.id, dates.length-i);
    }
    //why doesnt ajax like this >>
    //return res.status(201);
    return res.status(201).send('success create');

  } catch (e) {

    return res.status(400).json(e.message);
  }
})

module.exports = router;
