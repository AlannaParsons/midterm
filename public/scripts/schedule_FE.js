// primary user.
// - aggrigate schedule
// - access to individual events and ability to go to results pages
// - go to create events page

$(() => {

// maybe put on nav bar?
    //send info back to primary user, add to schedule
  $('#new-schedule-button').on('click', function(event) {
    event.preventDefault(); //necessary here?

    const date_url = $(this).data("url")
    window.location.href = 'primary/create';
    // $.ajax({
    //   method: "POST",
    //   url: "/secondary",
    //   data: {accepted_date: date_id},
    //   success: function(data) {
    //     console.log('inside post success', data)
    //     //reconsider functionality AND url naming
    //     window.location.replace('/base');
    //   }
    //   //redirect upon post??? good practice?
    // })
  })

  $('.go-to-results-button').on('click', function(event) {
    event.preventDefault();

    const date_url = $(this).data("url")
    window.location.href = 'primary/' + date_url;
  })
})
