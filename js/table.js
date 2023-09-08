$(document).ready(function () {
  const hasShownToast = sessionStorage.getItem("hasShownToast");
  let id;

  if (!hasShownToast) {
    $.toast({
      heading: "Success",
      text: "Login successful.",
      showHideTransition: "slide",
      icon: "success",
    });
    sessionStorage.setItem("hasShownToast", "true");
  }

  let localdata = JSON.parse(sessionStorage.getItem("userdata"));
  localStorage.setItem("userdata1", JSON.stringify(localdata));
  let localdata2 = JSON.parse(localStorage.getItem("userdata1"));
  $.ajax({
    url: "https://dummyjson.com/auth/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: localdata2.user,
      password: localdata2.password,
    }),
    success: function (data) {
      $(".profile-img").attr("src", data.image);
    },
  });

  /* data table start */
  let table = $("#myTable").DataTable();

  $.ajax({
    url: "https://dummyjson.com/products",
    type: "GET",
    data: {
      format: "json",
    },
    error: function () {
      console.log("error");
    },
    success: function (data) {
      // console.log(data.products);
      $buildTable(table, data.products);
    },
  });

  function $buildTable(table, data) {
    table.clear().draw();

    for (let i = 0; i < data.length; i++) {
      table.row
        .add([
          data[i].id,
          data[i].title,
          data[i].price,
          data[i].brand,
          data[i].category,
          data[i].rating,
          data[i].description,
          `
          <span class="material-symbols-outlined" id="detail">
          info
          </span>
          <span class="material-symbols-outlined" id="update" type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#upadteModalLabel">
          update
          </span>
          <span class="material-symbols-outlined" id="delete">
          delete
          </span>
          `,
        ])
        .draw();
    }
  }

  $("tbody").on("click", "#update", function () {
    id = $(this).closest("tr").find("td:first").text();
    $.ajax({
      url: `https://dummyjson.com/products/${id}`,
      type: "GET",
      data: {
        format: "json",
      },
      error: function () {
        console.log("error");
      },
      success: function (data) {
        $bulidUpdateForm(data);
      },
    });
  });

  function $bulidUpdateForm(data) {
    $("#Brand").val(data.brand);
    $("#Category").val(data.category);
    $("#Title").val(data.title);
    $("#Description").val(data.description);
    $("#DiscountPercentage").val(data.discountPercentage);
    $("#Price").val(data.price);
    $("#Rating").val(data.rating);
    $("#Stock").val(data.stock);
  }

  $(".modal-footer").on("click", "#edit-update-form", function () {
    $("#updateForm input").attr("disabled", false);
    $.toast({
      text: "Now you can edit the information",
      showHideTransition: "slide",
    });
  });

  $("#upadteModalLabel").on("hidden.bs.modal", function () {
    $("#updateForm input").attr("disabled", true);
  });
  $(".modal-footer").on("click", "#savebtn", function () {
    console.log("save");
    $.ajax({
      url: `https://dummyjson.com/products/${id}`,
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify({
        brand: $("#Brand").val(),
        category: $("#Category").val(),
        title: $("#Title").val(),
        description: $("#Description").val(),
        discountPercentage: $("#DiscountPercentage").val(),
        price: $("#Price").val(),
        rating: $("#Rating").val(),
        stock: $("#Stock").val(),
      }),
      success: function (data) {
        console.log(data);
      },
      error: function () {
        console.log("error");
      },
    });
  });
  $("#logout").click(function () {
    window.location.href = "/index.html";
    window.history.pushState({}, "", "http://127.0.0.1:5500/index.html"); //preventing to go back on previous page
  });
});
