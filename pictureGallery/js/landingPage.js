
const signoutButton = document.getElementById("signout-button");
const pictures = document.querySelector(".picDiv");
const upload = document.querySelector(".imgupload");
let card;
let name;


//code to signup, it is still not clear if 
 //store the poolID and clientappId values
        /* var poolData = {
            UserPoolId: "us-east-1_xXtMpRhG2", // Your user pool id here
            ClientId: "7uhrmii1e87ldijan3gh23o7k9" // Your client id here
        };
        

        //parse the normal poolData object as AWSCognito object
        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
            Username: localStorage.getItem("username"),
            Pool: userPool
        };
        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData); 
        cognitoUser.signOut();*/
//will put this on the signup page
//localStorage.clear()

//fetch picture from backend
/* const getPictures = async (event) => {
  event.preventDefault();
  const get = await fetch(
    "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json",
    {
      method: "GET",
    }
  );
  const response = await get.json();
  let output = "";

  response.forEach((post, index) => {
    output += `
   <div class="card mx-auto mb-3" style="width: 18rem;">
  <img class="card-img-top" src=${
    post.url
  } alt="Card image cap" style="height: 264px;">
  <span class="card-body">
    <h5 class="card-title">${`picture${index}`}</h5>
  </span>
</div>
    `;
  });
  pictures.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", getPictures); */

//upload picture function
const uploadImage = async (e) => {
  const file = e.target.files[0];
  console.log(file);
  if (file && file.type !== "image/jpeg" && file.type !== "image/png") {
    alert("Only Jpeg and Png images are allowed");
  } else {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadstart = () => {};
      reader.onloadend = (event) => {
        const base64Url = event.target.result;
        if (base64Url) {
          upload.innerHTML = `
          <img
                  src=${base64Url.toString()}
                  style="width: 150px; height: 150px; border-radius: 50%;"
                  alt=""
                  class="rounded-circle"
                />
          `;
        }
      };
    } else {
      alert("File could not be uploaded");
    }
  }
};
document.querySelector(".uploadfile").addEventListener("change", uploadImage);

//
const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

async function save() {
  var file = document.getElementById('FileId').files[0];
  var fileName = file.name;
  var filebase64 = await toBase64(file);
  var filebas64Data = filebase64.split(',')[1]
  sendData = {
    "filename": fileName,
    "body": filebas64Data
  };
  fetch("https://8jfhfumcs1.execute-api.us-east-1.amazonaws.com/prod/imageupload", {
    method: 'POST',
    body: JSON.stringify(sendData),
    mode: 'no-cors'
  })
  .then((response) => response.text())
  .then(result => {
    alert("image has been successfully added!");
    $('#exampleModal').modal('hide');
  })
  .catch((err) => {
    console.log('Error: ', err);
  })
  // window.location.reload();
};

document.querySelector(".save").addEventListener("click", save);

window.addEventListener("load", function (event) {
    card = document.getElementById("pic");
    name = card.getElementsByTagName("div");

    //test the jwt token on load
    console.log(localStorage.getItem("token"));

    //check if token is not in the local storage, will be redirected to the login page
});

//search function
const search = async () => {
  let input = document.querySelector(".picSearch");
  let filter = input.value;
  let queryString = filter.split(",");
  let counter = 1;
  let stringTag = "";
  for (i = 0; i < queryString.length; i++){
    let parameters = `tag${counter}=`;
    if (i === queryString.length-1)
    {
      stringTag = stringTag + parameters + queryString[i];
      counter++; 
    }
    else{
      stringTag = stringTag + parameters + queryString[i] + "&";
      counter++;
    }
    
  }
  console.log(stringTag);
  let url = `https://kvzce07oce.execute-api.us-east-1.amazonaws.com/prod/QueryHandler?${stringTag}`
  let response = await fetch(url);
  let result = await response.json();
  console.log(result);

  /*
  let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
let response = await fetch(url);

let commits = await response.json();*/ 
  /*https://kvzce07oce.execute-api.us-east-1.amazonaws.com/prod/QueryHandler 
  $.ajax({
    url:
      "https://kvzce07oce.execute-api.us-east-1.amazonaws.com/prod/QueryHandler",
    type: "GET",
    data: JSON.stringify(sendData),
    contentType: "application/json",
    dataType: "json",
    success: function (response) {
      if (response != 0) {
        console.log(response);
        alert(links)
      } else {
        alert("File Not Found!");
      }
    },
  }); */
 /*  for (i = 0; i < name.length; i++) {
    let a = name[i].getElementsByTagName("h5")[0];
    let txtValue = a.textContent || a.innerText;
    if (txtValue.indexOf(filter) > -1) {
      name[i].style.display = "";
    } else {
      name[i].style.display = "none";
    }
  } */
};



// window.location.reload();



document.querySelector(".picSearch").addEventListener("keyup", search);
