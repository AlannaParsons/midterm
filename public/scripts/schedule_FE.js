// primary user. aggrigate schedule. add individual events and go to create event page

$(() => {
//   $('.accept').on('click', function(event) {
//     event.preventDefault(); //necessary here?
//     //send info back to primary user, add to schedule
//     //how to pull in date id?
//     $.ajax({
//       method: "POST",
//       url: "/secondary",
//       data: {accepted_date: date_id},
//       success: function(data) {
//         console.log('inside post success', data)
//         //data is html page
//         window.location.replace('/base');
//       }
//       //does ajax do success: ?
//       //redirect upon post??? good practice?


//     })
//   })
// maybe put on nav bar?
  $('.create').on('click', function(event) {
    event.preventDefault(); //necessary here?
    //send info back to primary user, add to schedule
    //how to pull in date id?
    $.ajax({
      method: "POST",
      url: "/secondary",
      data: {accepted_date: date_id},
      success: function(data) {
        console.log('inside post success', data)
        //data is html page
        window.location.replace('/base');
      }
      //does ajax do success: ?
      //redirect upon post??? good practice?


    })
  })

  $('#go-to-results-button').on('click', function(event) {
    event.preventDefault();
    //send info back to primary user, add to schedule
    //how to pull in date id?

    date_url = $(this).data("url")
    console.log('data url:?',date_url)
    // use ajax for redirect? or window.location.href = 'your_url';
    window.location.href = 'primary/' + date_url;

  })
})
