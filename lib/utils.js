require('./vars')();
const {NodeSSH} = require('node-ssh');

module.exports = function() { 

	/**
		Limpiar array de navegación
	**/
    this.limpiarNavegacion = function() { 
    	
    	printTrace("LIMPIAR NAVEGACIÓN");
    	
		navegacion = []; 
		
    };
    
    /**
		Trazas de log
	**/
	this.printTrace = function(mensaje) { 
		
		if(DEBUG)
			console.log("****************\nTRACE --> "+mensaje+"\n****************");
		
	};

	/**
		Función para conectarnos al host para realizar el test por SSH
	**/
	this.testDeVelocidad = function(){
		const ssh = new NodeSSH();
	
		return new Promise((resolve) => { ssh.connect({
		host: HOST_IP,
		port: HOST_PORT,
		username: HOST_USERNAME,
		password: HOST_PASSWORD
		}).then(function() {
	
		// Command
		ssh.execCommand('speedtest').then(function(result) {
			console.log('STDOUT: ' + result.stdout);
			console.log('STDERR: ' + result.stderr);
	
			
			resolve({stdout: result.stdout, stderr: result.stderr});
			ssh.dispose();
		  })
		})});
	};
	
	/** Función para eliminar acentos
	En el modelo de Afiliación, los nombres de las provincias no llevan acentos.
	Pero Alexa incluye el acento si se necesita. Es necesario eliminarlo para aplicar bien los filtros.
	**/
	this.removeAcutes = function(s){
		var r = s.toLowerCase();
		non_asciis = {'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]'};
		for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
		return titleCase(r);
	};
	
	/**
		Función para determinar si el dispositivo soporta pantalla
	**/
	this.supportsDisplay = function(handlerInput) {
	  const hasDisplay =
		handlerInput.requestEnvelope.context &&
		handlerInput.requestEnvelope.context.System &&
		handlerInput.requestEnvelope.context.System.device &&
		handlerInput.requestEnvelope.context.System.device.supportedInterfaces &&
		handlerInput.requestEnvelope.context.System.device.supportedInterfaces.Display;
	  return hasDisplay;
	}
}

/*connectSSH = function(){
	const ssh = new NodeSSH();

	return new Promise((resolve) => { ssh.connect({
	host: HOST_IP,
	port: HOST_PORT,
	username: HOST_USERNAME,
	password: HOST_PASSWORD
	}).then(function() {

	// Command
	ssh.execCommand('hf').then(function(result) {
		console.log('STDOUT: ' + result.stdout);
		console.log('STDERR: ' + result.stderr);

		
		resolve({stdout: result.stdout, stderr: result.stderr});
		ssh.dispose();
	  })
	})}).catch();
}

async function a(){
				let respuesta = await connectSSH();
				console.log(respuesta);
};

a();*/