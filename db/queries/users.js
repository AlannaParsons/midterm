const db = require('../connection');


// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };
/**
 * const addUser = function (schedule)
 * Primary user adds a new schedule data to the database. schedule array?
 * currently givven fake user id
 * why is schedule id starting at 2.... user id??
 * @param {string} user_id
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const addUser = function (username, id) {

  return db
  .query(`INSERT INTO users (id, name)
          VALUES ($1, $2)
          RETURNING id;`, [id, username])
  .then((result) => {
    console.log('user add?:',result.rows[0].id);
    return result.rows[0].id;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * const existingUser = function (schedule)
 * may not be needed.... revisit
 * @param {string} user_id
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const existingUser = function (user_cookie) {

  return db
  .query(`SELECT * FROM schedules
          WHERE user_cookie = ($1)
          ;`, [user_cookie])
  .then((result) => {
    console.log('user exists?:',result.rows[0]);
    return result.rows[0].id;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * const addSchedule = function (schedule)
 * Primary user adds a new schedule data to the database. schedule array?
 * currently givven fake user id
 * why is schedule id starting at 2.... user id??
 * @param {string} user_id
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const addSchedule = function (user, url) {

  return db
  .query(`INSERT INTO schedules (user_cookie, url)
          VALUES ($1, $2)
          RETURNING id;`, [user, url])
  .then((result) => {
    console.log('schedule add?:',result.rows[0].id);
    return result.rows[0].id;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * const addDates = function (date, sched_id)
 * expected to be called in for loop to add all dates to given schedule
 * @param {Date} date { day: '16', month: 'November', year: '2023', selected: 'true' }
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const addDates = function (utc, sched_id) {

  return db
  .query(`INSERT INTO dates (utc, schedule_id)
          VALUES ($1, $2)
          ;`, [utc, sched_id])
  .then((result) => {
    //console.log('date add?:',result.rows[0]); return nothing rn
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * const addResults = function (sched_id, voter_name, voter_cookie, vote)
 *
 * CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  schedule_id INTEGER REFERENCES schedules(id),
  voter_name VARCHAR(255) NOT NULL,
  voter_cookie VARCHAR(255) NOT NULL,
  vote VARCHAR(255) NOT NULL
 * @param {Date} date { day: '16', month: 'November', year: '2023', selected: 'true' }
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const addVotes = function (date_id, name, cookie, vote) {

  return db
  .query(`INSERT INTO votes (date_id, voter_name, voter_cookie, rank)
          VALUES ($1, $2, $3, $4)
          ;`, [date_id, name, cookie, vote])
  .then((result) => {
    //console.log('results add',result.rows[0])
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};


/**
 * USED BY SERVER -> not userqueries? seperate?
 *
 * get schdule id from database using url. load into html when given url?
 * @param {string} url
 * @return {Promise<{}>} A promise with schedule id given url
 *
 */
 const getSchedule = function (url) {

  return db
  .query(`SELECT id FROM schedules
          WHERE url LIKE ($1)
          ;`, [url])
  .then((result) => {
    console.log('schedule get?:',result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * USED BY SERVER -> not userqueries? seperate?
 *
 * get dates to create schedule given id.
 * @param {string} schedule_id
 * @return {Promise<{}>} A promise to the user.
 *
 */
 const getDates = function (schedule_id) {

  return db
  .query(`SELECT * FROM dates
          WHERE schedule_id = ($1)
          ;`, [schedule_id])
  .then((result) => {
    console.log('dates get?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * USED BY SERVER -> not userqueries? seperate?
 *
 * @param {string} url
 * @return {Promise<{}>} A promise with schedule id given url
 *
 */
 const getVotes = function (id) {

  return db
  .query(`SELECT * FROM votes
          WHERE schedule_id LIKE ($1)
          ;`, [id])
  .then((result) => {
    console.log('schedule get?:',result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

module.exports = {
  addUser, existingUser,
  addSchedule, getSchedule,
  addDates, getDates,
  addVotes, getVotes };
