var express = require('express'); // requiring express module
var app = express(); //Creating reference
var bodyParser = require('body-parser'); // body-parser for post http calls
const functions = require('firebase-functions'); // Cloud Functions for Firebase library
var port = process.env.PORT || 8000;  //server is listening at port 8000
//using body-parser middleware
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(bodyParser.json());
//post http call for configuring webhook in api.ai
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.result) {
    processV1Request(request, response);
  } 
  else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 webhook request)');
  }
});

function processV1Request (req, res) {
 if (req.body.result.action == "Places") {
   //if user asks question regarding AP
   if (req.body.result.parameters.States == "Andhra Pradesh") {
   var ap ="Here is the best tourist places to visit in Andhra are,\n" +
   "Araku Valley,\n" + "Vizag,\n" + "Srisailan Dam,\n"+ "Papikondalu,\n"+  "Talakona Waterfalls.\n";
   //returns json response regarding AP
     return res.json({
       speech: ap,
       displayText: ap,
       source: 'webhook-echo-sample'
     });
   }
   //if user asks question regarding GOA
   else if (req.body.result.parameters.States == "Goa") {
     var goa = "Here is the best tourist places to visit in Goa are,\n" +
     "Dudhsagar Falls, \n" + "Fort Aguada,\n" + "Bondla Wildlife Sanctuary, \n" + "Museum of Christian Art.\n";
     //returns json response regarding GOA
     return res.json({
       speech: goa,
       displayText: goa,
       source: 'webhook-echo-sample'
     });
   }
   //if user asks question regarding Kerala
   else if (req.body.result.parameters.States == "Kerala") {
     var kl = "Here is the best tourist places to visit in Kerala are,\n" +
     "Alleppey Backwaters, \n" + "Munnar,\n" + "Kumarakom, \n" + "Wayanad.\n";
     //returns json response regarding Kerala
     return res.json({
       speech: kl,
        displayText: kl,
       source: 'webhook-echo-sample'
     });
   }
   //if user asks question regarding Karnataka
   else if (req.body.result.parameters.States == "Karnataka") {
     var ka = "Here is the best tourist places to visit in Karnataka are,\n" +
       "Bangalore," + "Bandipur National Park,\n" + "Chikmagalur,\n" +  "Coorg,\n" + "Shivanasamudra Falls,\n"+  "Mysore.\n";
     //returns json response regarding Karnataka
     return res.json({
       speech: ka,
       displayText: ka,
       source: 'webhook-echo-sample'
     });
   }
 }
}
app.listen(port, function() {
 console.log('Tourist Bot is running on port:8000');
});