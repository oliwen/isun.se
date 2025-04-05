var keepAlive = function () {
	$.ajax({
		type: "GET",
		url: "/" + teamName + "/session"
	});
}

// Ping every 10 minutes
setInterval(keepAlive, 1000 * 60 * 10);

