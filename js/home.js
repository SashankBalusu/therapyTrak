import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getDatabase, ref, set, get, push } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";
import { getStorage, ref as ref2, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-storage.js";

const displayName = (localStorage.getItem("displayName")).slice(1,-1)

const welcomeMessage = document.getElementById("welcomeMessage")
welcomeMessage.textContent = "Welcome, " + displayName
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function createChart (labelArr, heartRateArr, repsArr, timesArr){
    var ctx = document.getElementById('myChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, 'rgba(187, 133, 136, 1)');

    gradientStroke.addColorStop(1, 'rgba(187, 133, 136, 0.25)');

    var gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);

    gradientStroke2.addColorStop(0, 'rgba(98, 131, 149, 1)');

    gradientStroke2.addColorStop(1, 'rgba(98, 131, 149, 0.25)');

    var gradientStroke3 = ctx.createLinearGradient(500, 0, 100, 0);

    gradientStroke3.addColorStop(0, 'rgba(55, 37, 73, 1)');

    gradientStroke3.addColorStop(1, 'rgba(55, 37, 73, 0.25)');
    if (myChart){
        myChart.destroy()
    }
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labelArr,
          datasets: [{
            label: "Heart Rate",
            fontColor: "white",
            borderColor: gradientStroke,
            pointBorderColor: gradientStroke,
            pointBackgroundColor: gradientStroke,
            pointHoverBackgroundColor: gradientStroke,
            pointHoverBorderColor: gradientStroke,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: heartRateArr,
            yAxisID: "left"
          },
          {
            label: "Reps",
            fontColor: "white",
            borderColor: gradientStroke2,
            pointBorderColor: gradientStroke2,
            pointBackgroundColor: gradientStroke2,
            pointHoverBackgroundColor: gradientStroke2,
            pointHoverBorderColor: gradientStroke2,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: repsArr,
            yAxisID: "right"
          },
          {
            label: "Times",
            fontColor: "white",
            borderColor: gradientStroke3,
            pointBorderColor: gradientStroke3,
            pointBackgroundColor: gradientStroke3,
            pointHoverBackgroundColor: gradientStroke3,
            pointHoverBorderColor: gradientStroke3,
            pointBorderWidth: 10,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            fill: false,
            borderWidth: 4,
            data: timesArr,
            yAxisID: "mid"
          }]
        },
        options: {
          legend: {
            position: "bottom",
            fontColor: "black",
            maintainAspectRatio: false
          },
          scales: {
            y: {
              "scaleLabel": {
                "display": true,
                "labelString": "Points Scored",
                "fontColor": "white"
  
              },
              "id": "left",
              "stacked": false,
              "ticks": {
                "beginAtZero": true,
                fontColor: "white"
  
              },
              "scaleLabel": {
                "display": true,
                "labelString": "Transactions",
                "fontColor": "white"
  
              },
              "id": "right",
              "position": "right",
              "stacked": false,
              "ticks": {
                "beginAtZero": true,
                fontColor: "white"
  
              },
              "id": "mid",
              "position": "right",
              "stacked": false,
              "ticks": {
                "beginAtZero": true,
                fontColor: "white"
  
              },
              gridLines: {
                drawTicks: true,
                display: true,
                zeroLineColor: "rgba(255, 255, 255, 0.25)",
                color: "rgba(255, 255, 255, 0.25)"
              }
            },
            x: {
              "scaleLabel": {
                "display": true,
                "labelString": "Week",
                "fontColor": "white"
  
              },
              gridLines: {
                zeroLineColor: "rgba(255, 255, 255, 0.25)",
                color: "rgba(255, 255, 255, 0.25)"
              },
              ticks: {
                padding: 20,
                fontColor: "white",
                fontStyle: "bold"
              }
            }
          },
          plugins: {
            title: {
              display: true,
              text: `Patient Stats`,
              fontColor: "white"
            }
          }
  
        }
      });
}
function populateVideo (databaseurlref){
    const storage = getStorage();

    getDownloadURL(ref2(storage, databaseurlref))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
    
        // Or inserted into an <img> element
        const video = document.getElementById('video');
        video.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
}
let myChart
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

const profile = document.getElementById("profile")
const manage = document.getElementById("manage")
const plans = document.getElementById("plans")
const logs = document.getElementById("logs")
const stats = document.getElementById("stats")

