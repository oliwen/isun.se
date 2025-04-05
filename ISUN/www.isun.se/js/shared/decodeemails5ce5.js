(function () {
    EEdecode();
})();

function EEdecode() {
    var decoder = new StringDecoder();

    $(".e-e-s").each(function (item) {
        var enc = $(this).attr("href");
        var email = decoder.decode(enc);
        $(this).attr("href", email);
        $(this).removeClass("e-e-s");
    });
    $(".e-e-i").each(function (item) {
        var enc = $(this).html();
        var email = decoder.decode(enc);
        $(this).html(email);
        $(this).removeClass("e-e-i");
    });
}