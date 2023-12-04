// secondary user.
// - given dates, secondary user selects ranked list to return
//    to primary user

$(() => {
  //date id to be sent to primary user once selected
  let date_id = null;
  let ranked_dates = [];

  //make date containers clickable, once click, give confirmation button
  $('.date-container').on('click', function(event) {
    event.preventDefault();

    //get internal data from button
    date_id = $(this).data("id")

    let date_html = $(this).html();
    //console.log('findingu:', date_id, date_html);

    $(this).toggleClass('selected');

    //check if selected of deselected. add or remove from data
    let theClass = $(this).attr('class');
    if (theClass.includes('selected')) {
      ranked_dates.push(date_id);
    } else {
      let ind = vals.indexOf(date_id);
      ranked_dates.splice(ind, 1);
    }

    //$('.popup').toggle("show"); toggle is smooth but less functional??
    $('.popup').css('display','flex');

    //REVISIT????
    // stringify date just in case?
    //accept date or no. cover other clickables/disable
    $('#popup-date').html(date_html);
  })

  //opportunity for optomization. if rank is attached to date id, BE wouldnt need to access db
  $('.accept').on('click', function(event) {
    event.preventDefault(); //necessary here?

    //user validation. seperate?
    let arr = window.location.pathname.split('/');
    let uniq_url = arr[arr.length - 1];

    let username = $("#voter-name").val().trim()
    if (username.length <= 0) {
      alert("please enter name")
    } else {
     //values are ranked by postion in
      $.ajax({
        method: "POST",
        url: `/secondary/${uniq_url}`,
        data: {vals: ranked_dates, name: username},
        success: function(data) {
          console.log('inside post success', data)
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('my error is : ' + errorThrown);
        }
      })
    }
  })

  $('.decline').on('click', function(event) {
    event.preventDefault();
    $('.popup').css('display','none');
  })

});
