// the entire reason from the modules....
let datesGlobal = [];

  /**
 * loadDateClickers() -
 *  attach click events to individual calendar dates
 *  pushes and removes dates from datesGlobal as necessary
 *
 * may no longer need to be seperate module. move into calendar_FE??
 * holds similar process as invitee_FE break out into helpers?
 *
 * @return {datesGlobal}
 *  globaldates: ['Fri, 01 Dec 2023 07:00:00 GMT', etc...]
* */
function loadDateClickers() {

  $('.calendar-date').on('click', function(event) {
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
      //utc or iso...
      datesGlobal.push(date.toUTCString())
    } else {
      let ind = datesGlobal.indexOf(date.toUTCString());
      datesGlobal.splice(ind, 1);
    }
  })

  return datesGlobal;
}

  /**
 * autoSelectDates() -
 *  using dates from datesGlobal, set calendar dates as selected
 *  as user traverses through months
 *
 *  if month year of calendar matches item in globalDates, find corresponding date and toggle
 *
 * may no longer need to be seperate module. move into calendar_FE??
 *
 * @return {undefined}
* */
function autoSelectDates() {
  let [calendarMonth, calendarYear] = $('.calendar-current-date').html().split(' ');
  let calendarDate = new Date(`${calendarMonth} 1,${calendarYear}`)

  for (let selectedDate of datesGlobal) {
    selectedDate = new Date(selectedDate);

    if (selectedDate.getUTCMonth() === calendarDate.getUTCMonth() &&
    selectedDate.getFullYear() === calendarDate.getFullYear()) {

      let datesList = $(".calendar-dates li");

      datesList.each(function(idx, li) {
        if (Number($(li).html()) === selectedDate.getUTCDate() &&
        !($(li).attr('class').includes('inactive'))) {
          $(li).toggleClass('select');
        }
      });
    }
  }
}

export {loadDateClickers, autoSelectDates, datesGlobal};
