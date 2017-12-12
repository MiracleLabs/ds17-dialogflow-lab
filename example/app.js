'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.result) {
    processV1Request(request, response);
  }  else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
  }
});

function processV1Request (request, response) {
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  
 
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
     'Places': () => {
      
      if (request.body.result.parameters.States == "Andhra Pradesh") {
       // Send simple response to user
         let responseToUser = {
          speech: "The most visited tourist places in Andhra are:\n" +
	"Araku Valley,\n" + "Vizag,\n" + "Srisailan Dam,\n"+ "Papikondalu,\n"+ 	"Talakona Waterfalls.\n", // spoken response
          text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor!' // displayed response
        };
         sendResponse(responseToUser);
      } 
      else if (request.body.result.parameters.States == "Goa") {
         // Send simple response to user
         let responseToUser = {
          speech: "The most visited tourist places in Goa are:\n" +
	  "Dudhsagar Falls, \n" + "Fort Aguada,\n" + "Bondla Wildlife Sanctuary, \n" + "Museum of Christian Art.\n", // spoken response
          text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor!' // displayed response
        };
         sendResponse(responseToUser);
      } 
       else if (request.body.result.parameters.States == "Karnataka") {
         // Send simple response to user
         let responseToUser = {
           speech:"The most visited tourist places in Karnataka are:\n" +
        "Bangalore," + "Bandipur National Park,\n" + "Chikmagalur,\n" +  "Coorg,\n" + "Shivanasamudra Falls,\n"+  "Mysore.\n", // spoken response
          text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor!' // displayed response
        };
         sendResponse(responseToUser);
      } 
   
    // Default handler for unknown or undefined actions
     else {
        let responseToUser = {
          speech: 'Webhook Request failed', // spoken response
          text: 'Webhook Request failed' // displayed response
        };
        sendResponse(responseToUser);
      }
    }
  };
  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
    // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      let responseJson = {};
       responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      responseJson.data = responseToUser.data;
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}
