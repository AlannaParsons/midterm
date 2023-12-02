// primary user. (may move into schedule_FE)
// - given calendar - select and deselect dates to move into available event dates
// - FIX - inactive dates are clickable.
//        - ui for select and deselect
//        - ui for on submit

$(() => {
  let dates = [];

    //if <li class="inactive"> non clickable?????
  // get date of clicked, send to temp memory + add feedback to selected

  $('.date').on('click', function(event) {
    event.preventDefault();

    //get date info from html
    let [month, year] = $(".calendar-current-date").html().split(' ');
    let date_clicked = $(this).html()
    // convert to utc and add to dates array
    let stringdate = `${month} ${date_clicked}, ${year}`;
    let date = new Date(stringdate);
    dates.push(date.toUTCString())

    // do a toggle or something, this onlye works once
    //$(this).css('color','green');
    $(this).toggleClass("select");
  })

  $('#submit-schedule-button').on('click', (event) => {
    event.preventDefault();

    // create file for ajax?? add success & error handler
    $.ajax({
        method: "POST",
        url: "/primary/create",
        data: {dates: dates}
      })

  })
})
