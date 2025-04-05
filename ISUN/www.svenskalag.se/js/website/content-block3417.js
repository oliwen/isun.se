$("body").on("click",
    ".row-clickable",
    function () {
        var container = $(this).parents("tbody:first");

        var target = container.find(".row-expandable");

        if (target.is(":visible")) {
            target.hide();
            $(this).removeClass("in");
        } else {
            $(".row-expandable:visible").hide();
            target.show();
            $(".row-clickable.in").removeClass("in");
            $(this).addClass("in");
        }
    });
