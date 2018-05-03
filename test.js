let checkAvailability = require("./checkAvailability");

const url = 'http://www.alcatraztickets.com/?event=calendar.selectDate&startDate=07/01/2018&endDate=07/31/2018&offerId=18343&scheduleId=0';
const checkDates = [ "12", "13", "14", "15", "20"];

checkAvailability(url, checkDates, function(availableDates){
    if(availableDates.length > 0){
        console.log("Booking available on ", availableDates);
    }else {
        console.log("Booking not available on", checkDates);
    }
});


