//PUT INTO HELPER FIle???
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function generateRandomString(length) {
  const crypto = require("crypto");
  const id = crypto.randomBytes(length).toString('hex');
  return id;
}

module.exports = { generateRandomString };
