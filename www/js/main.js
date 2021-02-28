document.addEventListener("DOMContentLoaded", function () {
    //This is the DOM ready wrapper, this is basically the entry point for the JS once the dom content is loaded.

    //Set event listeners/handlers for buttons
    document.getElementById('home').onclick = dohome;
    document.getElementById('weatherbt').onclick = doweather;
    document.getElementById('map').onclick = domap;
    document.getElementById('currency').onclick = docurrency;
    document.getElementById('signin').onclick = dosignin

    //Set listeners for Auth State Changed
    firebase.auth().onAuthStateChanged(function (user) {
        //if there is a user enable app functionality
        if (user) {
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            buttons_signed_in();
            document.getElementById('signintext').innerHTML = "Sign-out"
            document.getElementById('signin').onclick = function (){
                firebase.auth().signOut();

            }

            //else keep the app disabled or re-disabled it
        } else {
            buttons_not_signed_in();
            document.getElementById('signin').onclick = dosignin;
            document.getElementById('signintext').innerHTML = "Sign-In"


        }

    });

    //Make sure the user is logged out and not a saved session
    firebase.auth().signOut();

    //Disable the buttons
    buttons_not_signed_in()

    dohome();
});

//Helper functions for common tasks


//Disable all the buttons since we arent signed in
function buttons_not_signed_in(){
    document.getElementById('home').disabled = false;
    document.getElementById('weatherbt').disabled = true;
    document.getElementById('map').disabled = true;
    document.getElementById('currency').disabled = true;
    document.getElementById('signin').disabled = false;
}


//Enable the buttons since we're signed in now.
function buttons_signed_in(){
    document.getElementById('home').disabled = false;
    document.getElementById('weatherbt').disabled = false;
    document.getElementById('map').disabled = false;
    document.getElementById('currency').disabled = false;
    document.getElementById('signin').disabled = false;
}

//unselect all buttons
function clean_buttons(){
    document.getElementById('home').classList.remove("selected")
    document.getElementById('weatherbt').classList.remove("selected")
    document.getElementById('map').classList.remove("selected")
    document.getElementById('currency').classList.remove("selected")
    document.getElementById('signin').classList.remove("selected")

}