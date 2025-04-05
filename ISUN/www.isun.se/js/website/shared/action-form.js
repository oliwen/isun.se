/*
  This tag is required on html page
  <form method="post" id="actionForm"></form>
*/

var submitForm = function (url) {
  $("#actionForm").prop("action", url);
  $("#actionForm").submit();
}

$(document).on("change", ".action-change", function () {
  submitForm($(this).data("href"));
});

$(document).on("click", ".action-click", function (e) {
  e.preventDefault();

  var url = $(this).prop("href");
  var confirmMessage = $(this).data("confirm");

  if(confirmMessage) {
    if(confirm(confirmMessage)) {
      submitForm(url);
    }
  }
  else {
    submitForm(url);
  }
});