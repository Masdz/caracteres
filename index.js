var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var jre=require('node-jre');

var app = express();
var fichero = multipart({uploadDir:"./ficheros"});

app.get('/pruebas',function(req,res){
    console.log('bienvenido');
    res.status(200).send({messaje:'exito'});
});
app.post('/subirArchivo',[fichero],function(req,res){
    var param=req.body;
	if(req.files){
		var archivo=req.files.dato1.path;
	   	var output = jre.spawnSync(  // call synchronously
			['./signos.jar'],                // add the relative directory 'java' to the class-path
			'contar.signos.Gui',                 // call main routine in class 'Hello'
			[archivo],               // pass 'World' as only parameter
			{ encoding: 'utf8' }     // encode output as string
		).stdout.trim(); 
		console.log(output);
	}
	res.status(200).send(output);
});

var server = app.listen((process.env.PORT || 5000), function () {
    console.log('listening on *:5000');
	
});