const profileContent = document.getElementById("profileContent")
const managePatientsContent = document.getElementById("managePatientsContent")
const plansContent = document.getElementById("plansContent")
const logsContent = document.getElementById("logsContent")
const statsContent = document.getElementById("statsContent")
const particlesJS = document.getElementById("particles-js")
const pranit = document.getElementById("pranit")

const doctorID = parseInt(JSON.parse(localStorage.getItem("doctorID")))

profile.addEventListener("click", function(){
    particlesJS.setAttribute("style", "display: none")
    pranit.setAttribute("style", "display: none")
    profileContent.setAttribute("style", "display:block;")
    managePatientsContent.setAttribute("style", "display: none;")
    plansContent.setAttribute("style", "display: none;")
    logsContent.setAttribute("style", "display: none")
    statsContent.setAttribute("style", "display: none;")


    //console.log(user)

    const email = (localStorage.getItem("email")).slice(1,-1)
    const emailVerified = (localStorage.getItem("emailVerified"))
    let phoneNumber = (localStorage.getItem("phoneNumber"))
    const photoURL = (localStorage.getItem("photoURL")).slice(1,-1)
    const creationTime = (localStorage.getItem("creationTime")).slice(1,-1)
    const lastSignInTime = (localStorage.getItem("lastSignInTime")).slice(1,-1)

    if ((phoneNumber) == "null"){
        phoneNumber = "N/A"
    }
    // console.log(displayName)
    // console.log(email)
    // console.log(emailVerified)
    // console.log(phoneNumber)
    // console.log(photoURL)
    // console.log(creationTime)
    // console.log(lastSignInTime)

    const profilePic = document.getElementById("profilePic")
    profilePic.src = photoURL
    
    const displayNameContent = document.getElementById("displayName")
    displayNameContent.textContent = "Hi, "  + displayName
    
    const phoneNumberContent = document.getElementById("phonenumber")
    phoneNumberContent.textContent = "Phone number: " + phoneNumber

    const emailContent = document.getElementById("email")
    emailContent.textContent = "Email: " + email

    const emailVerifiedContent = document.getElementById("emailVerified")
    if (emailVerified == true){
        emailVerifiedContent.textContent = "You're verified!"
    }
    else {
        emailVerifiedContent.textContent = "You're not verified yet!"
    }

    const joined = document.getElementById("joined")
    joined.textContent = "Account created on: " + creationTime

    const lastsignin = document.getElementById("lastsignin")
    lastsignin.textContent = "Last sign in: " + lastSignInTime

    const doctorIDProfile = document.getElementById("doctorIDProfile")
    doctorIDProfile.textContent = "Your ID: " + doctorID 
})

manage.addEventListener("click", function(){
    particlesJS.setAttribute("style", "display: none")
    pranit.setAttribute("style", "display: none")
    managePatientsContent.setAttribute("style", "display: block;")
    profileContent.setAttribute("style", "display:none;")
    plansContent.setAttribute("style", "display: none;")
    logsContent.setAttribute("style", "display: none")
    statsContent.setAttribute("style", "display: none;")

    const database = getDatabase(app);
    const patientsTable = document.getElementById("patientsTable")
    removeAllChildNodes(patientsTable)
    get(ref(database, "patients/")).then((info) => {
    if (info.exists()){
        console.log(info.val())
        let patients = info.val()
        let numPatient = 0
        for (let key in patients){
            console.log(parseInt(JSON.parse(doctorID)))
            console.log(patients[key]["doctorID"])
            if (patients[key]["doctorID"] == parseInt(JSON.parse(doctorID))){
              console.log("hi")
                console.log(key)
                numPatient++
                let tr = document.createElement("tr")
                let num = document.createElement("td")
                num.textContent = numPatient
                tr.appendChild(num)
                let id = document.createElement("td")
                id.textContent = key
                tr.appendChild(id)
                let name = document.createElement("td")
                name.textContent = patients[key]["name"]
                tr.appendChild(name)
                tr.addEventListener("click", function(){
                    let trs = document.getElementsByTagName("tr")
                    for (let i = 0; i < trs.length; i++){
                        trs[i].classList.remove("active-row")
                    }
                    tr.classList.add("active-row")

                })
                patientsTable.appendChild(tr)
            }

        }
        
    }

    
    }).catch((error) => {
        console.log(error);
    });


})

