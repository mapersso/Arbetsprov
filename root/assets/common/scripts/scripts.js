function getDate() {
    //Gets the current date and time on the format yyyy-mm-dd hh:mm
    var today = new Date(),
        year = today.getFullYear().toString(),
        month = (today.getMonth() + 1).toString(),
        day = today.getDate().toString(),
        hour = today.getHours().toString(),
        minute = today.getMinutes().toString();

    //Add zeros where needed
    if (month.length === 1) { month = "0" + month; }
    if (day.length === 1) { day = "0" + day; }
    if (hour.length === 1) { hour = "0" + hour; }
    if (minute.length === 1) { minute = "0" + minute; }

    var datestring = year + "-" + month + "-" + day + " " + hour + ":" + minute;

    return datestring;
}

function addCountryToResults(country) {
    //Creates the HTML for a result list element containing a country and a timestamp
    var datestamp = getDate();
    $("#result").append("<div class='row res'>" +
    "<div class='name'>" +
    country +
    "</div>" +
    "<div class='date'>" +
    datestamp +
    "</div>" +
    "<button class='delete'><div class='circle' aria-label='Delete'>&times;</div></button>" +
    "</div>");
}

function implementAutocomplete(data) {
    //Makes the search box autocomplete your search query
    $("#searchField").autocomplete({
        source: data,
        select: function (event, ui) { //When you select a country from the autocomplete list  //event,
            var val = ui.item.value;
            addCountryToResults(val);
        }
    });
}

$(document).ready(function () {

    /*Gets a list of countries from a public REST API and maps the names of the 
    countries to an object that can be used by the jQuery Autocomplete function */
    $.ajax({
        type: 'GET',
        url: "http://services.groupkt.com/country/get/all",
        dataType: "json", // data type of response
        success: function (results) {
            var res_data = $.map(results.RestResponse.result, function (item) {
                return {
                    value: item.name
                }
            });
           implementAutocomplete(res_data);
        }
    });

    //Deletes a search result from the list when the user clicks the delete button.
    $("#result").on("click", "button.delete", function () {
        $(this).parent().remove();
    });
    
});
