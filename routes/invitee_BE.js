
/*
  accept_dates.js

  secondary user select available day/s to schedule w primary user



*/

const express = require('express');
const router  = express.Router();
const userQueries = require("../db/queries/users");

router.get('/:uniq_url', async function (req, res) {

  const schdule_id = await userQueries.getSchedule(req.params.uniq_url);

  if (!schdule_id) {
    res.status(404).send();
  } else {
    const dates = await userQueries.getDates(schdule_id.id);


    //assuming we always use this func afters dates come out of db
    function dateStructuring(dates) {


      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour:'numeric',
        minute:'numeric'
      };





      for (let date of dates) {
        // console.log ('funct testing in invitee be',date.utc.getUTCMonth());

        // const monthNamesShort = ['JA', 'FE', 'MR', 'AP', 'MY', 'JN',
        //                           'JL', 'AU', 'SE', 'OC', 'NV', 'DE' ];

        // console.log(monthNamesShort[date.utc.getUTCMonth()]);
        //let createdByUtc = JSON.parse( `{"utc": ${date.utc}, "local": "2022-08-20T12:18:48.6588096"}`);
        let newDate =new Date(date.utc)

        options.timeZone = 'UTC';
        options.timeZoneName = 'short';
        console.log(newDate.toLocaleString('en-US', options))

      }
    }
    dateStructuring(dates)
    //array of obj
    // [
    //   { id: 1, schedule_id: 1, utc: 'Mon, 06 Nov 2023 07:00:00 GMT' },
    //   { id: 2, schedule_id: 1, utc: 'Tue, 07 Nov 2023 07:00:00 GMT' },
    //   { id: 3, schedule_id: 1, utc: 'Wed, 08 Nov 2023 07:00:00 GMT' }
    // ]
    const templateVars = {
      dates: dates
    };

    res.render('invitee', templateVars)

  }


});


//expecting secondary user to send requested date here
//opportunity for optomization. if rank is attached to date id in FE, BE wouldnt need to access db
router.post("/:uniq_url", async function(req, res) {
  console.log('post i n invitee be', req.params.uniq_url, req.params);

  const schdule_id = await userQueries.getSchedule(req.params.uniq_url);
  // array of date objs
  const dates = await userQueries.getDates(schdule_id.id);

  //if cookie matches primary user???
  const cookie = req.cookies.cookieName.toString();

  //maybe use a .map???
  //vals are ordered by rank ex: [high, med, low] -> high priority will have hig val
  //make sure unselected dates are accounted for in weighting of ranks
  //ranks relative to all dates available
  //rank lowest is one because dates.length-i. rank 0 unnecessary
  for (let i in req.body.dates) {
    userQueries.addVotes(req.body.dates[i], req.body.name, cookie, dates.length-i);
  }
  //not necessary to add dates that werent voted on?? add rank:0??
  // for (let i in dates) {
  //   if (req.body.vals.includes(dates[i].id))
  // }

  res.status(201).send();
  return;
})




module.exports = router;
