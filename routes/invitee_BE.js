
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


  res.render('invitee', templateVars)

});


//expecting secondary user to send requested date here
//are you posting 3 times? like a whore?!
router.post("/", function(req, res) {
  console.log('post i n invitee be')
  console.log('recieved:',req.body.accepted_date)
  res.status(201).send();
  return;
})




module.exports = router;
