
var newSeason = function (tab) {
    var size = getPopupSize();
    popit("/" + teamName + "/serie/" + tab + "/", '', size.width, size.height, 'YES', true);
}

var editSeason = function (seasonId) {
    var size = getPopupSize();
    popit("/" + teamName + "/serie/redigera/" + (seasonId || ''), '', size.width, size.height, 'YES', true);
}

var newGame = function () {
    var size = getPopupSize(530);
    popit("/" + teamName + "/match/redigera/", '', size.width, size.height, 'YES', true);
}

var editGame = function (scheduleId) {
    var size = getPopupSize(530);
    popit("/" + teamName + "/match/redigera/" + scheduleId, '', size.width, size.height, 'YES', true);
}


var loadDataFromHash = function () {
  var idArray = document.location.hash.substring(4).split(",");
  for (var i in idArray) {
    $("#link-" + idArray[i]).trigger("click");
  }
}

function resetTable() {
  var table = $('#seasonTable', $('#seasonCopy')).clone();
  table.css('display', '');
  $('#seasonContainer').html(table);
}
resetTable();

$('.sfilter').click(function (event) {
  var element = $(this);
  var color = $(this).attr('color');

  // Toggle selected
  if (element.hasClass('selected'))
    element.removeClass('selected').removeClass('d' + color);
  else
    element.addClass('selected').addClass('d' + color);

  var container = $('#seasonContainer');

  var elements = new Array();

  var hash = "";

  // Get selected seasons
  $('.sfilter.selected').each(function () {
    var id = $(this).attr('id').replace('link-', '');
    elements.push(id);

    if (hash.length > 0) {
      hash += ",";
    }

    hash += id;
  });

  document.location.hash = "id=" + hash;
  $('.btn-export-matches').prop('href', "/" + teamName + "/matches/exportexcel?seasonYear=" + $('#seasonYear').val() + "&seasonIdsString=" + hash)
  // Get entire table
  resetTable();

  // Loop through table rows and filter out only selected seasons
  if (elements.length > 0) {
    $('.season', container).each(function (index) {
      if ($.inArray($(this).attr('seasonId'), elements) < 0)
        $(this).remove();
    });

    // Only show divider lines for selected seasons
    $('.line', container).css('display', 'none');
    for (i = 0; i < elements.length; i++) {
      $('.line-' + elements[i], container).css('display', '');
    }
  }

  // Remove empty months
  for (var year = (seasonYear - 1); year <= (seasonYear + 1); year++) {
    for (i = 1; i <= 12; i++) {
      if ($('.month-item-' + year + i, container).length == 0)
        $('.month-' + year + i, container).remove();
    }
  }

  $('[data-toggle="tooltip"]').tooltip();

  event.stopPropagation();
  return false;
});

loadDataFromHash();

