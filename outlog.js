firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        //Usuario logeado
      //  document.getElementById("login_user").style.display="block";
     //   document.getElementById("home").style.display="none";
        window.open("http://localhost:5000/");

        var user = firebase.auth().currentUser;
        if (user!=null){
            var email_id=user.email;
            document.getElementById("nombre_user").innerHTML=" Hola: "+email_id;

        }
    } else {
        // NUsuario no logueado
 //       document.getElementById("login_user").style.display="none";
 //       document.getElementById("home").style.display="block";
         window.open("http://localhost/login/");

    }
});

function logout(){
    firebase.auth().signOut();
    /*().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });*/
}