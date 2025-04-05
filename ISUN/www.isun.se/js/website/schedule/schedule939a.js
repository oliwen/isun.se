$("table.day").each(function () {
    $("tr:last", this).addClass("last");
});
$(".icon-collapse").click(function () {
    var cont = $(this).parents("tr:first");
    var info = $(this).parent().find(".more-info");
    if (cont.hasClass("RowBgExpanded")) {
        $(this).parents("tr:first").removeClass("RowBgExpanded");
        info.slideUp("fast");
    }
    else {
        $(this).parents("tr:first").addClass("RowBgExpanded");
        info.slideDown("fast");
    }
});

var getPopupSize = function (width, height) {
    var size = {
        width: width || 450,
        height: height || 650
    }

    if (window.screen.availHeight > 1200) {
        size.height += 450;
    }
    else if (window.screen.availHeight > 1000) {
        size.height += 250;
    }
    return size;
}


var editMatch = function (scheduleId, overrideTeamName) {
    var size = getPopupSize(530);
    popit("/" + (overrideTeamName || teamName) + "/match/redigera/" + scheduleId, '', size.width, size.height, 'YES', true);
}

var editActivity = function (scheduleId, overrideTeamName) {
    var size = getPopupSize();
    popit("/" + (overrideTeamName || teamName) + "/kalender/redigera-aktivitet/" + scheduleId, '', size.width, size.height, 'YES', true);
}

var editAutoInvite = function (scheduleId) {
    var size = getPopupSize();
    popit("/" + teamName + "/kalender/redigera-schemalagd-kallelse/" + scheduleId, '', 650, size.height, 'YES', true);
}

var newActivity = function (date) {
    var size = getPopupSize();
    popit("/" + teamName + "/kalender/ny-aktivitet?date=" + date, '', size.width, size.height, 'YES', true);
}

var newClubActivity = function () {
    var size = getPopupSize();
    popit('/' + teamName + '/kalender/redigera-aktivitet-forening', '', size.width, size.height, 'YES', true);
}

var copyActivity = function (scheduleId) {
    var size = getPopupSize();
    popit("/" + teamName + "/kalender/kopiera-aktivitet/" + scheduleId, '', size.width, size.height, 'YES', true);
}


var editPresence = function (scheduleId, teamId, eventTypeId, overrideTeamName) {
    if (eventTypeId !== 7)
        popit("/" + (overrideTeamName || teamName) + "/controlpanel/presence/chooseparticipants/" + scheduleId + "?reload=false", '', '980', '600', 'YES', true);
    else
        popit("/" + (overrideTeamName || teamName) + "/controlpanel/presence/chooseparticipants/" + scheduleId, '', '980', '600', 'YES', true);
}



$(function () {
    $("[data-action='scroll'][data-direction='up']").click(function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow'); return false;
    });
});

$(document).on("click", ".edit-activity",
    function (e) {

        e.stopPropagation();
        e.preventDefault();

        var target = $(this).siblings("ul");
        if (target.data("loaded") === "true") {
            return;
        }

        target.data("loaded", "true");

        var scheduleId = $(this).data("id");
        $.get("/" + teamName + "/schedules/activitycontextmenu/" + scheduleId,
            function (result) {
                target.append(result);
            });
    });