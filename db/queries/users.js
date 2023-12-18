const db = require('../connection');

//SELECT GETUTCDATE();

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
 const addSchedule = function (user, url, type) {

  return db
  .query(`INSERT INTO schedules (user_cookie, url, type)
          VALUES ($1, $2, $3)
          RETURNING id;`, [user, url, type])
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
 const addVotes = function (date_id, voter_id, vote) {

  return db
  .query(`INSERT INTO votes (date_id, voter_id, rank)
          VALUES ($1, $2, $3)
          ;`, [date_id, voter_id, vote])
  .then((result) => {
    //console.log('results add',result.rows[0])
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * addVoter() - add voter to db
 *
 * @param {Strings} name, cookie
 * @return {Promise<{}>}
 *    id of created voter
 */
  const addVoter = function (name, cookie) {

    return db
    .query(`INSERT INTO voters (name, cookie)
            VALUES ($1, $2)
            RETURNING id
            ;`, [name, cookie])
    .then((result) => {
      console.log('add voter',result.rows[0])
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });

  };


/**
 * getSchedule() - get specific schedule by given url
 *
 * @param {string} url
 * @return {Promise<{}>}
 *  recieve id and type
 *
 */
 const getSchedule = function (url) {

  return db
  .query(`SELECT id, type FROM schedules
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
 *
 * @param {string} userCookie
 * @return {Promise<{}>}
 *  get all schedules made by given user:
 *    schedules.id, url, type, voter_count
 *
 */
 const getScheduleByUser = function (userCookie) {

  return db
  .query(`SELECT schedules.id, url, type, COUNT(DISTINCT votes.voter_id) AS voter_count FROM schedules
          LEFT JOIN dates ON schedules.id = dates.schedule_id
          LEFT JOIN votes ON dates.id = votes.date_id
          WHERE user_cookie LIKE ($1)
          GROUP BY schedules.id
          ;`, [userCookie])
  .then((result) => {
    console.log('schedules get?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 * UNUSED?
 * get schdule id from database using url. load into html when given url?
 * @param {string} id
 * @return {Promise<{}>}
 *
 *
 */
 const joinScheduleDates = function (id) {

  return db
  .query(`SELECT
          dates.id AS date_id, user_cookie, url, schedule_id, utc
          FROM schedules
          JOIN dates ON schedules.id = dates.schedule_id
          WHERE schedule_id = ($1)
          ;`, [id])
  .then((result) => {
    //console.log('schedules w join?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *  dates from included in given schedule
 *    in proper date order
 *
 */
 const getDates = function (schedule_id) {

  return db
  .query(`SELECT * FROM dates
          WHERE schedule_id = ($1)
          ORDER BY dates.utc
          ;`, [schedule_id])
  .then((result) => {
    //console.log('dates get?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};


/**
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *  dates for given schedule (.utc, .id, .schedule_id ),  as well as
 *  sumed rankings which are used to tabulate final ranked results
 *
 * left outer join??? revisit
 * so ugly..... can i alias COALESCE(SUM(votes.rank), '0') sooner??
 * double check later that schedule id is filtering on both levels
 */
 const getResults = function (schedule_id) {

  return db
  .query(`
          SELECT COALESCE(SUM(votes.rank), '0') AS rank_sum, dates.utc,
            dates.id AS dateid, dates.schedule_id,
            (COALESCE(SUM(votes.rank), '0')* 100/t.total ) AS percentage
            FROM ((SELECT SUM(rank) as total
              FROM votes
              LEFT OUTER JOIN dates ON dates.id = votes.date_id
              WHERE dates.schedule_id = ($1))) AS t,
           dates
          LEFT OUTER JOIN votes ON dates.id = votes.date_id
          WHERE schedule_id = ($1)
          GROUP BY dates.schedule_id, dates.id, t.total
          ORDER BY COALESCE(SUM(votes.rank), '0') DESC
          ;`, [schedule_id])
  .then((result) => {
    //console.log('tesst votes get?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

//we know this works before changing the db
// const getResults = function (schedule_id) {

//   return db
//   .query(`
//           SELECT COALESCE(SUM(votes.rank), '0') AS rank_sum, dates.utc,
//             dates.id AS dateid, dates.schedule_id,
//             (COALESCE(SUM(votes.rank), '0')* 100/t.total ) AS percentage
//             FROM ((SELECT SUM(rank) as total
//               FROM votes
//               LEFT OUTER JOIN dates ON dates.id = votes.date_id
//               WHERE dates.schedule_id = ($1))) AS t,
//            dates
//           LEFT OUTER JOIN votes ON dates.id = votes.date_id
//           WHERE schedule_id = ($1)
//           GROUP BY dates.schedule_id, dates.id, t.total
//           ORDER BY COALESCE(SUM(votes.rank), '0') DESC
//           ;`, [schedule_id])
//   .then((result) => {
//     //console.log('tesst votes get?:',result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// };

/**
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *  all voters names who have voted on given schedule
 */
 const getVoters = function (schedule_id) {

  return db
  .query(`SELECT name FROM voters
          JOIN votes ON votes.voter_id = voters.id
          JOIN dates ON dates.id = votes.date_id
          WHERE dates.schedule_id = ($1)
          GROUP BY name
          ;`, [schedule_id])
  .then((result) => {
    //console.log('tesst votes get?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};

/**
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *    number of people who have voted on given schedule
 */
 const getVoterCount = function (schedule_id) {

  return db
  .query(`SELECT COUNT(DISTINCT voter_id) FROM votes
          JOIN dates ON dates.id = votes.date_id
          WHERE dates.schedule_id = ($1)
          ;`, [schedule_id])
  .then((result) => {
    //console.log('get number of voters per?:',result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });

};


// /**
//old version, doesnt pull percentage. still needd?
//  * USED BY SERVER -> not userqueries? seperate?
//  *
//  * @param {string} url
//  * @return {Promise<{}>} A promise with schedule id given url
//  * SELECT, FROM/JOIN, WHERE, GROUP BY, HAVING, ORDER BY, then LIMIT)
//  */
//  const getVotes = function (schedule_id) {

//   return db
//   .query(`SELECT dates.id AS datesid, schedules.id AS schedids, SUM(votes.rank)
//            results FROM dates
//           JOIN votes ON dates.id = votes.date_id
//           JOIN schedules ON schedules.id = dates.schedule_id
//           WHERE schedule_id = ($1)
//           GROUP BY schedules.id, dates.id
//           ;`, [schedule_id])
//   .then((result) => {
//     console.log('votes get?:',result.rows[0]);
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// };

module.exports = {
  addUser, existingUser,
  addSchedule, getSchedule, getScheduleByUser, joinScheduleDates,
  addDates, getDates,
  addVotes, addVoter, getResults, getVoters, getVoterCount };
