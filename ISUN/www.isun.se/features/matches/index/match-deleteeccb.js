$("#deleteGamesModal").on("show.bs.modal", function (evnt) {
    $("#deleteLoader").show();
    var deleteScheduleId = $(evnt.relatedTarget).data("id");
    var url = $(evnt.relatedTarget).data("url");
    $("#deleteContainer").load("/" + teamName + "/schedules/deletedialog/" + deleteScheduleId, function () {
        $("#deleteLoader").hide();

        $('[data-toggle="tooltip"]').tooltip();

        if (url)
            $('#url').val(url)

        $("#deleteSeveralMatches").change(function () {
            if ($(this).is(":checked")) {
                $("#seasonAllMatches").slideDown();
            }
            else {
                $("#seasonAllMatches").slideUp();
                fieldsChanged($("input[type=checkbox].minor:enabled"), false);
                $('input#selectAllMatches').prop("checked", false);
                $('input#deleteSeason').prop("checked", false);
                setItemUnchecked($('input#deleteSeason'));
            }
        });

        $("#selectAllMatches").on("change", function () {
            checked = $("input[type=checkbox].minor:enabled");
            fieldsChanged(checked, $(this).is(':checked'));
        });

        var fieldsChanged = function (checkboxes, checkAll) {
            checkboxes.each(function () {
                if (checkAll) {
                    setItemChecked(this);
                    checkboxes.each(function () { $(this).prop("checked", true) })
                } else {
                    setItemUnchecked(this);
                    checkboxes.each(function () { $(this).prop("checked", false) })
                }
            });
        }


        var setItemChecked = function (item) {
            $(item).parent().parent("p").addClass("selected");
            if ($(item).parent().find(".label").hasClass("has-presence")) {
                $(item).parent().find(".label").removeClass("label-dark").addClass("label-danger");
            }
        }
        var setItemUnchecked = function (item) {
            $(item).parent().parent("p").removeClass("selected");
            if ($(item).parent().find(".label").hasClass("has-presence")) {
                $(item).parent().find(".label").removeClass("label-danger").addClass("label-dark");
            }
        }


        $("#seasonContent input[type=checkbox].minor").change(function () {
            if ($(this).is(":checked")) {
                setItemChecked(this);
            }
            else {
                setItemUnchecked(this);
            }
        });

        $("#deleteBtn").click(function () {
            var ids = $(".minor:checked").map(function () { return this.value; }).get().join(",");
            if (ids == "") {
                $("#deleteScheduleIds").val(deleteScheduleId);
            }
            else {
                $("#deleteScheduleIds").val(ids);
            }

            if (!$("#url").val())
                $("#url").val(location);

            $("#queryString").val(location.search);
            $("#hashString").val(location.hash)

            $('#deleteBtn').text('Tar bort...');
            $('#deleteBtn').addClass('disabled');
            $('#cancelBtn').addClass('disabled');

            $("#deleteForm").submit();
        });
    });
});
