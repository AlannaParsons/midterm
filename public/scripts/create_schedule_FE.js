// Client facing scripts here


$(() => {
  let dates = [];
  const $scheduleSubmit = $('#submit-schedule-button');

  // feedback when calendar date clicked. save for feedback & send
  function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
  }
    //if <li class="inactive"> non clickable?????
  // get date of clicked, send to temp memory + add feedback to selected
  // FIX?! do jquery?
  let calDates = document.getElementsByClassName("calendar-dates")[0];
  calDates.onclick = function(event) {
    let target = getEventTarget(event);
    //combine?
    let monthyear = document.getElementsByClassName("calendar-current-date")[0];
    let [month, year] = monthyear.innerHTML.split(' ');

    //  // convert "date string" into "date object"
    // does string layout matter?? turning into date
        let stringdate = `${month} ${target.innerHTML}, ${year}`;

        var date = new Date(stringdate);

    dates.push(date.toUTCString())
    //strong components -> date -> utc
    console.log('date:', date.toUTCString())
    //alert()

    //PUSH UTC TO LIST
        //Date.UTC(year, monthIndex, day, hour, minute, second, millisecond)

      // var isoDateString = new Date().toISOString();
      // console.log(isoDateString);
      // d.toUTCString();


    target.setAttribute("style", "color: green;");
  };

//then give user unique url to send
  $scheduleSubmit.on('click', (event) => {
    event.preventDefault();

    //dates is currently an array of date obj

    // create file for ajax??
    $.ajax({
        method: "POST",
        url: "/primary/create",
        data: {dates: dates}
      })
      //untested
      //.then ($('#schedule-submit-form')).trigger("reset");


  })






  /*******EXAMPLE OF HIDDEN FORM. USE LATER?
  const $newTweetAccess = document.querySelector('#new-tweet-button');

  $newTweetAccess.addEventListener('click', function (event) {
    event.preventDefault();
    const $tweetForm = document.querySelector('#tweet-form');

    $tweetForm.style.display = $tweetForm.style.display === 'flex' ? 'none' : 'flex';

  })
  //*******EXAMPLE OF HIDDEN FORM. USE LATER? */

})
