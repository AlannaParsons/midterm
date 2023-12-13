let datesGlobal = [];

function loadDateClickers() {

  console.log('loading clickers');

  $('.date').on('click', function(event) {
    event.preventDefault();

    console.log('on click',datesGlobal)

    //get date info from html
    let [month, year] = $(".calendar-current-date").html().split(' ');
    let date_clicked = $(this).html()
    // convert to utc and add to dates array
    let stringdate = `${month} ${date_clicked}, ${year}`;
    let date = new Date(stringdate);

    //utc or iso...
    datesGlobal.push(date.toUTCString())

    // do a toggle or something, this onlye works once
    //$(this).css('color','green');
    $(this).toggleClass("select");
    alert(stringdate);
  })

  return datesGlobal;
}

export {loadDateClickers};
