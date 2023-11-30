//PUT INTO HELPER FIle???
//https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
//unused?
function generateRandomString(length) {
  const crypto = require("crypto");
  const id = crypto.randomBytes(length).toString('hex');
  return id;
}

//Javascript color scale from 0% to 100%, rendering it from red to yellow to green
//https://gist.github.com/mlocati/7210513
// maybe re consider https://stackoverflow.com/questions/30143082/how-to-get-color-value-from-gradient-by-percentage-with-javascript
function perc2color(perc) {
	var r, g, b = 0;
	if(perc < 50) {
		r = 255;
		g = Math.round(5.1 * perc);
	}
	else {
		g = 255;
		r = Math.round(510 - 5.10 * perc);
	}
	var h = r * 0x10000 + g * 0x100 + b * 0x1;
	return '#' + ('000000' + h.toString(16)).slice(-6);
}




module.exports = { generateRandomString, perc2color };

// loggedin
// req.cookies.cookieName;
