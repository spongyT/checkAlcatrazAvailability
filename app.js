var aws = require('aws-sdk');
let checkAvailability = require("./checkAvailability");

const url = 'http://www.alcatraztickets.com/?event=calendar.selectDate&startDate=05/01/2018&endDate=05/31/2018&offerId=18343&scheduleId=0';
const checkDates = [ "12", "13", "14", "15"];

var ses = new aws.SES({
    region: 'us-east-1'
});

function sendMail(availableDates, callback){
    var eParams = {
        Destination: {
            ToAddresses: ["t.michelchen@web.de"]
        },
        Message: {
            Body: {
                Text: {
                    Data: "Alcatraz night tour is available at " + url + ". Dates: " + availableDates
                }
            },
            Subject: {
                Data: "checkAlcatrazNight alarm"
            }
        },
        Source: "t.michelchen@web.de"
    };

    console.log('===SENDING EMAIL===');
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);

            callback.apply(this, []);
        }
    });
}

exports.handler = function(event, context) {
    console.log("Checking ", url, " for available dates ", checkDates);

    checkAvailability(url, checkDates, function(availableDates){
        if(availableDates.length > 0){
            console.log("Booking available on ", availableDates);
            sendMail(availableDates, function() {
                context.succeed(event);
            });
        }else {
            console.log("Booking not available on", checkDates);
            context.succeed(event);
            // sendMail(availableDates, function() {
            //     context.succeed(event);
            // });
        }
    });
};