plans.addEventListener("click", function(){
    particlesJS.setAttribute("style", "display: none")
    pranit.setAttribute("style", "display: none")
    let flag = false
    plansContent.setAttribute("style", "display: block;")
    profileContent.setAttribute("style", "display:none;")
    managePatientsContent.setAttribute("style", "display: none;")
    logsContent.setAttribute("style", "display: none")
    statsContent.setAttribute("style", "display: none;")

    const database = getDatabase(app);
    const patientsTable = document.getElementById("patientsTable")
    get(ref(database, "patients/")).then((info) => {
    if (info.exists()){
        console.log(info.val())
        let patients = info.val()
        let numPatient = 0
        let patientArr = []
        for (let key in patients){
            console.log(doctorID)
            if (patients[key]["doctorID"] == doctorID){
                patientArr.push(patients[key]["name"])
                // console.log(key)
                // numPatient++
                // let tr = document.createElement("tr")
                // let num = document.createElement("td")
                // num.textContent = numPatient
                // tr.appendChild(num)
                // let id = document.createElement("td")
                // id.textContent = key
                // tr.appendChild(id)
                // let name = document.createElement("td")
                // name.textContent = patients[key]["name"]
                // tr.appendChild(name)
                // patientsTable.appendChild(tr)
            }

        }
        const patientName = document.getElementById("patientName")
        patientName.textContent = patientArr[0]
        const plansExercisesContent = document.getElementById("plansExercisesContent")
        removeAllChildNodes(plansExercisesContent)
        let h3 = document.createElement("h3")
        h3.textContent = "Current Exercises: "
        h3.style.fontSize = "30px"
        h3.style.color = "white"
        h3.style.marginBottom = "30px"

        plansExercisesContent.appendChild(h3)
        for (let key in patients){
            if (patients[key]["name"] == patientArr[0]){
                for (let i = 0; i < patients[key]["exercises"]["exercise"].length; i++){
                    if (patients[key]["exercises"]["exercise"][i] != "PLACEHOLDER REMOVE"){
                        let p = document.createElement("p")

                        p.textContent = patients[key]["exercises"]["exercise"][i]
                        p.style.fontSize = "30px"
    
                        //console.log(patients[key]["exercises"][i])
                        plansExercisesContent.appendChild(p)
                    }
                    
                }
                console.log(patients[key]["exercises"]["exercise"])
            }
        }
        let but = document.createElement("button")
        but.id = "addExercise"
        but.textContent = "Add Exercises"
        plansExercisesContent.appendChild(but)

        const addExercise = document.getElementById("addExercise")
        addExercise.addEventListener("click", function(){
            if (flag == true){
                return
            }
            let input = document.createElement("select")
            
            input.style.borderTopLeftRadius = "8px"
            input.style.borderBottomLeftRadius = "8px"
            input.style.height = "40px"
            input.style.border=  "none"
            input.style.padding = "0"
            input.style.textAlign = "center"
            input.style.fontFamily = "'Quicksand', sans-serif"
            input.style.fontSize = "20px"
            let option = document.createElement("option")
            option.value = "Squats"
            option.textContent = "Squats"
            let option2 = document.createElement("option")
            option2.value = "Hand-Raises"
            option2.textContent = "Hand-Raises"
            input.appendChild(option)
            input.appendChild(option2)

            let submit = document.createElement("button")
            submit.id = "submitAddExercise"
            submit.style.border=  "none"
            submit.style.borderTopRightRadius = "8px"
            submit.style.borderBottomRightRadius = "8px"
            submit.style.height = "40px"
            submit.style.fontFamily = "'Quicksand', sans-serif"
            submit.style.fontSize = "20px"
            submit.textContent = "Submit"
            
            flag = true
            plansExercisesContent.appendChild(input)
            plansExercisesContent.appendChild(submit)
            const submitAddExercise = document.getElementById("submitAddExercise")
            submitAddExercise.addEventListener("click", function(){
                let pastArr
                let id
                for (let key in patients){
                    if (patients[key]["name"] == patientArr[0]){
                        id = key
                        pastArr = patients[key]["exercises"]["exercise"]
                        pastArr.push(input.value)
                        break
                    }
                }
                set(ref(database, `patients/${id}/exercises`), {
                    exercise: pastArr,
                    
                  });
                input.style.display = "none"
                submit.style.display = "none"
            })


        })
        const moveLeft = document.getElementById("moveLeft")
        moveLeft.addEventListener("click", function(){
            flag = false
            removeAllChildNodes(plansExercisesContent)
            let h3 = document.createElement("h3")
            h3.textContent = "Current Exercises: "
            h3.style.fontSize = "30px"
            h3.style.color = "white"
            h3.style.marginTop = "30px"

            plansExercisesContent.appendChild(h3)

            let currName = patientName.textContent
            let currIndex = patientArr.indexOf(currName)
            if (currIndex == 0){
                currIndex = patientArr.length
            }
            console.log(patientArr[currIndex-1])
            patientName.textContent = patientArr[currIndex-1]
            for (let key in patients){
                if (patients[key]["name"] == patientArr[currIndex-1]){
                    for (let i = 0; i < patients[key]["exercises"]["exercise"].length; i++){
                        if (patients[key]["exercises"]["exercise"][i] != "PLACEHOLDER REMOVE"){
                            let p = document.createElement("p")
    
                            p.textContent = patients[key]["exercises"]["exercise"][i]
                            p.style.fontSize = "30px"
        
                            //console.log(patients[key]["exercises"][i])
                            plansExercisesContent.appendChild(p)
                        }
                    }
                    console.log(patients[key]["exercises"]["exercise"])
                }
            }
            let but = document.createElement("button")
        but.id = "addExercise"
        but.textContent = "Add Exercises"
        plansExercisesContent.appendChild(but)

        const addExercise = document.getElementById("addExercise")
        addExercise.addEventListener("click", function(){
            if (flag == true) {
                return
            }
            let input = document.createElement("select")
            
            input.style.borderTopLeftRadius = "8px"
            input.style.borderBottomLeftRadius = "8px"
            input.style.height = "40px"
            input.style.border=  "none"
            input.style.padding = "0"
            input.style.textAlign = "center"
            input.style.fontFamily = "'Quicksand', sans-serif"
            input.style.fontSize = "20px"
            let option = document.createElement("option")
            option.value = "Squats"
            option.textContent = "Squats"
            let option2 = document.createElement("option")
            option2.value = "Hand-raises"
            option2.textContent = "Hand-raises"
            input.appendChild(option)
            input.appendChild(option2)
            let submit = document.createElement("button")
            submit.style.border=  "none"
            submit.style.borderTopRightRadius = "8px"
            submit.style.borderBottomRightRadius = "8px"
            submit.style.height = "40px"
            submit.style.fontFamily = "'Quicksand', sans-serif"
            submit.style.fontSize = "20px"
            submit.id = "submitAddExercise"
            submit.textContent = "Submit"
            flag = true
            

            plansExercisesContent.appendChild(input)
            plansExercisesContent.appendChild(submit)
            const submitAddExercise = document.getElementById("submitAddExercise")
            submitAddExercise.addEventListener("click", function(){
                let pastArr
                let id
                for (let key in patients){
                    if (patients[key]["name"] == patientArr[currIndex-1]){
                        id = key
                        pastArr = patients[key]["exercises"]["exercise"]
                        pastArr.push(input.value)
                        break
                    }
                }
                set(ref(database, `patients/${id}/exercises`), {
                    exercise: pastArr,
                    
                  });
                input.style.display = "none"
                submit.style.display = "none"

            })


        })
        })
        const moveRight = document.getElementById("moveRight")
        moveRight.addEventListener("click", function(){
            flag = false
            removeAllChildNodes(plansExercisesContent)
            let h3 = document.createElement("h3")
            h3.textContent = "Current Exercises: "
            h3.style.fontSize = "30px"
            h3.style.color = "white"
            h3.style.marginTop = "30px"
            plansExercisesContent.appendChild(h3)
            let currName = patientName.textContent
            let currIndex = patientArr.indexOf(currName)
            if (currIndex == patientArr.length-1){
                currIndex = -1
            }
            patientName.textContent = patientArr[currIndex+1]
            for (let key in patients){
                if (patients[key]["name"] == patientArr[currIndex+1]){
                    for (let i = 0; i < patients[key]["exercises"]["exercise"].length; i++){
                        if (patients[key]["exercises"]["exercise"][i] != "PLACEHOLDER REMOVE"){
                            let p = document.createElement("p")
    
                            p.textContent = patients[key]["exercises"]["exercise"][i]
                            p.style.fontSize = "30px"
        
                            //console.log(patients[key]["exercises"][i])
                            plansExercisesContent.appendChild(p)
                        }
                    }
                    console.log(patients[key]["exercises"])
                }
            }
            let but = document.createElement("button")
        but.id = "addExercise"
        but.textContent = "Add Exercises"
        plansExercisesContent.appendChild(but)

        const addExercise = document.getElementById("addExercise")
        addExercise.addEventListener("click", function(){
            if (flag == true){
                return
            }
            let input = document.createElement("select")
            
            input.style.borderTopLeftRadius = "8px"
            input.style.borderBottomLeftRadius = "8px"
            input.style.height = "40px"
            input.style.border=  "none"
            input.style.padding = "0"
            input.style.textAlign = "center"
            input.style.fontFamily = "'Quicksand', sans-serif"
            input.style.fontSize = "20px"
            let option = document.createElement("option")
            option.value = "Squats"
            option.textContent = "Squats"
            let option2 = document.createElement("option")
            option2.value = "Hand-Raises"
            option2.textContent = "Hand-Raises"
            input.appendChild(option)
            input.appendChild(option2)
            let submit = document.createElement("button")
            submit.id = "submitAddExercise"
            submit.style.border=  "none"
            submit.style.borderTopRightRadius = "8px"
            submit.style.borderBottomRightRadius = "8px"
            submit.style.height = "40px"
            submit.style.fontFamily = "'Quicksand', sans-serif"
            submit.style.fontSize = "20px"
            submit.textContent = "Submit"
            flag = true
            

            plansExercisesContent.appendChild(input)
            plansExercisesContent.appendChild(submit)
            const submitAddExercise = document.getElementById("submitAddExercise")
            submitAddExercise.addEventListener("click", function(){
                let pastArr
                let id
                for (let key in patients){
                    if (patients[key]["name"] == patientArr[currIndex+1]){
                        id = key
                        pastArr = patients[key]["exercises"]["exercise"]
                        pastArr.push(input.value)
                        break
                    }
                }
                set(ref(database, `patients/${id}/exercises`), {
                    exercise: pastArr,
                    
                  });
                input.style.display = "none"
                submit.style.display = "none"


            })


        })
        })

        
    }

    
    }).catch((error) => {
        console.log(error);
    });


})

