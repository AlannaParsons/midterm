// // Client facing scripts here
// rename -> nav?
//NEEDS TESTING


$(() => {
  let tempHold = null;

    // When the user scrolls down 30px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
      if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
        $('nav').slideUp('slow');
      } else {
        $('nav').slideDown('slow');
      }
    }

})

