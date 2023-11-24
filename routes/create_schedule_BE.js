/*
  date_picker.js

  primary user to pick available days to send to secondary user

*/

const express = require('express');
const router  = express.Router();
//const db = require("../db/connection");
const userQueries = require("../db/queries/users");
const helpers = require("../helpers/helpers");

router.get('/', (req, res) => {
  res.render('create_schedule');
});

//why is data a key?!
// is and array of obj { day: '16', month: 'November', year: '2023', selected: 'true' }
router.post("/", async function(req, res) {
  if (req.body.dates) {

    //if user, no? create. move into helper?
    let userIDcookie = helpers.generateRandomString(1) + 'USER';
    let randomURL = helpers.generateRandomString(4);

    //rem to set cookie
    //req.session.user_id = cookie

    //currently cookie is user name, will change to random id?
    // async .then?
    function addUser(){
      return userQueries.addUser(userIDcookie);

    }

    const id = await addUser()

    //new user added create new schedule then add dates w schedule id
    let schedule_id = await userQueries.addSchedule(id, randomURL);
    for (let dateStr of req.body.dates) {
      var date = new Date(dateStr);
      console.log('req body dates inside create schedule', typeof date, date instanceof Date)
      userQueries.addDates(date.getDate(), date.getMonth(), date.getFullYear(), schedule_id);

    }

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
    res.status(201).json('valid request: POST body');
    return;
  }

});

module.exports = router;
