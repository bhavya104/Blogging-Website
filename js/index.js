var firebaseConfig = 
{
    apiKey: "AIzaSyDPMxBGJxwqSMskjCEcpL7zpoM-yPsh1UU",
    authDomain: "fir-webapp-62e78.firebaseapp.com",
    databaseURL: "https://fir-webapp-62e78.firebaseio.com",
    projectId: "fir-webapp-62e78",
    storageBucket: "fir-webapp-62e78.appspot.com",
    messagingSenderId: "456302943981",
    appId: "1:456302943981:web:08cdd431449d4d6027f6e4",
    measurementId: "G-1DGLR3Q9EK"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  firebase.auth.Auth.Persistence.LOCAL;

$("#btn-login").click(function(){

  var email = $("#email").val();
  var password = $("#password").val();

  if(email != "" && password != ""){
    var result = firebase.auth().signInWithEmailAndPassword(email,password);

    result.catch(function(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(errorCode);
      console.log(errorMessage);

      window.alert("Message : " + errorMessage);
    });
  }
  else {
    window.alert("Please enter email and password");
  }

});



$("#btn-logout").click(function()
{
  firebase.auth().signOut();
});



$("#btn-signup").click(function(){

  var email = $("#email").val();
  var password = $("#password").val();
  var cPassword = $("#confirmPassword").val();


  if(email != "" && password != "" && cPassword != "")
  {
    if(password == cPassword)
    {
      var result = firebase.auth().createUserWithEmailAndPassword(email,password);
      result.catch(function(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        
        window.alert("Message : " + errorMessage);
      });
    }
    else
    {
      window.alert("Password do not match.");
    }
  }
  else {
    window.alert("Incomplete Form Please Enter all fields.");
  }
});




$("#btn-resetPassword").click(function()
{
  var auth = firebase.auth();
  var email = $("#email").val();

  if(email != "")
  {
    auth.sendPasswordResetEmail(email).then(function()
    {
      window.alert("Email has been Send. Please Verify it");
    })
    .catch(function(error)
    {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      
      window.alert("Message : " + errorMessage);
    });
  }
  else
  {
    window.alert("Please Enter Your Registered Email.");
  }

});




$("#btn-update").click(function()
{
  var phone = $("#phone").val();
  var address = $("#address").val();
  var bio = $("#bio").val();
  var fName = $("#firstName").val();
  var sName = $("#secondName").val();
  var country = $("#country").val();
  var gender = $("#gender").val();

  var rootRef = firebase.database().ref().child("Users");
  var userId = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userId);

  if(fName!="" && sName!="" && phone!="" && country!="" && gender!="" && bio!="" && address!="")
  {
    var userData = 
    {
      "phone": phone,
      "address": address,
      "bio": bio,
      "firstName": fName,
      "secondName": sName,
      "country": country,
      "gender": gender,
    };

    usersRef.set(userData, function(error)
    {
      if(error)
      {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      
        window.alert("Message : " + errorMessage);
      }
      else
      {
        window.location.href = "MainPage.html";
      }
    });

  }
  else
  {
    window.alert("InComplete Form Please Fill all the sections.");
  }

});


function switchView(view)
{
  $.get({
    url:view,
    cache:false,
  })
  .then(function(data)
  {
    $("#container").html(data);
  });
}