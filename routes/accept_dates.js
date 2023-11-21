
/*
  accept_dates.js

  secondary user select available day/s to schedule w primary user



*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");

router.get('/:uniq_url', async function (req, res) {
  ///eventually give render ID?


  //let schedule_id = await userQueries.getSchedule(req.params.uniq_url);
  console.log('schedule id returned', req.params.uniq_url);

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

  console.log(templateVars)

  res.render('secondary_select', templateVars)



  //let split = helper(scheduleStr);
//   schedules.then(function(result) {
//     console.log('SCHEDULE in accept:', result[2].schedule)
//     //console.log('SPLIT:',result.schedule);// "Some User token"
//  })
//   res.render('available_dates', schedules);


  // .then((user) => {
  //   if (!user) {
  //     return res.send({ error: "error" });
  //   }

  //   req.session.userId = user.id;
  //   res.send("🤗");
  // })
  // .catch((e) => res.send(e));

});

  //get rid of helper when we make decisions about database structure
  // helper string -> obj (?) day: month: year:
  // change dates so they occur in order or do w get
  const helper = (data) => {
    let split = data.split(',');
    console.log('SPLIT:',split);
  }



module.exports = router;
