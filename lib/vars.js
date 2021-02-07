/**
**	Conjunto de variables globales del módulo C360
**/
module.exports = function() {
	
	/**
	 * Mensajes
	 */
	this.welcomeMessage = "¡Hola Mundo!";
	
	/**
	 * Variable para la conexión
	 */
	this.RESTServerIP ="";
	this.RESTServerPort ="8080";
	this.RESTHttpProtocol ="http://";

	this.username	= "";
	this.password 	= "";
	this.authToken;											//Token devuelto por el API. Será rellenado tras el login satisfactorio.
	this.sessionCookies;
	
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
		this.RESTServerIP 					="";	//Vordel de Internet
		this.RESTServerPort 				="";
		this.RESTHttpProtocol 				="https://";
		
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