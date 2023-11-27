const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

var admin = require("firebase-admin");

var serviceAccount = require("../config/job_portal-faddf-firebase-adminsdk-bjdbo-9ea4b79a15.json");

var adm = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
}
);
//send notification
exports.sendTheNotification = async(req,res) =>{
// app.post('/sendNotification', (req, res) => {
    try {
        message = {
            notification: {
                title: "Test Notification",
                body: "Hello notification"
            },
            token: "dG8Q4wemSHq8f6webKV2pg:APA91bGv_npPURqfp-0w95C3wsUcMIHM8RhjtetyUEoALL7GAiotHiI7D7YY8D28a5NoQ0IF3nNUHURoGQEedPNhqcvSqRACSy-NO3JTXGQwhKj0pouYZJ3Roq4iWs4PVTWbnVOfQUp-"
            
        };

     
        sendPushNotification(message);
        return res.status(200).send({message: 'message sent successfully'})
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
}

//function to send the push notification for restaurant
function sendPushNotification(message) {
    // console.log(message)
    adm.messaging().send(message)
        .then(response => {
            console.log('Successfully sent push notification', response);
            return 1;
        })
        .catch(error => {
            console.log('Error in sending push notification', error);
            return 0;
        });
}
 module.exports = {
    sendPushNotification
 };