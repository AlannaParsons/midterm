
=========

## Project
with LHL Node Skeleton from Lighthouse Labs

This is a scheduling app where in a primary user will set their schedule (for specific use case or have long term schedule) the schedule will generate a unique url to be sent to a secondary user (automate? twilio? contact list?). The secondary user can pick from available dates/times, currently this info will be sent back to the primary user and added to their local schedule (notifications?) ideally we will eventually integrate w google calendar (apple?)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
  - username: `labber`
  - password: `labber`
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Warnings & Tips

- Do not edit the `layout.css` file directly, it is auto-generated by `layout.scss`.
- Split routes into their own resource-based file names, as demonstrated with `users.js` and `widgets.js`.
- Split database schema (table definitions) and seeds (inserts) into separate files, one per table. See `db` folder for pre-populated examples.
- Use helper functions to run your SQL queries and clean up any data coming back from the database. See `db/queries` for pre-populated examples.
- Use the `npm run db:reset` command each time there is a change to the database schema or seeds.
  - It runs through each of the files, in order, and executes them against the database.
  - Note: you will lose all newly created (test) data each time this is run, since the schema files will tend to `DROP` the tables and recreate them.

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x

Calendar -
https://www.geeksforgeeks.org/how-to-design-a-simple-calendar-using-javascript/
color gradient -
https://gist.github.com/mlocati/7210513




## USER STORIES
* As the primary user I want to select available days to send to    secondary user
* As the primary user I want to select available times of days to send to secondary user
* As secondary user I want to recieve available dates/times and be able to schedule these days/times with primary user


primary user -> make schedule
primary user -> see all schedules
primary user -> send schedule via 3rd party
secondary user -> recieve schedule date options
secondary user -> rank options & send to primary user -> recieved schedules options in ranked formation, ranked by secondary user votes

## BUGS


## CURRENT

- file organization.
  - seperate frontend and backend helpers
  - split "userqueries", serverqueries??
    - scss full screen/responsive naming? or seperate folder?

primary

  -should we prevent primary user from voting?
  - results ejs - length of bar determined by % of votes given. intheory 0% will squish content but it doesnt... future implications? why does this work
  - once html inside date bars change, should fix bar being larger than triangle bug
  - could change date type to drop down
  - maybe take hover off inactive dates (on create calendar)

secondary
  - error handling for invalid schedule url
  - check if user primary (primary cannot vote) => dif page?
  - change addVotes to batching system to avoid errors

  - focusing on mobile dev, create full screen layouts
    - may add calendar to full screen to fill space


## ADDRESS

  - if sending to multiple people, how do we knpw when pole is over?
    must hold results, add to database. expiry?? expiry set by last possible date of schedule or first
  - could use internal calendar of phones?
FEATURES
  (add notes to top description?)
  -- ranks are weighted by amount of dates in schedule
  -happy path complete, add all error handling
  - add try catch for async db calls
  - add more security. no current BE protection?

## Considerations for future dev
  - create schedule event type input could change to drop down for ease
  - add expiry date (cannot vote past dates given?)
  -currently not handling timezones, dates stored in UTC
  - add time to dates as well
  - add created date to events

## Stack Requirements
Your projects must use:

ES6 for server-side (NodeJS) code
NodeJS
Express
RESTful routes
One or more CSS or UI "framework"s:
jQuery
A CSS preprocessor such as SASS, Stylus, or PostCSS for styling -- or CSS Custom properties and no CSS preprocessor
PostgreSQL and pg (with promises) for DBMS
git for version control

Option 9: Schoodle
Doodle is great for scheduling events within a group. Your job is to create a simpler, more modern version of it.

Requirements:
visitors can create an event proposal in much the same way as Doodle, by specifying:
event title and description
their own name and email
organizers can then send the unique URL to possible attendees via their own communication workflow (email, Slack, Messenger, etc.)
attendees visit the unique URL and:
specify their name and email
specify their availability (yes/no only) for each possible time slot
view all responses including their own
modify their response
the unique URL should be secret and thus not use a simple auto-incrementing integer but instead a larger ID that is harder to guess (much like how secret gists work on GitHub)
note: this app does not follow the typical user authentication process: users don't need to register or log in and the only way to access the Schoodles is via links


