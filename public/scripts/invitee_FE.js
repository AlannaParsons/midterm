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

    //still want this??
    $(this).toggleClass('selected');

    //check if selected of deselected. add or remove from data
    let theClass = $(this).attr('class');

//if i add color representation of ranks, it will be an array of hex
    if (theClass.includes('selected')) {
      ranked_dates.push(date_id); //add id to list to be returned

      //clone clicked elem, add to seperate list, ajust css
      let clone = $(this).clone(true);
      $('#ranked-choices').append(clone);
      clone.find('.triangle-left').hide();
      clone.find('.triangle-right').show();

      $(this).toggle()  //remove from original list

    } else {

      //remove from list to be returned
      let ind = ranked_dates.indexOf(date_id);
      ranked_dates.splice(ind, 1);

      //find original from copied elem, toggle back on original
      $('#dates-container').children().each(function () {
        if ($(this).data("id") === date_id) {
          $(this).toggle()
          $(this).toggleClass('selected');
        }
      })

      $(this).remove()  //remove from ranked list
    }

    // change name? TURNERY
    //send info button only available when user has given answer
    if (ranked_dates.length === 0) {
      $('.popup').css('display','none');
    } else {
      $('.popup').css('display','flex');
    }

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
        data: {dates: ranked_dates, name: username},
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


