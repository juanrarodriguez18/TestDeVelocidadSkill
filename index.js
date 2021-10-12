const Alexa = require('ask-sdk-core');

/** Import de librerías internas **/

require('./lib/vars');			//Fichero de variables
require('./lib/utils')();		//Fichero de funciones de utilidad

/* CONSTANTS */
const skillBuilder = Alexa.SkillBuilders.custom();

/** FIN Templates y data **/

const WelcomeHandler = {
  canHandle(handlerInput) {    
    const request = handlerInput.requestEnvelope.request;
	
	printTrace("Requet Type: "+request.type);
	
    return request.type === 'LaunchRequest'
  },
  async handle(handlerInput) {
	  
  	limpiarNavegacion();
  	const result = await testDeVelocidad();

    console.log("prueba: "+result);
  	
    speedTestMessage = "¡Test de Velocidad Realizado con éxito! Estos son los resultados. Ping: "+Math.round(result.ping)
                        +" milisegundos, Velocidad de Bajada: "+Math.round(result.download/1000000)+" Megabits, Velocidad de Subida: "+Math.round(result.upload/1000000)+" Megabits.";
  	
  	//Devolver resultados	
  	return handlerInput.responseBuilder
  		  .speak(speedTestMessage)
  		  .reprompt(repromptOutput)
  		  .getResponse();
  }
};

/**
	Handler de ayuda
**/
const HelpHandler = {
  canHandle(handlerInput) {
    //console.log('Inside HelpHandler');
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest' &&
           request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(helpMessage)
      .reprompt(repromptOutput)
      .getResponse();
  },
};

/**
**	Handler que repite la Información
**/
const RepeatInfoHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && request.intent.name === 'C_RepeatInfo';
  },
  handle(handlerInput) {
      printTrace("RepeatInfoHandler]:"+info);
    return handlerInput.responseBuilder
      .speak(speedTestMessage)
	  .reprompt(repromptOutput)
      .getResponse();
  },
};

/**
**	Fin del skill
**/
const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest' && (
      request.intent.name === 'AMAZON.StopIntent' ||
      request.intent.name === 'AMAZON.PauseIntent' ||
      request.intent.name === 'AMAZON.CancelIntent'
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(exitMessage)
	  .withShouldEndSession(true)	//Fin de sesión
      .getResponse();
  },
};

/**
**	Fin de sesión
**/
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    return handlerInput.responseBuilder.getResponse();
  },
};

/**
	Gestión de errores
**/
const ErrorHandler = {
  canHandle() {
    console.log('Inside ErrorHandler');
    return true;
  },
  handle(handlerInput, error) {
    console.log('Inside ErrorHandler - handle');
    console.log(`Error: ${error.stack}`);
    console.log(`Error handled: ${JSON.stringify(error)}`);
    console.log(`Handler Input: ${JSON.stringify(handlerInput)}`);

    return handlerInput.responseBuilder
      .speak(errorMessage)
      .reprompt(repromptOutput)
      .getResponse();
  },
};
/** FIN de implementaciónde Hhandlers **/

/** Este es el punto de entrada de todas las peticiones
**	Se mira en todas las funciones definidas dentro de addRequestHandlers
**  buscando qué módulo debe responder a la petición.
**/
exports.handler = skillBuilder
  .addRequestHandlers(
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler,
	RepeatInfoHandler,
	WelcomeHandler,
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('cookbook/display-directive/v1')
  .lambda();
