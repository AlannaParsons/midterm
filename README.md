
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



USER STORIES
* As the primary user I want to select available days to send to    secondary user
* As the primary user I want to select available times of days to send to secondary user
* As secondary user I want to recieve available dates/times and be able to schedule these days/times with primary user

BUGS
- user can click days of previous month, but registers as current month (dont add click to class "invalid" days )

CURRENT

- file organization.
  - seperate frontend and backend helpers
  - split "userqueries", serverqueries??
  - do all routes need seperate files?
  - clean up example files
  - renames for consistancy (follow 'views' file naming convensions)
    - scss full screen/responsive naming? or seperate folder?

**- ADD functionality?
  - add time to dates as well
  - could we send to multiple people and aggrigate results? useful?s
  - add schedule event types (date, appointment, meal, etc.)

primary
  - calendar dates change color when selected (not deselected)
  - create date restriction on picker
  - attach id to data sent to secondary user to help identify secondary user when data returned??
secondary
  - error handling for invalid schedule url
  - user will click date, w cause popup (? maybe)
  - pop up will contain post button
  - once date is selected redirect to thank you page
  - how to return selected date to primary user
  - set up new page for this? complete schedule??
  - how to make dates clickable since they are rendered w ejs
      - OR move to script & render?
  - pass id back to primary to log date??
  - not started...

ADDRESS
  - typing. control data as it moves around. make plan for when date should be OBJ (in database) and when it should be DATE type (all server and front end use) TIME STAMP. make helpers