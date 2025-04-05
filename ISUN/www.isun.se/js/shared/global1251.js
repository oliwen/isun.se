// Svelag helper methods
var _svelag = {
	// returns a copy of the object
	deepCopy: function (item) {
		return JSON.parse(JSON.stringify(item));
	},
	allSelected: function (list) {
		for (var i in list) {
			if (!list[i].selected && !list[i].disabled)
				return false;

			if (list[i].guardians) {
				var val = this.allSelected(list[i].guardians)

				if (!val) {
					return false;
				}
			}
		}
		return true;
	},
	selectAll: function (list) {
		for (var i in list) {
			if (!list[i].disabled) {
				list[i].selected = true;
			}

			if (list[i].guardians) {
				this.selectAll(list[i].guardians);
			}
		}
	},
	deselectAll: function (list) {
		for (var i in list) {
			list[i].selected = false;

			if (list[i].guardians) {
				this.deselectAll(list[i].guardians);
			}
		}
	},
	getSelectedIdsString: function (list) {
		var ids = "";
		for (var i in list) {
			if (list[i].selected) {
				ids += list[i].id + ",";
			}
			if (list[i].guardians) {
				ids += this.getSelectedIdsString(list[i].guardians);
			}
		}
		return ids;
	},
	getSelectedIds: function (list, alreadyCountedIds) {
		var ids = [];
		var countedIds = alreadyCountedIds || {}
		for (var i in list) {
			if (list[i].selected) {
				if (!countedIds[list[i].id]) {
					ids.push(list[i].id);
					countedIds[list[i].id] = true;
				}
			}
			if (list[i].guardians) {
				var guardianIds = this.getSelectedIds(list[i].guardians, countedIds);
				for (var j in guardianIds) {
					ids.push(guardianIds[j]);
				}
			}
		}
		return ids;
	},
	getSelectedCount: function (list, alreadyCountedIds) {
		var count = 0;
		var countedIds = alreadyCountedIds || {}
		for (var i in list) {
			if (list[i].selected) {
				if (list[i].id) {
					if (!countedIds[list[i].id]) {
						count++;
						countedIds[list[i].id] = true;
					}
				}
				else {
					count++;
				}
			}

			if (list[i].guardians) {
				count += this.getSelectedCount(list[i].guardians, countedIds);
			}
		}
		return count;
	},
	getSelectedUsersWithoutEmailCount: function (list, alreadyCountedIds) {
		var count = 0;
		var countedIds = alreadyCountedIds || {}
		for (var i in list) {
			if (list[i].selected) {
				if (list[i].id) {
					if (!list[i].hasEmail) {
						if (!countedIds[list[i].id]) {
							count++;
							countedIds[list[i].id] = true;
						}
					}
				}
				else {
					count++;
				}
			}

			if (list[i].guardians) {
				count += this.getSelectedUsersWithoutEmailCount(list[i].guardians, countedIds);
			}
		}
		return count;
	},
	getListItemCount: function (list, alreadyCountedIds) {
		var count = 0;
		var countedIds = alreadyCountedIds || {}
		for (var i in list) {
			if (!list[i].disabled) {
				if (list[i].id) {
					if (!countedIds[list[i].id]) {
						count++;
						countedIds[list[i].id] = true;
					}
				}
				else {
					count++;
				}
			}

			if (list[i].guardians) {
				count += this.getListItemCount(list[i].guardians, countedIds);
			}
		}
		return count;
	},
	plural: function (value, singularValue, pluralValue) {
		return value == 1 ? singularValue : pluralValue;
	},
	isValidDate(dateString) {
		var regEx = /^\d{4}-\d{2}-\d{2}$/;
		if (!dateString.match(regEx)) return false;  // Invalid format
		var d = new Date(dateString);
		var dNum = d.getTime();
		if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
		return d.toISOString().slice(0, 10) === dateString;
	}
}

$.ajaxSetup({
	// Disable caching of AJAX responses
	cache: false
});
//$.datepicker.setDefaults($.datepicker.regional["sv"]);

