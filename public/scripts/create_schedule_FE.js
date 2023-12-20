// primary user. (may move into schedule_FE)
// - given calendar - select and deselect dates to move into available event dates
// - FIX -
//        - ui for on submit

import {datesGlobal} from "/modules/modules.js";
$(() => {

  $('#submit-schedule-button').on('click', function(event) {
    event.preventDefault();
    console.log('GLOBAL',datesGlobal)

    //required field or prompt once? dont NEED event type
    let eventtype = $("#event-type").val().trim()
    let description = $("#event-description").val().trim()
    if (eventtype.length <= 0) {
      alert("please enter event type")
    } else {
    //values are ranked by postion in
      $.ajax({
        method: "POST",
        url: "/primary/create",
        data: {dates: datesGlobal, eventType: eventtype, eventDescription: description},
        success: function(data) {
          window.location.href = '/primary';
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('my error is : ' + errorThrown);
        }
      })

      //reset schedule
      datesGlobal.length = 0;
      //location.reload(calenar)
      // also clear event type
    }

  })
})
