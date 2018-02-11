e strict';
var Alexa = require("alexa-sdk");
var storage = require("./storage");

var AWS = require("aws-sdk");

AWS.config.update({
	region: "us-east-1",
	endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {
	var alexa = Alexa.handler(event, context);
	alexa.registerHandlers(handlers);
	alexa.execute();

};

const handlers = {
	'LaunchRequest': function () {
		var welcomeMessage = 'Hello! Welcome to Breadcrumbs. Would you like to find events with free food near you or add an event to our database?';
		this.emit(':ask', welcomeMessage, 'Try again.');
	},

	'FindFreeFood': function() {
		//Read all the entries in db
		var avFood = "There are 2 free food events near you. There is free food at Rice hall at 6pm for an interest meeting. The food is pizza from Mellow Mushroom. There is also free food at the Mechanical Engineering beuilding at 7pm for a general body meeting with the Society of Women Engineers. The food is kebobs from Sticks."
		this.emit(':tell', avFood, 'Try again.');

	},



	'AddFreeFood': function() {

		const { slots } = this.event.request.intent;

    // prompt for slot values and request a confirmation for each

    // EventName
    	if (!slots.EventName.value) {
      		const slotToElicit = 'EventName';
      		const speechOutput = 'What is the name of the event?';
      		const repromptSpeech = 'Please tell me the name of the event';
      		this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    	}
    	else if (slots.EventName.confirmationStatus !== 'CONFIRMED') {

	      	if (slots.EventName.confirmationStatus !== 'DENIED') {
	        // slot status: unconfirmed
	        	const slotToConfirm = 'EventName';
	        	const speechOutput = `The name of the event is ${slots.EventName.value}, correct?`;
	        	const repromptSpeech = speechOutput;
	        	this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
	        }

      // slot status: denied -> reprompt for slot data
	      	const slotToElicit = 'EventName';
	      	const speechOutput = 'What is the name of the event you would like to add?';
	      	const repromptSpeech = 'Please tell me the name of the event';
	      	this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    	}

    // EventLocation
    	if (!slots.EventLocation.value) {
      		const slotToElicit = 'EventLocation';
      		const speechOutput = 'Tell me the location where the event can be found?';
      		const repromptSpeech = 'Please give me a location where the event can be found.';
      		this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    	}
    	else if (slots.EventLocation.confirmationStatus !== 'CONFIRMED') {

	    	if (slots.EventLocation.confirmationStatus !== 'DENIED') {
	        // slot status: unconfirmed
		        const slotToConfirm = 'EventLocation';
		        const speechOutput = `The event location is ${slots.EventLocation.value}, correct?`;
		        const repromptSpeech = speechOutput;
		        this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
	      	}
	    
	      // slot status: denied -> reprompt for slot data
			    const slotToElicit = 'EventLocation';
			    const speechOutput = 'Where can the event be found?';
			    const repromptSpeech = 'Please give me a location where the event can be found.';
			    this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
	    }

	//foodtype
  	if (!slots.FoodType.value) {
  		const slotToElicit = 'FoodType';
  		const speechOutput = 'What kind of food will be served?';
  		const repromptSpeech = 'Please tell me What kind of food will be served';
  		this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
	}
	else if (slots.FoodType.confirmationStatus !== 'CONFIRMED') {

      	if (slots.FoodType.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        	const slotToConfirm = 'FoodType';
        	const speechOutput = `The food type is ${slots.FoodType.value}, correct?`;
        	const repromptSpeech = speechOutput;
        	this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        }

  // slot status: denied -> reprompt for slot data
      const slotToElicit = 'FoodType';
      const speechOutput = 'What kind of food will be served?';
      const repromptSpeech = 'Please tell me the food type';
      this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
	}


    if (!slots.EventLocation.value) {
      const slotToElicit = 'EventLocation';
      const speechOutput = 'Where can the event be found?';
      const repromptSpeech = 'Please give me a location where the event can be found.';
      this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.EventLocation.confirmationStatus !== 'CONFIRMED') {

      if (slots.EventLocation.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        const slotToConfirm = 'EventLocation';
        const speechOutput = `The event location is ${slots.EventLocation.value}, correct?`;
        const repromptSpeech = speechOutput;
        this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }
    
      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'EventLocation';
      const speechOutput = 'Where can the event be found?';
      const repromptSpeech = 'Please give me a location where the event can be found.';
      this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }


  	if (!slots.EventTime.value) {
  		const slotToElicit = 'EventTime';
  		const speechOutput = 'What time is the event?';
  		const repromptSpeech = 'Please tell me What time is the event';
  		this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
	}
	else if (slots.EventTime.confirmationStatus !== 'CONFIRMED') {

      	if (slots.EventTime.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        	const slotToConfirm = 'EventTime';
        	const speechOutput = `The time is ${slots.EventTime.value}, correct?`;
        	const repromptSpeech = speechOutput;
        	this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
        }

  // slot status: denied -> reprompt for slot data
      const slotToElicit = 'EventTime';
      const speechOutput = 'What time is the event?';
      const repromptSpeech = 'Please tell me What time is the event';
      this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
	}
    
    
 //    storage.save(slots.EventName.value, this.event.session, (color) => {
	// 		response = 'Ok ' + slots.EventName.value + ' is your favorite color. I got it.';
	// 		this.emit(':ask', "You have been added");
	// });

    this.emit(':tell', "Your event has been added", "wrong")
  },



/*
    const name = slots.EventName.value;
    const location = slots.EventLocation.value;
    const dynamoParams = {
      TableName: AllEvents,
      Item: {
        Name: name,
        UserId: userId,
        Location: location
   
      }
    };

    const checkIfRecipeExistsParams = {
      TableName: AllEvents,
      Key: {
        Name: name,
        UserId: userId
      }
    }
    */
	

	'Unhandled': function() {
		this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a number.', 'Try saying a number.');
	},

	'AMAZON.HelpIntent': function () {
		this.emit(':ask', 'Tell me what your favorite color is. For example, my favorite color is periwinkle.', 'try again');
	},

	'AMAZON.StopIntent': function () {
		var say = 'Goodbye.';

		this.emit(':tell', say );
	}


}