logs.addEventListener("click", function(){
    particlesJS.setAttribute("style", "display: none")
    pranit.setAttribute("style", "display: none")
    logsContent.setAttribute("style", "display: block")
    profileContent.setAttribute("style", "display:none;")
    managePatientsContent.setAttribute("style", "display: none;")
    plansContent.setAttribute("style", "display: none;")
    statsContent.setAttribute("style", "display: none;")
    const database = getDatabase(app);
    const video = document.getElementById('video');
    const metadatakinda = document.getElementById("metadatakinda")

    const storage = getStorage();
    const patientNameVideo = document.getElementById("patientNameVideo")

    get(ref(database, "patients/")).then((info) => {
        if (info.exists()){
        console.log("hi")

          let patients = info.val()
          let patientVidArr = []
        
          
          for (let key in patients){
              if (patients[key]["doctorID"] == doctorID){
                  patientVidArr.push(patients[key]["name"])
              }
          }
          console.log(patientVidArr)
          let id
          patientNameVideo.textContent = patientVidArr[0]
          let currName = 0
          for (let key in patients){
              if (patients[key]["name"] == patientVidArr[0]){
                  id = key
              }
          }
          let stats = patients[id]["stats"]
          let urls = []
          for (let key in stats){
              urls.push(key)
          }
          populateVideo(`${id}/${urls[0]}.mp4`)
          metadatakinda.textContent = urls[0]

          const vidDate = document.getElementById("vidDate")
          vidDate.textContent = "Date recorded: " + stats[urls[0]]["date"]
          const vidReps = document.getElementById("vidReps")
          vidReps.textContent = "Reps: " + stats[urls[0]]["reps"]
          const vidHeartrate = document.getElementById("vidHeartrate")
          vidHeartrate.textContent = "Heartrate: " + stats[urls[0]]["heartrate"]
          const vidStretch = document.getElementById("vidStretch")
          vidStretch.textContent = "Stretch done: " + stats[urls[0]]["stretch"]
          const vidTime = document.getElementById("vidTime")
          vidTime.textContent = "Time spent: " + stats[urls[0]]["time"]
          
          let currURL = 0
          const moveLeftVideo = document.getElementById("moveLeftVideo")
          moveLeftVideo.addEventListener("click", function(){
            let currURLFind = metadatakinda.textContent
            currURL = urls.indexOf(currURLFind)
            if (currURL == 0){
                currURL = urls.length
            }
            console.log(currURL-1)
            console.log(urls)
            populateVideo(`${id}/${urls[currURL-1]}.mp4`)
            const vidDate = document.getElementById("vidDate")
            vidDate.textContent = "Date recorded: " + stats[urls[currURL-1]]["date"]
            const vidReps = document.getElementById("vidReps")
            vidReps.textContent = "Reps: " + stats[urls[currURL-1]]["reps"]
            const vidHeartrate = document.getElementById("vidHeartrate")
            vidHeartrate.textContent = "Heartrate: " + stats[urls[currURL-1]]["heartrate"]
            const vidStretch = document.getElementById("vidStretch")
            vidStretch.textContent = "Stretch done: " + stats[urls[currURL-1]]["stretch"]
            const vidTime = document.getElementById("vidTime")
            vidTime.textContent = "Time spent: " + stats[urls[currURL-1]]["time"]
            metadatakinda.textContent = urls[currURL-1]
          })
          const moveRightVideo = document.getElementById("moveRightVideo")
          moveRightVideo.addEventListener("click", function(){
            let currURLFind = metadatakinda.textContent
            currURL = urls.indexOf(currURLFind)
            if (currURL == urls.length-1){
                currURL = -1
            }
            populateVideo(`${id}/${urls[currURL+1]}.mp4`)
            const vidDate = document.getElementById("vidDate")
            vidDate.textContent = "Date recorded: " + stats[urls[currURL+1]]["date"]
            const vidReps = document.getElementById("vidReps")
            vidReps.textContent = "Reps: " + stats[[currURL+1]]["reps"]
            const vidHeartrate = document.getElementById("vidHeartrate")
            vidHeartrate.textContent = "Heartrate: " + stats[urls[currURL+1]]["heartrate"]
            const vidStretch = document.getElementById("vidStretch")
            vidStretch.textContent = "Stretch done: " + stats[urls[currURL+1]]["stretch"]
            const vidTime = document.getElementById("vidTime")
            vidTime.textContent = "Time spent: " + stats[urls[currURL+1]]["time"]
            metadatakinda.textContent = urls[currURL-1]


          })
          const moveLeftPatientVideo = document.getElementById("moveLeftPatientVideo")
          moveLeftPatientVideo.addEventListener("click", function(){
            let curr = patientNameVideo.textContent
            currName = patientVidArr.indexOf(curr)
            if (currName == 0){
                currName = patientVidArr.length
            }
            for (let key in patients){
                if (patients[key]["name"] == patientVidArr[currName-1]){
                    id = key
                }
            }
            stats = patients[id]["stats"]
            urls = []
            for (let key in stats){
                urls.push(key)
            }
            patientNameVideo.textContent = patientVidArr[currName -1]
            populateVideo(`${id}/${urls[0]}.mp4`)
            const vidDate = document.getElementById("vidDate")
            vidDate.textContent = "Date recorded: " + stats[urls[0]]["date"]
            const vidReps = document.getElementById("vidReps")
            vidReps.textContent = "Reps: " + stats[urls[0]]["reps"]
            const vidHeartrate = document.getElementById("vidHeartrate")
            vidHeartrate.textContent = "Heartrate: " + stats[urls[0]]["heartrate"]
            const vidStretch = document.getElementById("vidStretch")
            vidStretch.textContent = "Stretch done: " + stats[urls[0]]["stretch"]
            const vidTime = document.getElementById("vidTime")
            vidTime.textContent = "Time spent: " + stats[urls[0]]["time"]
            metadatakinda.textContent = urls[0]
            currURL = 0



          })
          const moveRightPatientVideo = document.getElementById("moveRightPatientVideo")
          moveRightPatientVideo.addEventListener("click", function(){
            let curr = patientNameVideo.textContent
            currName = patientVidArr.indexOf(curr)
            if (currName == patientVidArr.length-1){
                currName = -1
            }
            for (let key in patients){
                if (patients[key]["name"] == patientVidArr[currName+1]){
                    id = key
                }
            }
            stats = patients[id]["stats"]
            urls = []
            for (let key in stats){
                urls.push(key)
            }
            patientNameVideo.textContent = patientVidArr[currName + 1]

            populateVideo(`${id}/${urls[0]}.mp4`)
            const vidDate = document.getElementById("vidDate")
            vidDate.textContent = "Date recorded: " + stats[urls[0]]["date"]
            const vidReps = document.getElementById("vidReps")
            vidReps.textContent = "Reps: " + stats[urls[0]]["reps"]
            const vidHeartrate = document.getElementById("vidHeartrate")
            vidHeartrate.textContent = "Heartrate: " + stats[urls[0]]["heartrate"]
            const vidStretch = document.getElementById("vidStretch")
            vidStretch.textContent = "Stretch done: " + stats[urls[0]]["stretch"]
            const vidTime = document.getElementById("vidTime")
            vidTime.textContent = "Time spent: " + stats[urls[0]]["time"]
            metadatakinda.textContent = urls[0]

            currURL = 0



          })
          
        }

        
      }).catch((error) => {
          console.log(error);
      });
    
})

