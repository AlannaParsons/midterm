let datesGlobal = [];

function loadDateClickers() {

  $('.date').on('click', function(event) {
    event.preventDefault();
    $(this).toggleClass("select");

    let theClass = $(this).attr('class');

    //get date info from html
    let [month, year] = $(".calendar-current-date").html().split(' ');
    let date_clicked = $(this).html()
    // convert to utc and add to dates array
    let stringdate = `${month} ${date_clicked}, ${year}`;
    let date = new Date(stringdate);



    if (theClass.includes('select')) {
      console.log('add to list')



      //utc or iso...
      datesGlobal.push(date.toUTCString())


      alert(stringdate);
    } else {
      console.log('remove from list')
      let ind = datesGlobal.indexOf(date.toUTCString());
      datesGlobal.splice(ind, 1);
    }

    console.log('globaldates:',datesGlobal)

  })

  return datesGlobal;
}

function autoSelectDates() {
  console.log('autoselectrun')
  let [calendarMonth, calendarYear] = $(".calendar-current-date").html().split(' ');
  let calendarDate = new Date(`${calendarMonth} 1,${calendarYear}`)

  for (let selectedDate of datesGlobal) {
    selectedDate = new Date(selectedDate);

    if (selectedDate.getUTCMonth() === calendarDate.getUTCMonth() &&
    selectedDate.getFullYear() === calendarDate.getFullYear()) {

      let listItems = $(".calendar-dates li");

      listItems.each(function(idx, li) {

        if (Number($(li).html()) === selectedDate.getUTCDate() ) {
          console.log('DATE FOUND', $(li).html(), selectedDate.getUTCDate() )
          $(li).toggleClass("select");
        }



    });

    }
  }

}

export {loadDateClickers, autoSelectDates, datesGlobal};
