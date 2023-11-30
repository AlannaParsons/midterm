-- Drop and recreate Users table

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );

-- maybe change so that each schdule is its own occurrance???



DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS dates CASCADE;
DROP TABLE IF EXISTS votes CASCADE;

-- should schedules be array. possible? athena
CREATE TABLE schedules (
  id SERIAL PRIMARY KEY NOT NULL,
  user_cookie VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL

  -- max schedule length?

);

CREATE TABLE dates (
  id SERIAL PRIMARY KEY NOT NULL,
  schedule_id INTEGER REFERENCES schedules(id),
  utc VARCHAR(255) NOT NULL

);

-- what should vote be?. ranked? 0:date_id, 1:date_id. (use keys for weight -> reverse?)
CREATE TABLE votes (
  id SERIAL PRIMARY KEY NOT NULL,
  date_id INTEGER REFERENCES dates(id),
  voter_name VARCHAR(255) NOT NULL,
  voter_cookie VARCHAR(255) NOT NULL,
  rank INTEGER NOT NULL

);

