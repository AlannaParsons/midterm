const db = require('../connection');

/**
 * addSchedule(user, url, type) - Primary user adds a new schedule data to the database
 *
 * @param {strings} user, url, type
 * @return {Promise<{}>} A promise to the user.
 *    id of created schedule
 */
 const addSchedule = function (user, url, type) {

  return db
  .query(`INSERT INTO schedules (user_cookie, url, type)
          VALUES ($1, $2, $3)
          RETURNING id;`, [user, url, type])
  .then((result) => {
    return result.rows[0].id;
  })
  .catch(() => {
    throw new Error('Error adding schedule')
  });

};

/**
 * addDates(date, sched_id)
 *
 * expected to be called in for loop to add all dates to given schedule
 * @param {string, number} utc, sched_id
 * @return {Promise<{}>} Nothing useful. change?
 *
 */
 const addDates = function (utc, sched_id) {

  return db
  .query(`INSERT INTO dates (utc, schedule_id)
          VALUES ($1, $2)
          ;`, [utc, sched_id])
  .then((result) => {
    return result.rows[0];
  })
  .catch(() => {
    throw new Error('Error adding dates')
  });

};

/**
 * const addVotes(date_id, voter_id, vote)
 *
 * @param {numbers} date_id, voter_id, vote
 * @return {Promise<{}>} Nothing useful. change?
 *
 */
 const addVotes = function (date_id, voter_id, vote) {

  return db
  .query(`INSERT INTO votes (date_id, voter_id, rank)
          VALUES ($1, $2, $3)
          ;`, [date_id, voter_id, vote])
  .then((result) => {
    return result.rows[0];
  })
  .catch(() => {
    throw new Error('Error adding votes')
  });

};

/**
 * addVoter() - add voter to db
 *
 * @param {Strings} name, cookie
 * @return {Promise<{}>}  id of created voter
 */
  const addVoter = function (name, cookie) {

    return db
    .query(`INSERT INTO voters (name, cookie)
            VALUES ($1, $2)
            RETURNING id
            ;`, [name, cookie])
    .then((result) => {
      return result.rows[0];
    })
    .catch(() => {
      throw new Error('Error adding voter')
    });
  };


/**
 * getSchedule(url) - get specific schedule by given url
 *
 * @param {string} url
 * @return {Promise<{}>}
 *  recieve id and type
 *
 */
 const getScheduleByURL = function (url) {

  return db
  .query(`SELECT id, type FROM schedules
          WHERE url LIKE ($1)
          ;`, [url])
  .then((result) => {
    return result.rows[0];
  })
  .catch(() => {
    throw new Error('Error getting schedule url')
  });

};

/**
 * getScheduleByUser(userCookie) - get all schedules made by given user
 *
 * @param {string} userCookie
 * @return {Promise<{}>}
 *    [{schedules.id, url, type, voter_count}...]
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
    return result.rows;
  })
  .catch(() => {
    throw new Error('Error getting schedule user')
  });

};

/**
 * getDates(schedule_id) - get all dates from given schedule id
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *  [{id, schedule_id, utc}...]
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
    return result.rows;
  })
  .catch(() => {
    throw new Error('Error getting dates')
  });

};


/**
 * getResults(schedule_id) - get all aggrigate results for schedule given id
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 * [{ rank_sum: '7',
    utc: 2023-11-12T07:00:00.000Z,
    dateid: 2,
    schedule_id: 1,
    percentage: '38'}...]
 *
 *  sumed rankings which are used to tabulate final ranked results
 *
 * left outer join??? revisit
 * so ugly..... can i alias COALESCE(SUM(votes.rank), '0') sooner??
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
    return result.rows;
  })
  .catch(() => {
    throw new Error('Error getting results')
  });

};

/**
 * getVoters(schedule_id) - all voters names who have voted on given schedule
 *
 * @param {number} schedule_id
 * @return {Promise<{}>}
 *  * [{ name: , cookie: }...]
 */
 const getVoters = function (schedule_id) {

  return db
  .query(`SELECT name, cookie FROM voters
          JOIN votes ON votes.voter_id = voters.id
          JOIN dates ON dates.id = votes.date_id
          WHERE dates.schedule_id = ($1)
          GROUP BY name, cookie
          ;`, [schedule_id])
  .then((result) => {
    return result.rows;
  })
  .catch(() => {
    throw new Error('Error getting voters')
  });

};

/**
 * getVoterCount(schedule_id) - number of people who have voted on given schedule
 *
 * @param {number} schedule_id
 * @return {Promise<{}>} number
 */
 const getVoterCount = function (schedule_id) {

  return db
  .query(`SELECT COUNT(DISTINCT voter_id) FROM votes
          JOIN dates ON dates.id = votes.date_id
          WHERE dates.schedule_id = ($1)
          ;`, [schedule_id])
  .then((result) => {
    return result.rows;
  })
  .catch(() => {
    throw new Error('Error getting results')
  });

};

module.exports = {
  addVoter, getVoters, getVoterCount,
  addSchedule, getScheduleByURL, getScheduleByUser,
  addDates, getDates,
  addVotes,  getResults };
