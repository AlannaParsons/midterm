
/*
  accept_dates.js

  secondary user select available day/s to schedule w primary user

*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");
const helpers = require("../helpers/helpers");

router.get('/ty', function (req, res) {

  res.render('ty');

});

router.get('/:uniq_url', async function (req, res) {

  const schdule_id = await userQueries.getSchedule(req.params.uniq_url);

  if (!schdule_id) {
    const templateVars = {
      errMsg: "Schedule does not exist"
    };
    res.render('error', templateVars)

  } else {
    const dates = await userQueries.getDates(schdule_id.id);
    const structuredDates = helpers.dateStructuring(dates)
    const templateVars = {
      dates: structuredDates
    };

    res.render('invitee', templateVars)
  }
});


//expecting secondary user to send requested date here
//opportunity for optomization. if rank is attached to date id in FE, BE wouldnt need to access db
router.post("/:uniq_url", async function(req, res) {
  console.log('post i n invitee be', req.params.uniq_url, req.params);

  const schdule_id = await userQueries.getSchedule(req.params.uniq_url);
  const dates = await userQueries.getDates(schdule_id.id);
  const cookie = req.cookies.cookieName.toString();
  const voter = await userQueries.addVoter(req.body.name, cookie);

  for (let i in req.body.dates) {
    userQueries.addVotes(req.body.dates[i], voter.id, dates.length-i);
  }

  res.status(201).send();
  return;
})

module.exports = router;
