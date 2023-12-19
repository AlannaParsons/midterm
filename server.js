// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { cookieMiddleware } = require('./middleware')

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// still using morgan?
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieMiddleware);
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

const primaryUser = require('./routes/schedule_BE');
const secondaryUser = require('./routes/invitee_BE');

app.use('/primary', primaryUser);
app.use('/secondary', secondaryUser);

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
