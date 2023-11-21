$(() => {



  const createDateSkeleton = (date) => {
    const $date = $(`
      <article class="date-container">
        <header>
          <span id="icon-name">
          </span>
          <span id="account"> ${date} </span>
        </header>
        <div class="content">
        </div>
        <footer>
          <span>${timeago.format(tweet.created_at, 'en_US')}</span>
          <span id="icons">
            <i class="fa-solid fa-heart"></i>
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-repeat"></i>
          </span>
        </footer>
      </article>
    `);

    return $date;
  };

    /**
 * renderSchedule(data) - sends all tweet objects to the DOM
 *
 * move into load tweets logic????
 * @param {array} data - array of objects
 * @return {undefined}
  * */
  const renderSchedule = (data) => {
    const $datesContainer = $('#dates-container')
    helper(data);
    for (let snglDay of data){
      const $snglDay = createDateSkeleton(snglDay);


      $datesContainer.append($snglDay);
    }
  }

  //get rid of helper when we make decisions about database structure
  // helper string -> obj (?) day: month: year:
  // change dates so they occur in order or do w get
  const helper = (data) => {
    let split = data.split(',');
    console.log(split);
  }


});
