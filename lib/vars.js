require('dotenv').config();

/**
**	Conjunto de variables globales de la aplicación
**/
module.exports = function() {
	
	/**
	 * Mensajes
	 */
	this.welcomeMessage = "¡Hola Mundo!";
	this.repromptOutput = "¿Puedo ayudarte en algo más";
	
	/**
	 * Variable para la conexión
	 */
	this.RESTServerIP =process.ENV.HOST_IP;
	this.RESTServerPort =process.ENV.HOST_PORT;

	this.username	= process.ENV.HOST_USERNAME;
	this.password 	= process.ENV.HOST_PASSWORD;
	
	/**
	 * Control de entornos
	 */
	this.DES = 1;
	this.PRO = 2;
	
	/**
	 * Cambiar en función del entrono de ejecución.
	 * @Values: {this.DES, this.PRO}
	 */
	this.environment = this.DES;
	
	if(this.environment == this.PRO){
		
		//Cambiar valores de conexión para pro
		this.RESTServerIP 					="";
		this.RESTServerPort 				="";
		
		this.username						= "";
		this.password 						= "";
	}
	
	
	//Control variables
	this.LAST_INTENT	="";
	this.LAST_ORDEN		= this.ORDEN_ASC;
	this.navegacion 	= [];		//Control de la función de navegación
	this.test			= false;		//En producción poner esta variable a false.
	this.DEBUG			= true;		//Para mostrar trazas de log
	
	
	/** Variables relacionadas con el device con pantalla **/
	
	/** Variables de trabajo **/
	this.supportDisplay 			= false;		//Para determinar si el dispositivo soporta pantalla o no
	
}//Cierre Root