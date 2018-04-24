function logout(){
    firebase.auth().signOut();
	window.open("https://caracteres.herokuapp.com/");
    /*().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });*/
}