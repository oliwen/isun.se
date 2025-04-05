$(function () {
	$('#successModal').modal('show');
});

new function () {

	$(".form-field.checkbox input[type=checkbox]").on("change", function () {
		initCheckBox($(this));
	});

	var initCheckBox = function (item) {
		var tag = item.parent().closest(".checkbox");
		if (item.is(":checked")) {
			tag.addClass("active");
		}
		else {
			tag.removeClass("active");
		}
	}

	$("#userList").on("click", "li", function () {
		$("#userList li").removeClass("selected");
		$(this).addClass("selected");
	});

	//$(".group-list").on("click", ".group-list-item.user-required", function (e) {

	//	let selectedUser = $("#userList li.selected");

	//	if (selectedUser.length == 0) {
	//		e.preventDefault();
	//		alert("Du måste välja vem anmälan gäller");
	//	}
	//	else {
	//		if (selectedUser.data("userid")) {
	//			$(this).attr("href", $(this).data("href") + "&userId=" + selectedUser.data("userid"));
	//		}
	//	}
	//});

	$(".form-field.checkbox input[type=checkbox]").each(function () {
		initCheckBox($(this));
	});

	$(document).on("click", ".submit-form", function (e) {
		$(this).prop('disabled', true);
		var formId = $(this).data("formid");
		if (integrityPolicyApprovalRequired) {
			var checked = $("#approveIntegrityPolicy-" + formId).is(":checked");
			if (!checked) {
				e.preventDefault();
				cssAlert("Du måste godkänna integritetspolicyn", "error");
				$(this).prop('disabled', false);
				return;
			}
		}
		$(this).addClass("disabled");
		$(this).closest("form").submit();
	});

	$("ul.radio-block:has(input.input-validation-error)").addClass("validation-error");

	$(".section-team-id").on("change", (function () {
		$("#MembershipTypeId").prop('checked', true);
		$(".team-select").not(".team-select.section-" + $(this).val()).val("");
	}));
	$(".membershiptypeid").on("change", (function () {
		$(".team-select").val("");
		$(".section-team-id").prop('checked', false);
	}));

	$(".team-select").on("change", (function () {
		console.log("changed team");
		$(".team-select").not(this).val("");
		$("#MembershipTypeId").prop('checked', true);
		$(".section-team-id").prop('checked', false);
		$(".section-team-id.section-id-" + $(this).attr("sectionid")).prop('checked', true);
	}));

	var showEmailMandatory = function (val) {
		if (val) {
			$(".not-mandatory-if-guardian").show();
		}
		else {
			$(".not-mandatory-if-guardian").hide();
		}
	}

	enableGuardians = function () {
		$("#guardians").slideDown("slow");
		$("#guardians input:not(.disabled), #guardians select:not(.disabled), #guardians textarea:not(.disabled)").removeProp("disabled");
	}
	disableGuardians = function () {
		$("#guardians").slideUp("fast");
		setTimeout(function () {
			$("#guardians input, #guardians select, #guardians textarea").prop("disabled", "disabled");
		}, 200);
	}

	var checkAge = function () {
		var personalNumber = $("#field_personuppgifter_personnummer").val();
		if (!personalNumber || personalNumber.length < 8)
			return;

		var year = personalNumber.substring(0, 4);
		var month = personalNumber.substring(4, 6);
		var day = personalNumber.substring(6, 8);

		$.ajax({
			type: "POST",
			url: "/api/signup/getage",
			data: ({ year: year, month: month, day: day }),
			success: function (data) {
				var age = data;

				if (age >= 0) {
					if (age >= 18) {
						showEmailMandatory(true);
						disableGuardians();
					} else {
						showEmailMandatory(false);
						enableGuardians();
					}
				} else {
					showEmailMandatory(true);
					disableGuardians();
				}
			},
		});
	}

	var getFormattedPersonalNumber = function (personalNumber) {

		if (!personalNumber)
			return;

		// add 19 or 20 to year (970114 => 19970114)
		if (personalNumber.indexOf("19") != 0 && personalNumber.indexOf("20") != 0 && (personalNumber.length == 6 || personalNumber.length == 10 || personalNumber.length == 11)) {

			var yearPart = personalNumber.slice(0, 2);
			var nowYearPart = new Date().getFullYear() - 2000;
			if (yearPart <= nowYearPart)
				personalNumber = "20" + personalNumber;
			else
				personalNumber = "19" + personalNumber;
		}
		// add - to personalnumber (199701147291 => 19970114-7291)
		if (personalNumber.length == 12 && personalNumber.indexOf("-") == -1)
			personalNumber = personalNumber.slice(0, 8) + "-" + personalNumber.slice(8);

		var month = parseInt(personalNumber.slice(4, 6));
		var date = parseInt(personalNumber.slice(6, 8));

		// apply auto-formatting if date is valid
		if (month > 0 && month < 13 && date > 0 && date < 32)
			return personalNumber;
		return null;
	}

	$('#field_malsman-1_personnummer, #field_malsman-2_personnummer').on("change", (function () {
		var personalNumber = getFormattedPersonalNumber($(this).val());
		if (personalNumber)
			$(this).val(personalNumber);
	}));

	$("#field_personuppgifter_personnummer").on("change", (function () {
		var personalNumber = getFormattedPersonalNumber($(this).val());
		if (personalNumber)
			$(this).val(personalNumber);
		checkAge();
	}));
	checkAge();
}();

$("#MembershipTypeId[value='2']").on("click", (function () {
	$(".radio-block-info").slideUp();
}));

$("#MembershipTypeId[value='1']").on("click", (function () {
	$(".radio-block-info").slideDown();

}));

//$("#field_malsman-1_relation,#field_malsman-2_relation").autocomplete({
//  source: ["Mamma", "Pappa"],
//  minLength: 0
//}).focus(function () {
//  $(this).autocomplete("search", "");
//  });

//$(".ui-autocomplete").wrap('<autocomplete class="jq-ui" />');
