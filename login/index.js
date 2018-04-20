firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //Usuario logeado
//        document.getElementById("login_user").style.display="block";
  //      document.getElementById("home").style.display="none";
        window.open("http://localhost:5000/cargaA");
        var user = firebase.auth().currentUser;
        if (user!=null){
            var email_id=user.email;
            document.getElementById("nombre_user").innerHTML=" Hola: "+email_id;

        }
    } else {
        // Usuario no logueado
    //    document.getElementById("login_user").style.display="none";
      //  document.getElementById("home").style.display="block";
         window.open("http://localhost:5000/");
    }
});



function login(){
    var inpEmail=document.getElementById("inputEmail").value;
    var inpPass=document.getElementById("inputPassword").value;

    firebase.auth().signInWithEmailAndPassword(inpEmail, inpPass).catch(function(error) {
        // Errores de sesion
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        window.alert("Error "+errorMessage);
    });

}

function logout(){
    firebase.auth().signOut();
    /*().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });*/
}