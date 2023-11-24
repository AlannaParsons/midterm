-- Drop and recreate Users table

-- DROP TABLE IF EXISTS users CASCADE;
-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL
-- );

-- maybe change so that each schdule is its own occurrance???



DROP TABLE IF EXISTS schedules CASCADE;
DROP TABLE IF EXISTS dates CASCADE;


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


