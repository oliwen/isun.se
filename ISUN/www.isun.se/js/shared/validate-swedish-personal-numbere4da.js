function validateSwedishPersonalNumber(personalNumber) {
    if (!personalNumber)
        return false;

    if (personalNumber.lastIndexOf("-") > -1) {
        var lastFour = personalNumber.substring(personalNumber.lastIndexOf("-") + 1);
        if (lastFour.length != 4)
            return false;
    }

    personalNumber = personalNumber.replace(/-/g, "");

    if (personalNumber.length < 10 || personalNumber.length == 11 || personalNumber.length > 12)
        return false;

    if (personalNumber.substring(personalNumber.length - 4) == "0000")
        return false;

    if (personalNumber.length == 12)
    {
        if (personalNumber.substring(0, 2) != "19" && personalNumber.substring(0, 2) != "20")
            return false;

        personalNumber = personalNumber.substring(2);
    }

    if (parseInt(personalNumber.substring(2, 2)) < 1 || parseInt(personalNumber.substring(2, 2)) > 12)
        return false;

    if (parseInt(personalNumber.substring(4, 2)) < 1 || parseInt(personalNumber.substring(4, 2)) > 31)
        return false;

    var summary = 0;

    for (var i = 0; i < personalNumber.length; i++) {
        var number = parseInt(personalNumber[i]);

        if (isNaN(number))
            return false;

        var partialSummary = 0;

        if (i % 2 == 0) {
            partialSummary = number * 2;
            if (partialSummary > 9)
                partialSummary -= 9;
        }
        else
            partialSummary = number;

        summary += partialSummary;
    }

    return summary % 10 == 0;
}