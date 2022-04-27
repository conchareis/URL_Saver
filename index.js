var myLeads = [];
// To push items into myleads we need it to be an array, because push only works that way. So, myleads needs to be an array, but to store thing on LocalStorage we need to later transform it into a String
// Because in LocalStorage everything needs to be a string. And that is why we will use the JSON.parcel: to transform the leads that we take from LocalStorage to be an array.

// myLeads.push("www.epiclead.com") // it doesnt work because it is a string, push only works on arrays. that is why we used up there the JSON.parcel

const inputEl = document.querySelector("#input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBTn = document.getElementById("tab-btn");

// Get the leads from the localStorage
// Store it in a variable, leadsFromLocalStorage
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")); // it will give us something like ["lead1", "lead2"] or null
// That is why we used up there the JSON.parcel

if (leadsFromLocalStorage) {
  // 1. Check if leadsFromLocalStorage is truthy
  myLeads = leadsFromLocalStorage; // 2. If so, set myLeads to its value
  render(myLeads); // 3. And call renderLeads()
}

tabBTn.addEventListener("click", function () {
  // 0. Create a function that store the current tab when we click in the Save my Tab Button
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    // 1. Grab the URL of the current tab
    myLeads.push(tabs[0].url); // 2. Add it to the myLeads Array
    localStorage.setItem("myLeads", JSON.stringify(myLeads)); // 3. transform it to an string and store it in the LocalStorage
    render(myLeads); // 4. And call renderLeads()
  });
});

function render(leads) {
  var listItems = "";
  for (var i = 0; i < leads.length; i++) {
    listItems += `
            <li data-id=${i}>
                <span class="span-el"> &#10022; </span>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <svg class="delete-icon" viewBox="0 0 20 20">
                <path id="x-color" fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
             </li>
        `; //Template String
  }
  ulEl.innerHTML = listItems;

  //Get all the elements with the class delete-icon
  const deleteIcons = document.querySelectorAll(".delete-icon");
  //Iterate through each element and add an event listener on click
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener("click", function (event) {
      //delete-item.parentElement remove

      var elementoParaApagar = event.currentTarget.parentElement;
      var indiceDoElementoParaApagar = elementoParaApagar.dataset.id;
      ulEl.removeChild(elementoParaApagar);

      myLeads.splice(indiceDoElementoParaApagar, 1);
      localStorage.myLeads = JSON.stringify(myLeads);
    });
  });
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
});

inputBtn.addEventListener("click", function () {
  if (inputEl.value !== "") {
    // se estiver diferente de vazio, ele faz a funcao
    myLeads.push(inputEl.value);
    inputEl.value = ""; // after saving, it clears out the input field text
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  } else {
    modal.style.display = "block";
    // alert("You need to put a value firts");
  }
});

const colorEl = document.getElementById("color-el");
var spanEl = document.getElementsByClassName("span-el");

colorEl.onclick = function () {
  nightDay();
  spanColor();
};

function nightDay() {
  if (colorEl.checked) {
    document.querySelector("body").classList.add("night");

    document.body.style.backgroundColor = "rgb(108, 122, 137)";

    // inputEl.addEventListener("focus", function () {
    //   this.style.border = "2px solid rgb(171, 183, 183)";
    // });
  } else {
    document.querySelector("body").classList.remove("night");

    document.body.style.backgroundColor = "rgb(171, 183, 183)";

    // inputEl.addEventListener("focus", function () {
    //   this.style.border = "2px solid rgb(108, 122, 137)";
    // });
  }
}

function spanColor() {
  for (var i = 0; i < spanEl.length; i++) {
    var span = spanEl[i];
    if (colorEl.checked) {
      span.style.color = "rgb(171, 183, 183)";
    } else {
      span.style.color = "rgb(108, 122, 137)";
    }
  }
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// localStorage.removeItem('image');

// 5 - Get the Current Year -------------------------------------------------------------------------------------------------------------------------------------------------/

// document.getElementById("year").innerHTML = new Date().getFullYear();
year.innerHTML = new Date().getFullYear();
