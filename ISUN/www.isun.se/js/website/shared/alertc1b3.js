var hideCssAlert = function () {
	$("#alert").fadeOut();
}
var alertTimeout = -1;
var cssAlert = function (message, color) {
	$("#alert").hide();
	clearTimeout(alertTimeout);

	if (color == "error") {
		color = "red";
	}
	if (color == "warning") {
		color = "yellow";
	}
	if (color == "info") {
		color = "blue";
	}

	$("#alert .msg").removeClass("green").removeClass("red").removeClass("blue").removeClass("yellow");

	if (color) {
		$("#alert .msg").addClass(color)
	}
	else {
		$("#alert .msg").addClass("green")
	}
	if (message == "") {
		return;
	}
	$("#alert p").html(message);
	
	var showAlert = function () {
		$("#alert").css("bottom", "-50px");
		$("#alert").show();
		$("#alert").animate({
			bottom: '0'
		}, 600, function () {
			// Animation complete.
		});
	}

	setTimeout(showAlert, 100);

	if (color == "red") {
		alertTimeout = setTimeout(hideCssAlert, 15000);
	} else {
		alertTimeout = setTimeout(hideCssAlert, 5000);
	}

	$("#alert .cancel-icon").on('click', function () {
		hideCssAlert();
	});
}

