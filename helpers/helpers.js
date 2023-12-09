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
// function perc2color(perc) {
// 	var r, g, b = 0;
// 	if(perc < 50) {
// 		r = 255;
// 		g = Math.round(5.1 * perc);
// 	}
// 	else {
// 		g = 255;
// 		r = Math.round(510 - 5.10 * perc);
// 	}
// 	var h = r * 0x10000 + g * 0x100 + b * 0x1;
// 	return '#' + ('000000' + h.toString(16)).slice(-6);
// }

var gradient = [
  [
      -1,
      //og//[255, 97, 97]
      [240, 115, 98]

  ],
  [
      49.24,
      //og[165, 187, 103]
      //[222, 207, 69]
      [240, 226, 98]
  ],
  [
      101,
      //[og62, 178, 33]

      [150, 201, 91]
  ]
];
//ui.value => given weight/percentage

//https://jsfiddle.net/jozp71tg/
function percentageToColor(percentage) {
  var colorRange = []
  console.log('percentage: ', percentage);
  gradient.forEach(( value, index ) => {
      if(percentage>=value[0]) {
        console.log('val',value, index, gradient[index])
          colorRange = [index,index+1]

          return false;
      }
    });

  //Get the two closest colors
  let sliderWidth = 200;
  var firstcolor = gradient[colorRange[0]][1];
  var secondcolor = gradient[colorRange[1]][1];

  //Calculate ratio between the two closest colors
  var firstcolor_x = sliderWidth*(gradient[colorRange[0]][0]/100);
  var secondcolor_x = sliderWidth*(gradient[colorRange[1]][0]/100)-firstcolor_x;
  var slider_x = sliderWidth*(percentage/100)-firstcolor_x;
  var ratio = slider_x/secondcolor_x;

  //Get the color with pickHex(thx, less.js's mix function!)
  var result = getRGB( secondcolor,firstcolor, ratio );

  return rgbToHex(...result)

};

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRGB(color1, color2, weight) {
  var p = weight;
  var w = p * 2 - 1;
  var w1 = (w/1+1) / 2;
  var w2 = 1 - w1;
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)];
  return rgb;
}




module.exports = { generateRandomString, percentageToColor };

// loggedin
// req.cookies.cookieName;