// ------------------------------------------
// Popups
$(document).on("click", ".popup-box", function (e) {
	//e.preventDefault();
	e.stopPropagation();
});
$(document).on("click", ".close-x,.close-popup,.popup-wrap", function (e) {
	e.preventDefault();
	$(".popup-wrap").hide();
	$(".popup-wrap-noclick").hide();
});
// Popups
// ------------------------------------------

$(document).on("click", "[data-cancel-popover]", function () {
	$(this).closest('.popover').prev().popover("hide");
	//$('[data-toggle="popover"]').popover('hide');
});

$(document).on("show.bs.tooltip", function () {
	if ($('.popover').length > 0)
		return false;
});

function getCenterFeatures(w, h) {
	var top = window.top.outerHeight / 2 + window.top.screenY - (h / 2)
	var left = window.top.outerWidth / 2 + window.top.screenX - (w / 2)

	return ',top=' + top + ',left=' + left;
}

//POPUPFÖNSTER
function popit(url, name, width, height, scrollbars, center) {
	var centerFeatures = "";
	if (center) {
		centerFeatures = getCenterFeatures(width, height);
	}
	newwindow = window.open(url, name, 'status=YES,width=' + width + ',height=' + height + ',resizable=yes,scrollbars=' + scrollbars + centerFeatures);
	if (window.focus) { newwindow.focus() }
	return false;
}


/* Replace this with hover-tooltip.js */
(function () {
	var hoverLink = null;
	var showTimeout = 0;
	var hideTimeout = 0;

	var showTooltip = function () {
		$("#tip-holder span").load(hoverLink.attr("href"), function () {
			var pos = hoverLink.offset();
			var tip_text = hoverLink.attr("alt");

			$("#tip-holder span").html(tip_text);

			var w = ($("#tip-holder").width() - hoverLink.innerWidth()) / 2;
			var h = $("#tip-holder").height();

			var diff = w - ((pos.left - w) - $("#tip-holder").offset().left) + 3;

			if (pos.left + w + 20 > $(window).width()) {
				$("#tip-holder").css({ "top": pos.top - h - 5, "right": 20, "left": "auto" });
				$("#tip-holder .arrow").css("background-position", "right " + diff + "px top");
			}
			else {
				$("#tip-holder").css({ "top": pos.top - h - 5, "left": pos.left - w });
			}

			//$("#tip-holder").css({ "top": pos.top - h - 5, "left": pos.left - w });
			$("#tip-holder").show();
		});
	}

	var hideTooltip = function () {
		$("#tip-holder").hide();
		$("#tip-holder").css({ "top": 0, "left": 0, "right": "auto" });
		$("#tip-holder .arrow").css({ "background-position": "top center" });
	}

	$(document).on("mouseenter", ".might-overflow", function () {
		var $this = $(this);

		if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
			$this.attr('title', $this.text());
		}
	});

	$(document).on("mouseenter", ".ajax-tooltip", function () {
		//if ($(this).hasClass("cache-result")) {
		//}
		hoverLink = $(this);
		clearTimeout(hideTimeout);
		showTimeout = setTimeout(showTooltip, 500);
		$(this).click(function (e) {
			e.preventDefault();
		})
	}).on("mouseleave", ".ajax-tooltip", function () {
		clearTimeout(showTimeout);
		hideTooltip();
	});


})();

