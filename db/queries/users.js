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
 const addUser = function (username) {

  return db
  .query(`INSERT INTO users (name)
          VALUES ($1)
          RETURNING id;`, [username])
  .then((result) => {
    console.log('user add?:',result.rows[0].id);
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
  .query(`INSERT INTO schedules (user_id, url)
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
 const addDates = function (day, month, year, sched_id) {

  return db
  .query(`INSERT INTO dates (day, month, year, schedule_id)
          VALUES ($1, $2, $3, $4)
          ;`, [day, month, year, sched_id])
  .then((result) => {
    //console.log('date add?:',result.rows[0]); return nothing rn
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
          WHERE url = ($1)
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

module.exports = { addUser, addSchedule, addDates, getSchedule, getDates };