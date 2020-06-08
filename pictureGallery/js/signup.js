const firstNameForm = document.querySelector("#first_name");
const lastNameForm = document.querySelector("#last_name");
const emailForm = document.querySelector("#email");
const passwordForm = document.querySelector("#password1");
const submitButton = document.querySelector("#submit-button");


submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    //getting all values from the form
    const username = firstNameForm.value;
    const firstName = firstNameForm.value;
    const lastName = lastNameForm.value;
    const email = emailForm.value;
    const password = passwordForm.value;

    //validations for checking blank inputs!
    const arrayOfData = [firstName.trim(), lastName.trim(), email.trim(), password.trim()];
    if(arrayOfData.indexOf("") != -1){
        alert("Please enter all forms first!");
    }
    else{
        //this variable will store the pool and client ID from the cognito service
        var poolData = {
            UserPoolId: "us-east-1_hnsrBJV2h", 
            ClientId: "7t77m8pqo5k160jeko8416nou1",
        };

        //passing the user pool as an AmazonCognitoIdentity's object instance
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
        
        //storing all attributes objects to be passed into the cognito signup method
        var attributeList = [];
        
        //define the required attributes other than username and password
        var dataEmail = {
            Name: 'email',
            Value: email,
        };

        var dataGivenName = {
            Name: 'given_name',
            Value: firstName,
        };

        var dataFamilyName = {
            Name: 'family_name',
            Value: lastName,
        };
        
        //convert the data normal object to AmazonCognitoIdentity user attributes' object
        var attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
        var attributeGivenName = new AmazonCognitoIdentity.CognitoUserAttribute(dataGivenName);
        var attributeFamilyName = new AmazonCognitoIdentity.CognitoUserAttribute(dataFamilyName);
        
        //push attribute objects in the attribute list array
        attributeList.push(attributeEmail);
        attributeList.push(attributeGivenName);
        attributeList.push(attributeFamilyName);
        
        //signup code starts here
        userPool.signUp(username, password, attributeList, null, function(err,result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            var cognitoUser = result.user;
            console.log('user name is ' + cognitoUser.getUsername());
            alert("You have successfully signed up!, redirecting to the login page....");
            window.location.href = '../login.html';
        });
    }
    
})