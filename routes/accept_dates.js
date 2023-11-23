
/*
  accept_dates.js

  secondary user select available day/s to schedule w primary user



*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");

router.get('/:uniq_url', async function (req, res) {
  ///eventually give render ID?

  //console.log('schedule id returned', req.params.uniq_url);

  function pullSchedule(){
    return userQueries.getSchedule(req.params.uniq_url);
  }

  //account for invalid url/ schedule id here
  const schdule_id = await pullSchedule();
  //console.log('getting shcedule at server accept dates',await schdule_id);

  // array of date objs
  const dates = await userQueries.getDates(schdule_id.id);
  // turn dates into date types??
  for (let dateStr of dates) {
    console.log("date:", dateStr)
    //var date = new Date(dateStr);
  }
  //send info to front end rdering... feed data into html??
  const templateVars = {
    dates: dates
    //user: users[req.session.user_id]
  };


  res.render('secondary_select', templateVars)

});

router.post("/", async function(req, res) {
})




module.exports = router;