// Document Ready
$(document).ready(function () {
	$("a.closePopup").click(function () {
		window.close();
	});

	$("body").on("click", "a.confirm", function (o) {
		if (confirm($(this).attr('label'))) {
			// Post data
			$('#dataForm').attr('action', $(this).attr('href'));
			$('#dataForm #objective').val('DeleteComment');
			$('#dataForm').submit();
		}

		return false;
	});

	$(".hideMe").hide();


	// -----------------------
	// Auto format date inputs
	$("input[type=text].format-date").keyup(function (e) {
		var text = $(this).val();

		if (text.length > 10) {
			$(this).val(text.substring(0, 10));
		}
		if (text.length == 10) {
			// Validate date through ajax?
		}
	});
	$("input[type=text].format-date").keydown(function (e) {
		var text = $(this).val();
		if (e.keyCode != 189) {
			if (e.keyCode != 8) {
				if (text.length == 4 || text.length == 7) {
					$(this).val(text + "-");
				}
				//to handle copy & paste of 8 digit
				else if (e.keyCode == 86 && text.length == 8) {
					$(this).val(text.substr(0, 4) + "-" + text.substr(4, 2) + "-" + text.substr(2, 2));
				}
			}
			else {
				//backspace should skip dashes and just remove the numbers
				if (text.length == 7) {
					$(this).val(text.substring(0, 6));
				}
				else if (text.length == 4) {
					$(this).val(text.substring(0, 3));
				}
			}
		}
	});
	// -----------------------
});

function initComments() {
	$("textarea.comment").focus(function () {
		$(this).parents('form').find(".submit-comment-panel").show();
	});

	$('.new-comment button[type="submit"]').click(function (e) {

		$(this).attr("disabled", true);
		validated = true;

		form = $(this).parents('.new-comment form');

		if (form.find(".comment").val() == "") {
			e.preventDefault();
			cssAlert("Kommentaren kan inte vara tom", "error");
			validated = false;
		}

		if (form.find("input.comment-name").val() == "") {
			e.preventDefault();
			cssAlert("Du måste ange ditt namn", "error");
			validated = false;
		}

		$(this).removeAttr("disabled");

		return validated;

	});

	$("#submit-panel .member-id").change(function () {
		var memberId = $(this).val();

		var photoLoaded = function (data) {
			$("#emptyPostImg").hide();
			$("#postImg").hide();
			if (data == "") {
				$("#emptyPostImg").show();
			}
			else {
				$("#postImg").show();
				$("#postImg img").attr("src", data + "&width=40&height=40&mode=crop");
			}
		}

		$.ajax({
			type: "POST",
			url: "/" + teamName + "/member/getphoto/",
			success: photoLoaded,
			data: { memberId: memberId }
		});
	});
}

function reloadOpener() {
	if (opener != null)
		opener.location.reload();
}



function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function readCookie(name) {
	var nameEQ = escape(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return unescape(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = escape(name) + "=" + escape(value) + expires + "; path=/";
}

function getHashParams() {
	var hashParams = {};
	var e,
		a = /\+/g,  // Regex for replacing addition symbol with a space
		r = /([^&;=]+)=?([^&;]*)/g,
		d = function (s) { return unescape(s.replace(a, " ")); },
		q = decodeURI(window.location.hash).substring(1);

	while (e = r.exec(q))
		hashParams[d(e[1])] = d(e[2]);

	return hashParams;
}

$.fn.modalWithCloseCookie = function (cookieName) {

	if (readCookie(cookieName) != "hide") {
		this.modal("show");
	}

	this.on("hidden.bs.modal", function () {
		if ($("input.keepClosed", this).is(":checked")) {
			createCookie(cookieName, "hide", 365);
		}
	});
	return this;
}

$(document).on("change", "select.page-navigator", function () {
	window.location = $(this).val();
});

var getResponseMessage = function () {
	$.ajax({
		type: "POST",
		url: "/api/alerts/getresponsemessage",
		success: function (data) {
			if (data.responseMessage) {
				cssAlert(data.responseMessage, "green");
			}
			else if (data.errorMessage) {
				cssAlert(data.errorMessage, "red");
			}
		}
	});
}

/// Denna funktion används tillfälligt av frontendare
function popupBoxOpen(id) {
	$('#' + id).show();
}

/// Denna funktion används tillfälligt av frontendare
function popupBoxClose(element) {
	$(element).closest('.popup-wrap').hide();
}


function isNumeric(str) {
	if (typeof str != "string") return false // we only process strings!  
	return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
		!isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}