stats.addEventListener("click", function(){
    particlesJS.setAttribute("style", "display: none")
    pranit.setAttribute("style", "display: none")
    statsContent.setAttribute("style", "display: block;")
    profileContent.setAttribute("style", "display:none;")
    managePatientsContent.setAttribute("style", "display: none;")
    plansContent.setAttribute("style", "display: none;")
    logsContent.setAttribute("style", "display: none")

    const database = getDatabase(app);

    get(ref(database, "patients/")).then((info) => {
        if (info.exists()){
          let patients = info.val()
          let patientsArr = []
          for (let key in patients){
              if (patients[key]["doctorID"] == doctorID){
                patientsArr.push(patients[key]["name"])
              }
          }
          let labelArr = []
          let heartRateArr = []
          let timesArr =  []
          let repsArr = []
          const patientNameStats = document.getElementById("patientNameStats")
          patientNameStats.textContent = patientsArr[0]
          for (let key in patients){
              if (patients[key]["name"] == patientsArr[0]){
                console.log(patients[key]["stats"])
                  for (let innerkey in patients[key]["stats"]){
                      labelArr.push(patients[key]["stats"][innerkey]["date"])
                      heartRateArr.push(patients[key]["stats"][innerkey]["heartrate"])
                      timesArr.push(patients[key]["stats"][innerkey]["time"])
                      repsArr.push(patients[key]["stats"][innerkey]["reps"])
                    
                    }
              }
          }
          createChart(labelArr, heartRateArr, repsArr, timesArr)
          const moveRightStats = document.getElementById("moveRightStats")
          moveRightStats.addEventListener("click", function(){
            let currName = patientNameStats.textContent
            let currIndex = patientsArr.indexOf(currName)
            if (currIndex == patientsArr.length-1){
                currIndex = -1

            }
            let labelArr = []
            let heartRateArr = []
            let timesArr =  []
            let repsArr = []
            patientNameStats.textContent = patientsArr[currIndex+1]
            for (let key in patients){
                if (patients[key]["name"] == patientsArr[currIndex+1]){
                  console.log(patients[key]["stats"])
                    for (let innerkey in patients[key]["stats"]){
                        labelArr.push(patients[key]["stats"][innerkey]["date"])
                        heartRateArr.push(patients[key]["stats"][innerkey]["heartrate"])
                        timesArr.push(patients[key]["stats"][innerkey]["time"])
                        repsArr.push(patients[key]["stats"][innerkey]["reps"])
                      
                      }
                }
            }
            createChart(labelArr, heartRateArr, repsArr, timesArr)

          })
          const moveLeftStats = document.getElementById("moveLeftStats")
          moveLeftStats.addEventListener("click", function(){
            let currName = patientNameStats.textContent
            let currIndex = patientsArr.indexOf(currName)
            if (currIndex == 0){
                currIndex = patientsArr.length

            }
            let labelArr = []
            let heartRateArr = []
            let timesArr =  []
            let repsArr = []
            patientNameStats.textContent = patientsArr[currIndex-1]
            for (let key in patients){
                if (patients[key]["name"] == patientsArr[currIndex-1]){
                  console.log(patients[key]["stats"])
                    for (let innerkey in patients[key]["stats"]){
                        labelArr.push(patients[key]["stats"][innerkey]["date"])
                        heartRateArr.push(patients[key]["stats"][innerkey]["heartrate"])
                        timesArr.push(patients[key]["stats"][innerkey]["time"])
                        repsArr.push(patients[key]["stats"][innerkey]["reps"])
                      
                      }
                }
            }
            createChart(labelArr, heartRateArr, repsArr, timesArr)
          })



         
        }

        
      }).catch((error) => {
          console.log(error);
      });

    
})