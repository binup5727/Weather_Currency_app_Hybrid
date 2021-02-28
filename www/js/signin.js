// JavaScript source code
function dosignin(){
	
     clean_buttons();
    document.getElementById("signin").classList.add("selected");

    //Clear Content
    document.getElementById("content").innerHTML = "";

    var btn = document.createElement("button");
    btn.innerHTML = "Sign-In with Yahoo!"
    btn.onclick = toggleSignIn;

    document.getElementById("content").appendChild(btn);
    console.log('hi there');


	

}



function toggleSignIn() {
  //If the current user object does not exist
  if (!firebase.auth().currentUser) {
    //Set the auth provider to yahoo
    var provider = new firebase.auth.OAuthProvider('yahoo.com');
    //And sign in with a popup
      console.log('hi there');

    firebase.auth().signInWithPopup(provider)
      .then(function (result) { //On Success save the token to session storage and output it to console
        var token = result.credential.accessToken;
        window.sessionStorage.setItem("token",token);
        console.log(result);
        var user = result.user;
        var ws = document.getElementById("content");
        ws.innerHTML = '';
        //var p = document.createElement('p');
        //p.textContent = "User : " + result.user.email;
        //ws.appendChild(p);
        //p = document.createElement('p');
        //p.textContent = "Token : " + token;
        //ws.appendChild(p);


      })
      .catch(function (error) { //On failure alert user or report error to console
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
        } else {
          console.error(error);
        }
      });
  } else {
    firebase.auth().signOut();
  }
  }