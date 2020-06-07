//Store DOM elements in here
emailForm = document.querySelector("#email");
passwordForm = document.querySelector("#password1");
submitButton = document.querySelector("#submit-button");


//set listeners in here
submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    var dataArray = [emailForm.value, passwordForm.value];
    if (emailForm.value.length == 0 || passwordForm.value.length == 0){
        alert("Please fill all forms first!");
    }
    else{
        var sessionUserAttributes;

        //store authentication data inside an object with username and password as the required values
        var authenticationData = {
            Username: emailForm.value,
            Password: passwordForm.value
        };

        //parse the normal object as AmazonCognitoIdentity object
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        //store the poolID and clientappId values
        var poolData = {
            UserPoolId: "us-east-1_xXtMpRhG2", // Your user pool id here
            ClientId: "7uhrmii1e87ldijan3gh23o7k9" // Your client id here
        };

        //parse the normal poolData object as AWSCognito object
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
            Username: emailForm.value,
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
        
        //authenticate user by using userData values above
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function(result) {
                var accessToken = result.getAccessToken().getJwtToken();
                console.log(accessToken);
                window.location.href = '../landingpage.html';
                localStorage.setItem("token", accessToken);
                localStorage.setItem("username", emailForm.value);
                alert("Successfully logged in to the system!");
            },
        
            //error handling, when fails to authenticate, it will bring the user to the signup page
            onFailure: function(err) {
                if(err.message === "Incorrect username or password."){
                    window.location.href = '../signup.html';
                    alert("You are not registered yet!redirecting to the signup page...");
                }
                else{
                    alert(err.message || JSON.stringify(err));
                }
            },
            
            // this one will only be triggered when the status of userpool is FORCE_CHANGED_PASSWORD. 
            // in the usual scenario, this method is not required, but have to be included. Otherwise, the authentication method cannot run
            newPasswordRequired: function(userAttributes) {
                delete userAttributes.email_verified;

                // store userAttributes on global variable
                sessionUserAttributes = userAttributes;
                cognitoUser.completeNewPasswordChallenge(passwordForm.value, userAttributes, this);
            }
        });
    }
    
})