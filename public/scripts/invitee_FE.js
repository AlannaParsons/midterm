// secondary user.
// - given dates, secondary user selects ranked list to return
//    to primary user

$(() => {
  //date id to be sent to primary user once selected
  let date_id = null;
  let ranked_dates = [];

  //$('.delete').live('click', function() { });
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
      console.log('move selected to selected list')
      ranked_dates.push(date_id);
      $('#ranked-choices').append($(this).clone(true));
      $(this).toggle()
    } else {
      let ind = ranked_dates.indexOf(date_id);
      ranked_dates.splice(ind, 1);
      console.log('move selected to non',$('#dates-container'))
      $('#dates-container').children().each(function () {
        if ($(this).data("id") === date_id) {
          console.log('found original date to')
          $(this).toggle()
          $(this).toggleClass('selected');

        }
      })
      console.log(date_id)

      //$('#ranked-choices').remove($(this));
      $(this).remove()
      //then toggle orginal version on. fin dwith id?

    }

    //reload ranked choice list after click


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

});


