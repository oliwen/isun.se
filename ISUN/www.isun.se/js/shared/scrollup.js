function toggleScrollup(id, open) {
    if (open == null)
        open = !$('#' + id).hasClass('scrollup-open');

    if (open && $('#' + id + ' .scrollup-backdrop').length == 0)
        $('#' + id).prepend("<div class=\"scrollup-backdrop\" onclick=\"backdropClicked(this)\"></div>");

    $('body').toggleClass('scrollup-prevent-scroll', open);
    setTimeout(function () {
        $('#' + id).toggleClass('scrollup-open', open);
    }, 1)
}

function backdropClicked(el) {
    var id = $(el).closest('.scrollup').prop("id");
    toggleScrollup(id, false);
}