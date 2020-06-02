const pictures = document.querySelector(".picDiv");
const upload = document.querySelector(".imgupload");
let card;
let name;

//fetch picture from backend
const getPictures = async (event) => {
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

document.addEventListener("DOMContentLoaded", getPictures);

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
const save = () => {
  window.location.reload();
};
document.querySelector(".save").addEventListener("click", save);

window.addEventListener("load", function (event) {
  card = document.getElementById("pic");
  name = card.getElementsByTagName("div");
});

//search function
const search = async () => {
  let input = document.querySelector(".picSearch");
  let filter = input.value.toUpperCase();
  for (i = 0; i < name.length; i++) {
    let a = name[i].getElementsByTagName("h5")[0];
    let txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      name[i].style.display = "";
    } else {
      name[i].style.display = "none";
    }
  }
};

document.querySelector(".picSearch").addEventListener("keyup", search);
