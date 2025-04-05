var zoomImageVisible = false;
var zoomTemplate = "<div class=\"zoom-image\" onclick=\"zoomImage()\" style=\"display:none;\"><div class=\"zoom-overlay\"></div><div class=\"zoom-wrapper\"><div class=\"zoom-img-container\"><img class=\"zoom-img\" src=\"\"/><div class=\"zoom-close\"><img src=\"/corporate/img/close-white.svg\"></div></div></div></div>";
function zoomImage(url) {
    if (zoomImageIsMobile) {
        window.open(url);
        return false;
    }
    if ($('.zoom-image').length == 0)
        $("body").append(zoomTemplate);

    var image = $('.zoom-image');
    if (!zoomImageVisible) {
        $('.zoom-image .zoom-img').prop('src', url);
        image.show();
        zoomImageVisible = true;
    } else {
        image.hide();
        zoomImageVisible = false;
    }
}

document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27 && zoomImageVisible) {
        zoomImage();
    }
};