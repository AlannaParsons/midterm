/*
  base_BE.js

  basic page. could be used to send various message to user? only used by secondary select 'thank you'
*/

const express = require('express');
const router  = express.Router();

router.get('/', function (req, res) {

  res.render('base');

});


module.exports = router;
