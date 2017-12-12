# Building a Facebook Messenger Bot with Dialogflow

This document will have all the links, code snippets and notes that you will need to complete the lab - Building a Facebook Messenger Bot with Dialogflow.

## Important Links

• Google Account - https://accounts.google.com/SignUpWithoutGmail?hl=en/

• Access Dialogflow - https://dialogflow.com/

• Access Firebase - https://console.firebase.google.com/

• Access Facebook - https://www.facebook.com/

• Access Facebook for Developers - https://developers.facebook.com/

## Code Snippets

#### Creating Node JS functions

```
    function <functionName>(req, res) {
	
		const actionHandlers = {

          '<action-name>': () => {

               if (req.body.result.parameters.parameter-name == "parameter-value") {

                      <code logic here> 

                }

            }
		   
		}   
    }
```

#### Response from Firebase functions to Dialogflow

```
    let responseToUser = {

          speech: "<Sample response for speech>", // spoken response

          text: "<Text Response>" // displayed response

    };
		
	sendResponse(responseToUser);
    
```




