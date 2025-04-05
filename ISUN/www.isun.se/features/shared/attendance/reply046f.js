$("body").on("click",
    ".reply-buttons .reply-button",
    function () {

        if ($(this).hasClass("disabled")) {
            return;
        }

        var container = $(this).parents("tbody:first");

        if ($(this).hasClass("decline")) {
            container.find(".comment").prop("placeholder", "Anledning");
        }
        else {
            let placeholder = container.find(".comment").data('src-comment');
            container.find(".comment").prop("placeholder", placeholder);
        }

        container.find(".reply-buttons .reply-button").removeClass("active");
        $(this).addClass("active");
        container.find(".save-reply").removeClass("btn-default");
        container.find(".save-reply").addClass("btn-primary");
    });

$("body").on("click",
    ".edit-reply-buttons .reply-button.primary",
    function () {
        var container = $(this).parents("tbody:first");

        container.find(".edit-reply-buttons").slideUp("fast");
        container.find(".row-edit-response").slideDown("fast");
    });

$("body").on("click",
    ".edit-reply-buttons .reply-button.decline",
    function () {
        if ($(this).hasClass("disabled")) {
            alert("Sista avbokningstid har passerat");
        }
        else if (confirm("Ta bort ditt svar?")) {
            var scheduleId = $(this).data("scheduleid")
            $.ajax({
                method: "POST",
                url: "/" + teamName + "/invites/removeattendance/" + $(this).data("memberid") + "?scheduleid=" + scheduleId + "&code=" + accessCode,
            }).done(function (response) {
                if (response == "OK") {
                    reloadViews(scheduleId);
                }
                else if (response == "NO-ACCESS-LAST-PRESENCE-DATE") {
                    cssAlert("Svarstiden har gått ut och du kan därför inte ta bort ditt svar.", "error");
                }
                else if (response == "NO-ACCESS") {
                    alert("Sista avbokningstid har passerat");
                }
                //cssAlert("Ditt svar är sparat");
            }).error(function () {
                cssAlert("Misslyckades spara", "error");
            });
        }
    });

$("body").on("click",
    ".row-clickable",
    function () {
        resetEditButtons();
    });

var resetEditButtons = function () {
    $(".edit-reply-buttons").show();
    $(".row-edit-response").hide();
}


$("body").on("click",
    ".save-reply",
    function () {
        var container = $(this).parents("tbody:first");
        var selectedButton = container.find(".reply-button.active");

        if (selectedButton.length === 0) {
            cssAlert("Du måste välja ett alternativ", "error");
            return;
        }

        var attending = selectedButton.hasClass("accept");
        var comment = container.find(".comment").val().trim();

        if (!attending && !comment) {
            //container.find(".requiredWarning").slideDown("fast");
            container.find(".form-comment").addClass("has-error");
            cssAlert("Du måste ange anledning", "error");
            return;
        }

        // Clear errors
        if (container.find(".has-error").length > 0) {
            //container.find(".requiredWarning").slideUp("fast");
            container.find(".form-comment").removeClass("has-error");
        }

        var saveBtn = $(this);
        saveBtn.addClass("disabled");

        var data = {
            memberId: container.data("memberid"),
            scheduleId: scheduleId,
            attending: attending,
            comment: comment
        }

        // Make ajax call
        $.ajax({
            method: "POST",
            url: "/" + teamName + "/invites/savereply?code=" + accessCode,
            data: data
        }).done(function (result) {
            saveBtn.removeClass("disabled");

            if (result.status == "OK") {
                // Reload partials with ajax
                reloadViews(data.scheduleId);

                //cssAlert("Ditt svar är sparat");
            } else {
                cssAlert(result.errorMessage, "error");
            }
        }).error(function () {
            cssAlert("Misslyckades spara", "error");
        });
    });


var reloadViews = function (scheduleId) {
    var currentTab = $("#attendanceList a.active").data("id");

    $("#attendanceBox").load("/" + teamName + "/invites/attendancebox?scheduleid=" + scheduleId + "&code=" + accessCode + "&tab=" + currentTab, function () {
    });
}

$("body").on("click", "a.delete-from-list", function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm($(this).attr("dialog")))
        return;

    var name = $(this).attr("name");
    var href = $(this).attr("href");
    var deletedFromInvited = $(this).data("delete-from-invited");
    $.ajax({
        type: "POST",
        url: href,
        success: function (result) {
            if (result == "OK") {
                console.log(deletedFromInvited);
                if (deletedFromInvited)
                    cssAlert(name + " är inte längre kallad");
                else
                    cssAlert("Svaret från " + name + " är borttaget");
                // Reload partials with ajax
                reloadViews(scheduleId);
            }
        }
    });
});

$(document).ready(function () {
    if (document.location.hash == "#kallelse=1") {
        $("#openInviteBtn").trigger("click");
    }
});
