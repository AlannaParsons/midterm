/*
  home_FE.js

  primary user gives user info (not real login)
  future dev - provide info for secondary user also

*/

$(() => {

  $('#submit-user').on('submit', function(event) {
    event.preventDefault();

    //required field or prompt once? dont NEED event type
    let userName = $("#userName").val().trim()
    let inputEmail = $("#inputEmail").val().trim()

    console.log(userName,inputEmail)

    if (userName.length <= 0 || inputEmail.length <= 0) {
      alert("please enter valid identification")
    } else {

      $.ajax({
        method: "POST",
        url: "/",
        data: {userName: userName, inputEmail: inputEmail},
        success: function(data) {
          console.log('inside post success', data)
          window.location.href = 'primary';

        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
          console.log('my error is : ' + errorThrown);
        }
      })

    }

  })

})
