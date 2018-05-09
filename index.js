var express = require('express');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var jre=require('node-jre');
var admin = require('firebase-admin');

var serviceAccount = require(__dirname+'/credencial');
console.log("dirname="+__dirname);

var firebase=admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://caracteres-24190.firebaseio.com/'
  });


var llave= "hola paps";

var app = express();
var fichero = multipart({uploadDir:"./ficheros"});
var path=require('path');
app.use(express.static(path.join(__dirname,'login')))

app.get('/pruebas',function(req,res){
    console.log('bienvenido');
    res.status(200).send({messaje:'exito'});
});
app.post('/subirArchivo',[fichero],function(req,res){
    var param=req.body;
	if(req.files){
		console.log(req.files);
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
app.get('/',function(req,res){
	res.sendFile(__dirname+'/login/index.html');
});

app.get('/cargaA',function(req,res){
	res.sendFile(__dirname+'/index.html');
});

app.post('/auth',function(req,res){
	var email=req.body.email;
	var rpass=req.body.pass;
	firebase.auth().getUserByEmail(email).then(function(user){
		var upass=user.toJSON().body.password;
		if(upass==rpass){
			firebase.auth().createCustomToken(llave).then(function(token){
				res.status(200).send(token);
			}).catch(function(error){
				res.status(500).send("Error al generar token "+error);
				console.log("Error al generar token",error);
			});
		}else{
			res.status(200).send("Contraseña incorrecta");
		}
	}).catch(function(error){
		res.status(500).send("Error al autenticar "+error);
		console.log("Error al autenticar",error);
	});
	
});


var server = app.listen((process.env.PORT || 5000), function () {
    console.log('listening on *:5000');

});
