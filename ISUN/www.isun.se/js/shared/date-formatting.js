var monthNames = ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

function formatDateString(dateString, format) {

    var year = dateString.substring(0, 4);
    var month = dateString.substring(5, 7);
    var day = dateString.substring(8, 10);
    var monthIndex = parseInt(month) - 1;

    return format.replace("yyyy", year).replace("MMM", monthNames[monthIndex]).replace("dd", day).replace("d", day.indexOf("0") == 0 ? day.substring(1, 2) : day)
}