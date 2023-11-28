// secondary user. given dates, secondary user selects one to return to primary user

$(() => {
  //date id to be sent to primary user once selected
  let date_id = null;
  let click_count = 0;
  let vals = [];
  //let ranked_dates = [];

  //make date containers clickable, once click, give confirmation button
  $('.date-container').on('click', function(event) {
    event.preventDefault(); //necessary here?

    click_count +=1;

   //give clicked date id
    //date_id = {[$(this).data("id")]: click_count};
    date_id = $(this).data("id")
    // if we add other info to button.. no work (put into docs pls)
    let date_html = $(this).html();
    console.log('findingu:', date_id, date_html);
//   // initial click -> pop up (like) event, which contains button -> THIS will control 'post'
    //(this).removeAttr("selected")
    //$(this).attr("selected","selected")

    $(this).toggleClass('selected');
    //check if selected of deselected. add or remove from data
    let theClass = $(this).attr('class');
    if (theClass.includes('selected')) {
      vals.push(date_id);
    } else {
      let ind = vals.indexOf(date_id);
      vals.splice(ind, 1);
    }


    //getValues();
    //console.log('vals', vals)



    //ranked_dates.push(date_id);
    //$('.popup').toggle("show"); toggle is smooth but less functional??
    $('.popup').css('display','flex');

    // stringify date just in case?
    //accept date or no. cover other clickables/disable
    $('#popup-date').html(date_html);



  })

  //opportunity for optomization. if rank is attached to date id, BE wouldnt need to access db
  $('.accept').on('click', function(event) {
    event.preventDefault(); //necessary here?
    //send info back to primary user, add to schedule
    //create "ranked" functionality

    // $('.dates-container .date-container').each( function() {
    //   console.log('b4',$(this).data('id'))
    //   if (!$(this).attr('class').includes('selected')) {
    //     console.log('NOT INCLUDED',$(this).data('id'))

    //   }
    //   //values.push($(this).data('id'));
    // })

      console.log('vals', vals)

    //check name form here?
    //document.getElementById("edName").required = true;
    //user validation. seperate?
    let arr = window.location.pathname.split('/')
    let uniq_url = arr[arr.length - 1]
    console.log('uniq?!',uniq_url)
    // to string? .val() unsure
    let username = $("#voter-name").val().trim()
    if (username.length <= 0) {
      alert("please enter name")
    } else {

     //values are ranked by postion in
      $.ajax({
        method: "POST",
        url: `/secondary/${uniq_url}`,
        data: {vals: vals, name: username},
        success: function(data) {
          console.log('inside post success', data)
          //send to thank you page OR results page. secondary doesnt need results?
          // put back after testing
          //window.location.replace('/base');
        }
      })
    }
  })

  $('.decline').on('click', function(event) {
    event.preventDefault(); //necessary here?
    //$('.popup').toggle("show");
    $('.popup').css('display','none');
  })

  // <section id="middle-bar">
  // <div class="dates-container">
  //   <% for (let date of dates) { %>
  //     <button data-id="<%= date.id %>" class="date-container" name="container">

//helper. move out
  function getValues() {
    var values = [];
    $('.dates-container .selected').each( function() {
           values.push($(this).data('id'));
    });

    return values;
}


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
