<script>
    
    emailbannerid = document.getElementById("emailbannerid");
    mainemailsender = document.getElementById("mainemailsender");
    mainemailsubject = document.getElementById("mainemailsubject");
    mainemailcontent = document.getElementById("mainemailcontent");
    username = document.getElementById("username");
    password = document.getElementById("password");
    loggedInUser = "";
    var data = {}

    // Init function
    
    function pushEmailFunction(loggedInUser){
    // Public IP with port, function as defined in server.js
        axios.get("http://98.148.80.97:5001/getEmails").then((res) => { 
            data = res.data
             //Put newest email to front (Needs implementation).
             var defaultemail = data.length-1;
              // data var, index is email, followed subobject is column
                mainemailsenderdata = `<p> Sender: ${data[defaultemail].useremail} </p>`
                mainemailsubjectdata = `<p> Subject: ${data[defaultemail].subject} </p>`
                mainemailcontentdata = `<p>${data[defaultemail].content} </p>`
        //}
        mainemailsender.innerHTML= mainemailsenderdata;
        mainemailsubject.innerHTML= mainemailsubjectdata;
        mainemailcontent.innerHTML= mainemailcontentdata;
        for (let i = data.length-1; i >= 0; i--){
            if(i == data.length-1){
            emailbannerid.innerHTML+= `<div class="emailnotification"
            onclick="showEmail(${data[i].emailid})"
            style="margin-top:3vh;">
            <bigemailheading>${data[i].useremail}</bigemailheading>
            <br><br>
            <smallemailheading>${data[i].subject}</smallemailheading></div>`
            ;
        }else{
            emailbannerid.innerHTML+= `<div class="emailnotification" 
            onclick="showEmail(${data[i].emailid})"
            >
            <bigemailheading style="">${data[i].useremail}</bigemailheading>
            <br><br>
            <smallemailheading>${data[i].subject}</smallemailheading></div>`
            ;
        }
        }
        })
    }
    function showEmail(emailid){
       console.log(emailid); 
       mainemailsenderdata = `<p> Sender: ${data[emailid-1].useremail} </p>`
        mainemailsubjectdata = `<p> Subject: ${data[emailid-1].subject} </p>`
        mainemailcontentdata = `<p>${data[emailid-1].content} </p>`
        mainemailsender.innerHTML= mainemailsenderdata;
        mainemailsubject.innerHTML= mainemailsubjectdata;
        mainemailcontent.innerHTML= mainemailcontentdata;
    }


    document.getElementById('inputform').onkeydown = function(e){
if(e.keyCode == 13){
		usernamestring = username.value;
		passwordstring = password.value;
		parseinput(usernamestring, passwordstring);
		keysound2.currentTime = 0;
		keysound2.play();
		keysound2.volume = .25;
    }
		else{
		keysound.currentTime = 0;
		keysound.volume = .25;
		keysound.play();
		}
    };


function parseinput(usernamestring, passwordstring){
    var loginData = { username : usernamestring, password : passwordstring }
    console.log(loginData);
    //Resetting login form
    username.value="";
    password.value="";
    axios.post("http://98.148.80.97:5001/login", loginData).then((res) => {
          console.log(res);
          console.log(res.data);
          if (res.data.success == true) { 
            loggedInUser = res.data.username;
        loginpage.style.visibility="hidden";
        emailpage.style.visibility="visible";
        pushEmailFunction(loggedInUser);
        }})
}



</script>