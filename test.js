/** Import de librerías internas **/

require('./lib/vars');			//Fichero de variables
require('./lib/utils')();		//Fichero de funciones de utilidad

async function test(){
    let respuesta = await testDeVelocidad();
    console.log(respuesta);
};

test();