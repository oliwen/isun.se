
var editGame = function (scheduleId) {
    var size = getPopupSize(530);
    popit("/" + teamName + "/match/redigera/" + scheduleId, '', size.width, size.height, 'YES');
}


var hash = window.location.hash;
if (hash == "#kallelse=1") {
    hash = null;
}

var showPostSection = function () {
    $(".game-text-before").hide();
    $(".game-text-summary").show();
}
var showPreSection = function () {
    $(".game-text-before").show();
    $(".game-text-summary").hide();
}

var scrollToGameSections = function () {
    if ($('#game-sections').length > 0) {
        history.scrollRestoration = 'manual';
        $('#game-sections')[0].scrollIntoView({ inline: 'start' });
    }
}
$(document).on("click", ".view-post-section", function () {
    showPostSection();
});
$(document).on("click", ".view-pre-section", function () {
    showPreSection();
});

if (document.location.hash == "#game-text-before" || document.location.hash == "#infor") {
    showPreSection();
    scrollToGameSections();
}
else if (document.location.hash == "#game-text-summary" || document.location.hash == "#referat") {
    showPostSection();
    scrollToGameSections();
}
else {
    if (preGame) {
        showPreSection();
    }
    else {
        showPostSection();
    }
}
