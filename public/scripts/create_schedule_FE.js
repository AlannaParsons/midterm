// primary user. (may move into schedule_FE)
// - given calendar - select and deselect dates to move into available event dates
// - FIX - inactive dates are clickable.
//        - ui for select and deselect
//        - ui for on submit
import {loadDateClickers} from "/modules/modules.js";
$(() => {

  loadDateClickers();

    //if <li class="inactive"> non clickable?????
  // get date of clicked, send to temp memory + add feedback to selected



  // $('.date').on('click', function(event) {
  //   event.preventDefault();

  //   //get date info from html
  //   let [month, year] = $(".calendar-current-date").html().split(' ');
  //   let date_clicked = $(this).html()
  //   // convert to utc and add to dates array
  //   let stringdate = `${month} ${date_clicked}, ${year}`;
  //   let date = new Date(stringdate);

  //   //utc or iso...
  //   dates.push(date.toUTCString())

  //   // do a toggle or something, this onlye works once
  //   //$(this).css('color','green');
  //   $(this).toggleClass("select");
  //   alert(stringdate);
  // })

  $('#submit-schedule-button').on('click', function(event) {
    event.preventDefault();

    //required field or prompt once? dont NEED event type
    let eventtype = $("#event-type").val().trim()
    if (eventtype.length <= 0) {
      alert("please enter event type")
    } else {
    //values are ranked by postion in
      $.ajax({
        method: "POST",
        url: "/primary/create",
        data: {dates: dates, eventType: eventtype},
        success: function(data) {
          console.log('inside post success', data)
          $('.toast').toast('show');

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('my error is : ' + errorThrown);
        }
      })

      //reset schedule
      dates.length = 0;
      //location.reload(calenar)

    }

  })
})
