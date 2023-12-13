let datesGlobal = [];

function loadDateClickers() {

  $('.date').on('click', function(event) {
    event.preventDefault();

    //get date info from html
    let [month, year] = $(".calendar-current-date").html().split(' ');
    let date_clicked = $(this).html()
    // convert to utc and add to dates array
    let stringdate = `${month} ${date_clicked}, ${year}`;
    let date = new Date(stringdate);

    //utc or iso...
    datesGlobal.push(date.toUTCString())

    $(this).toggleClass("select");
    alert(stringdate);
  })

  return datesGlobal;
}

function autoSelectDates() {
  console.log('autoselectrun')
  let [calendarMonth, calendarYear] = $(".calendar-current-date").html().split(' ');
  let calendarDate = new Date(`${calendarMonth} 1,${calendarYear}`)

  for (let selectedDate of datesGlobal) {
    selectedDate = new Date(selectedDate);

    console.log('monyr:',calendarDate.getUTCMonth(), calendarDate.getFullYear(),'-', selectedDate.getUTCMonth(), typeof selectedDate.getFullYear())
    //console.log('selected:', selectedDate)

    if (selectedDate.getUTCMonth() === calendarDate.getUTCMonth() &&
    selectedDate.getFullYear() === calendarDate.getFullYear()) {
      console.log('MONTH YR MATCH ')

      //$( "calendar-dates.li" ).find( "" ).css( "background-color", "red" );
      var listItems = $(".calendar-dates li");

      listItems.each(function(idx, li) {

        //var product = $(li);
        if (Number($(li).html()) === selectedDate.getUTCDate() ) {
          console.log('DATE FOUND', $(li).html(), selectedDate.getUTCDate() )
          $(li).toggleClass("select");
        }


        // and the rest of your code
    });

      // for (let li of listItems) {

      //   let day = $(li).html();
      //   console.log('li:',li)
      //   if (day === selectedDate.getUTCDate()) {
      //     console.log('DATE FOUND')
      //     $(li).toggleClass("select");

      //   }
      // }
    }
  }

}

export {loadDateClickers, autoSelectDates};
