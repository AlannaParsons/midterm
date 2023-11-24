//https://stackoverflow.com/questions/16209145/how-can-i-set-cookie-in-node-js-using-express-framework
// access w cookieName

function cookieMiddleware(req, res, next) {
  console.log('cookie middleware');
  // check if client sent cookie
  const cookie = req.cookies.cookieName;
  if (cookie === undefined) {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('cookieName',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present
    console.log('cookie exists', cookie);
  }
  next();
}

module.exports = { cookieMiddleware }
