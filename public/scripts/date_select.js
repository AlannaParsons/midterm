// secondary user. given dates, secondary user selects one to return to primary user

$(() => {
  //date id to be sent to primary user once selected
  let date_id = null;

  //make date containers clickable, once click, give confirmation button
  $('.date-container').on('click', function(event) {
    event.preventDefault(); //necessary here?

   //give clicked date id
    date_id = $(this).data("id");
    // if we add other info to button.. no work (put into docs pls)
    let date_html = $(this).html();
    console.log('findingu:', date_id, date_html);
//   // initial click -> pop up (like) event, which contains button -> THIS will control 'post'

    //$('.popup').toggle("show"); toggle is smooth but less functional??
    $('.popup').css('display','flex');

    // stringify date just in case?
    //accept date or no. cover other clickables/disable
    $('#popup-date').html(date_html);



  })

  $('.accept').on('click', function(event) {
    event.preventDefault(); //necessary here?
    //send info back to primary user, add to schedule
    //how to pull in date id?
    $.ajax({
      method: "POST",
      url: "/",
      data: {accepted_date: date_id}
      //does ajax do success: ?
    })
    res.redirect('thanks');

  })

  $('.decline').on('click', function(event) {
    event.preventDefault(); //necessary here?
    //$('.popup').toggle("show");
    $('.popup').css('display','none');
  })






//     /**
//  * renderSchedule(data) - sends all tweet objects to the DOM
//  *
//  * move into load tweets logic????
//  * @param {array} data - array of objects
//  * @return {undefined}
//   * */
//   const renderSchedule = (data) => {



//     const $datesContainer = $('#dates-container')
//     helper(data);
//     for (let snglDay of data){
//       const $snglDay = createDateSkeleton(snglDay);


//       $datesContainer.append($snglDay);
//     }
//   }

//   renderSchedule()
//   //get rid of helper when we make decisions about database structure
//   // helper string -> obj (?) day: month: year:
//   // change dates so they occur in order or do w get
//   const helper = (data) => {
//     let split = data.split(',');
//     console.log(split);
  //}


});
