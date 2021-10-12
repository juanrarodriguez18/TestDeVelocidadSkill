
/***********************************************************
 * [Renombrar este archivo a vars.js cuando esté completo] *
 ***********************************************************/


/**
**	Conjunto de variables globales de la aplicación
**/
module.exports = function() {
	
	/**
	 * Mensajes
	 */
	this.speedTestMessage = "¡Hola Mundo!";
	this.repromptOutput = "¿Puedo ayudarte en algo más";
	this.helpMessage = "Puedes pedirme que te repita la información diciendo 'repítemelo'. Para salir di adiós.";
	
	/**
	 * Variable para la conexión
	 */
	this.HOST_IP ="";//<your_ssh_hostname>
	this.HOST_PORT ="";//<your_ssh_port> //By default, the port is 22

	this.HOST_USERNAME	= "";//<your_ssh_username>
	this.HOST_PASSWORD 	= "";//<your_ssh_password>
	
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