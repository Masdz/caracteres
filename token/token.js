var token=require("jwt-simple");
var momento=require("moment");

var clave="hola paps";

exports.crearToken=function(usuario){
	var cargarToken={
		sub: usuario._id;
		nombre: usuario.usuario,
		now: momento().unix(),
		exp: momento().add(30,"days").unix();
	}
	return token.encode(cargarToken,clave);
}