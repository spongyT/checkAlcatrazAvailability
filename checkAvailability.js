let cheerio = require('cheerio');
var request = require('request');

module.exports = function(url, checkDates, callback) {
    console.log("Checkavailability params", url, checkDates, callback);
    const availableDates = [];

    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html)

            $('#submitDate').each(function(i, elem) {
                const fieldValue = $(this).val();
                if(checkDates.indexOf(fieldValue) !== -1){
                    availableDates.push(fieldValue);
                }
            });

            callback.apply(this, [availableDates]);
        }else {
            console.log("Error receiving website", error)
            callback.apply(this, [availableDates]);
        }
    });
};

