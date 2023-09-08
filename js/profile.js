$(document).ready(function () {
  let userdata = JSON.parse(sessionStorage.getItem("userdata"));
  $.ajax({
    url: "https://dummyjson.com/auth/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: userdata.user,
      password: userdata.password,
    }),
    success: function (data) {
      $("#user-img").attr("src", data.image);
      $("#FullName").text(data.firstName + " " + data.lastName);
      $("#firstName").text(data.firstName);
      $("#lastName").text(data.lastName);
      $("#email").text(data.email);
      $("#username").text(data.username);
      $("#gender").text(data.gender);
    },
  });
});
