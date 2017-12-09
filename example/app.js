var express = require('express'); // requiring express module
var app = express(); //Creating reference
var bodyParser = require('body-parser'); // body-parser for post http calls
var port = process.env.PORT || 8000;  //server is listening at port 8000
//using body-parser middleware
app.use(bodyParser.urlencoded({
 extended: true
}));
app.use(bodyParser.json());
//post http call for configuring web hook in api.ai
app.post('/test', function(req, res) {
 if (req.body.result.action == "Places") {
   //if user asks question regqrding AP
   if (req.body.result.parameters.States == "Andhra Pradesh") {
   var ap ="Here is the best tourist places to visit in Andhra are,\n" +
   "Araku Valley,\n" + "Vizag,\n" + "Srisailan Dam,\n"+ "Papikondalu,\n"+  "Talakona Waterfalls.\n"
   //returns json response regarding AP
     return res.json({
       speech: ap,
       displayText: ap,
       source: 'webhook-echo-sample'
     });
   }
   //if user asks question regqrding GOA
   else if (req.body.result.parameters.States == "Goa") {
     var msg = "Here is the best tourist places to visit in Goa are,\n" +
     "Dudhsagar Falls, \n" + "Fort Aguada,\n" + "Bondla Wildlife Sanctuary, \n" + "Museum of Christian Art.\n"
     //returns json response regarding Goa
     return res.json({
       speech: msg,
       source: 'webhook-echo-sample'
     });
   }
   //if user asks question regqrding Karnataka
   else if (req.body.result.parameters.States == "Karnataka") {
     var msg = "Here is the best tourist places to visit in Karnataka are,\n" +
       "Bangalore," + "Bandipur National Park,\n" + "Chikmagalur,\n" +  "Coorg,\n" + "Shivanasamudra Falls,\n"+  "Mysore.\n"
     //returns json response regarding KA
     return res.json({
       speech: msg,
       displayText: msg,
       source: 'webhook-echo-sample'
     });
   }
 }
});
app.listen(port, function() {
 console.log('Tourist Bot is running on port:8000');
});