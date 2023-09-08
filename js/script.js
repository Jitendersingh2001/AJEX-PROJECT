$(document).ready(function () {
  let localdata = JSON.parse(localStorage.getItem("userdata"));
  if (localdata) {
    $("#username").val(localdata.user);
    $("#password").val(localdata.password);
  }
  $("#loginbtn").click(function (e) {
    e.preventDefault();
    if ($("#myform").valid()) {
      $.ajax({
        url: "https://dummyjson.com/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          username: $("#username").val(),
          password: $("#password").val(),
        }),
        success: function (data) {
          let userobject = {
            user: $("#username").val(),
            password: $("#password").val(),
          };
          sessionStorage.setItem("userdata", JSON.stringify(userobject));
          $redirect();
        },
        error: function (error) {
          $.toast({
            heading: "Error",
            text: "Username or Password Incorrect",
            showHideTransition: "slide",
            icon: "error",
          });
        },
      });
    }
    if ($("#Remember").prop("checked")) {
      let userobject = {
        user: $("#username").val(),
        password: $("#password").val(),
      };
      localStorage.setItem("userdata", JSON.stringify(userobject));
    }
  });
  $redirect = function () {
    window.location = "/html/table.html";
  };
});
