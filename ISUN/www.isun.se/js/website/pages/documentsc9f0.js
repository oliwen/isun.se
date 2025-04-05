remove = function (fileId) {
    var msg = "Är du säker på att du vill ta bort filen?";
    if (confirm(msg)) {
        $("#deleteFileId").val(fileId);
        $("#deleteForm").submit();
    }
}

removeFolder = function (folderId) {
    var msg = "Är du säker på att du vill ta bort mappen?";
    if (confirm(msg)) {
        $("#deleteFolderId").val(folderId);
        $("#deleteFolderForm").submit();
    }
}

openFolder = function (id) {
    if (id == 0)
        return;

    document.location.hash = "folder=" + id;
    $(".folder-content").addClass("hide");
    $(".folder-btn").data("collapsed", true);
    $(".folder-btn").removeClass("folder-open");
    $('.folder-btn').prop('title', 'Öppna mapp');
    $('[data-parent-folder-id]').addClass("hide");

    $(".folder-" + id).removeClass("hide");
    $(".folder-btn-" + id).data("collapsed", false);
    $(".folder-btn-" + id).addClass("folder-open");
    $('.folder-btn-' + id).prop('title', 'Stäng mapp');
    $('[data-parent-folder-id="' + id + '"]').removeClass("hide");

    var parentId = $('.folder-btn-' + id).data('parent-folder-id');
    if (parentId > 0) {
        $(".folder-" + parentId).removeClass("hide");
        $(".folder-btn-" + parentId).data("collapsed", false);
        $(".folder-btn-" + parentId).addClass("folder-open");
        $('.folder-btn-' + parentId).prop('title', 'Stäng mapp');
        $('[data-parent-folder-id="' + parentId + '"]').removeClass("hide");
    }


    $("#openFolderId").val(id);
}

$(function () {
    if (document.location.hash) {
        var id = document.location.hash.replace("#folder=", "");
        openFolder(id);
        if (id > 0) {
            document.getElementsByClassName("folder-btn-" + id)[0].scrollIntoView({
            });
        }
    }
})


$(".folder-btn").click(function (e) {
    if ($(e.target).closest(".prevent-open-folder").length > 0)
        return;

    if ($(this).data("collapsed")) {
        openFolder($(this).data("id"));
    } else {
        $("#openFolderId").val("");
        document.location.hash = "folder=0";
        $(".folder-content").addClass("hide");
        $(this).data("collapsed", true);
        $('.folder-btn').prop('title', 'Öppna mapp')
        $('.folder-btn').removeClass("folder-open");
        $('[data-parent-folder-id]').addClass("hide");

        var parentId = $(this).data('parent-folder-id');
        if (parentId > 0) {
            document.location.hash = "folder=" + parentId;
            $(".folder-" + parentId).removeClass("hide");
            $(".folder-btn-" + parentId).data("collapsed", false);
            $(".folder-btn-" + parentId).addClass("folder-open");
            $('.folder-btn-' + parentId).prop('title', 'Stäng mapp');
            $('[data-parent-folder-id="' + parentId + '"]').removeClass("hide");
        }
    }
});
