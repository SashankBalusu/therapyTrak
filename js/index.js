import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-analytics.js";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
localStorage.clear()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1UxEQbbI_VT-JYoscC97Qdh8RG3qAXKc",
    authDomain: "therapytrak-8c0dc.firebaseapp.com",
    databaseURL: "https://therapytrak-8c0dc-default-rtdb.firebaseio.com",
    projectId: "therapytrak-8c0dc",
    storageBucket: "therapytrak-8c0dc.appspot.com",
    messagingSenderId: "198516349884",
    appId: "1:198516349884:web:1f1538478f5317a7b2e9b9",
    measurementId: "G-3R5MNQVQL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

const auth = getAuth();
const googleSign = document.getElementById("googleSign")
let user
googleSign.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //console.log(credential)
      const token = credential.accessToken;
      // The signed-in user info.
      user = result.user;
      console.log(user)

      let displayName = user["displayName"]
      localStorage.setItem("displayName", JSON.stringify(displayName))
      localStorage.setItem("email", JSON.stringify(user["email"]))
      localStorage.setItem("emailVerified", JSON.stringify(user["emailVerified"]))
      localStorage.setItem("phoneNumber", JSON.stringify(user["phoneNumber"]))
      localStorage.setItem("photoURL", JSON.stringify(user["photoURL"]))
      localStorage.setItem("creationTime", JSON.stringify(user["metadata"]["creationTime"]))
      localStorage.setItem("lastSignInTime", JSON.stringify(user["metadata"]["lastSignInTime"]))
      //lastSignInTime


      //console.log(result.additionalUserInfo.isNewUser)

      const database = getDatabase(app);
      get(ref(database, "doctors/")).then((info) => {
        if (info.exists()){
        console.log("hi")

          let doctors = info.val()

          let userExistsFlag = false
          for (let key in doctors){
              if (key == displayName){
                  userExistsFlag = true
                  console.log(doctors[key]["id"])
                  localStorage.setItem("doctorID", JSON.stringify(doctors[key]["id"]))
                  
              }
          }
          if (userExistsFlag == false){
            let docID = getRandomInt(100000, 999999)
            localStorage.setItem("doctorID", JSON.stringify(docID))

            set(ref(database, `doctors/${displayName}/`), {
                id: String(docID),
                patientIDs: ["PLACEHOLDER REMOVE"],
                
              });

          }
          window.open("home.html", "_self")
          
        }

        
      }).catch((error) => {
          console.log(error);
      });
      //console.log(user)
      //...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)

      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
})
