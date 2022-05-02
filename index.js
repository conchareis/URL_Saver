// 0. Get what we need from HTML
// 0.1 Getting the VARIABLES and CONSTANTS that we need from the HTML 

// 1. Get what we need from the LOCALSTORAGE
// 1.1 Get the URL from the LOCALSTORAGE and STORE it in a VARIABLE - URlFromLocalStorage
// 1.2 Check if URLFromLocalStorage is TRUTHY
// 1.2.1 If so, set myURL to its value and call renderURL()

// 2. Create a FUNCTION that store the CURRENT TAB when we click in the SAVE TAB BUTTON
// 2.1 Grab the URL of the CURRENT TAB
// 2.2 Add it to the myURL ARRAY
// 2.3 transform it into an STRINGand store it in the LOCALSTORAGE
// 2.4 And call renderURL()

// 3. Create a FUNCTION that RENDERS the URL that we have SAVED and creates a DELETE ICON so we can delete individualy each URL from our array
// 3.1 For each URL that we have SAVED, creat a SPAN element, a DELETE-ICON CLASS and an DATA-ID 
// 3.1.1 Insert them in our HTML LIST
// 3.2 Get all the elements with the CLASS DELETE-ICON and Iterate through each ELEMENT and add an EVENT LISTENER on CLICK 
// 3.2.1 When we CLICK on the DELETE-ICON we can DELETE individualy each SAVED URL
// 3.2.1.1 we will get the ID from the element that we want to DELETE
// 3.2.1.2 so this way we can also DELETE it from the LOCALSTORAGE
// 3.2.1.3 substitute our list with the new one, without the DELETED ITEMS

// 4. Create a FUNCTION that DELETES ALL the SAVED URL when the DELETE BUTTON is clicked
// 4.1 CLEARS the LOCALSTORAGE
// 4.2 Set our ARRAY to an EMPTY one
// 4.2.1 RENDERS our EMPTY ARRAY

// 5. Create a FUNCTION that SAVES the URL that we put in the INPUT when the SAVE INPUT BUTTON is clicked
// 5.1 only executes the FUNCTION if the input is different of EMPTY, which means, it only SAVES the iNPUT if it is not EMPTY
// 5.2 After saving, it CLEARS out the INPUT FIELD TEXT 
// 5.3 turn the ARRAY into a STRING so we can STORE it in the LOCALSTORAGE
// 5.4 RENDER out the new URL LIST
// 5.5 if the INPUT is EMPTY and we CLICK on the SAVE INPUT BUTTON, it shows the MODAL 

// 6. Two FUNCTIONS that are ACTIVATED when the TOGGLE BUTTON is ACTIVE 
// 6.1 the FUNCTION NIGHTDAY that ACTIVATES when the TOGGLE BUTTON is ACTIVE is to CHANGE all the COLORS of the HTML COMPONENTS, by ADDING the CLASS NIGHT
// 6.1.1 If the TOGGLE BUTTON is not ACTIVE the CLASS NIGHT is REMOVED from the HTML FILE
// 6.2 the FUNCTION SPANCOLOR that ACTIVATES when the TOGGLE BUTTON is ACTIVE is to CHANGE the COLOR of the SPANS that are ADDED to our file throw JAVASCRIPT in the FUNCTION RENDER()
// 6.2.1 if the TOGGLE BUTTON is ACTIVE, each SPANEL existent in the file will CHANGE its COLOR
// 6.2.2 if it is not ACTIVE it will RETURN to its initial COLOR

// 7. THE MODAL
// 7.1 GET the MODAL
// 7.2 GET the <SPAN> element that CLOSES the MODAL
// 7.3 When the user CLICKS on <SPAN> (X), CLOSE the MODAL
// 7.4 When the user CLICKES ANYWHERE OUTISDE of the MODAL, CLOSES IT

// 8. Get the Current Year 


//  0. Get what we need from HTML --------------------------------------------------------------------------------------------------------------------------------/
// 0.1 Getting the VARIABLES and CONSTANTS that we need from the HTML 
var myURL = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBTn = document.getElementById("tab-btn");
const colorEl = document.getElementById("color-el");
var spanEl = document.getElementsByClassName("span-el");

// 1. Get what we need from the LOCALSTORAGE ----------------------------------------------------------------------------------------------------------------------/
// 1.1 Get the URL from the LOCALSTORAGE and STORE it in a VARIABLE - URLFromLocalStorage
const URLFromLocalStorage = JSON.parse(localStorage.getItem("myURL"));

// 1.2 Check if URLFromLocalStorage is TRUTHY
if (URLFromLocalStorage) {
    myURL = URLFromLocalStorage; // 1.2.1 If so, set myURL to its value
    render(myURL); // And call renderURL()
}

// 2. Create a FUNCTION that store the CURRENT TAB when we click in the SAVE TAB BUTTON ---------------------------------------------------------------------------/
tabBTn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) { // 2.1 Grab the URL of the CURRENT TAB
        myURL.push(tabs[0].url); // 2.2 Add it to the myURL ARRAY
        localStorage.setItem("myURL", JSON.stringify(myURL)); // 2.3 transform it into an STRINGand store it in the LOCALSTORAGE
        render(myURL); // 2.4 And call renderURL()
    });
});

// 3. Create a FUNCTION that RENDERS the URL that we have SAVED and creates a DELETE ICON so we can delete individualy each URL from our array --------------------/
function render(URL) {
    var listItems = "";
    // 3.1 For each URL that we have SAVED, creat a SPAN element, a DELETE-ICON CLASS and an DATA-ID 
    for (var i = 0; i < URL.length; i++) {
        listItems += `
            <li data-id=${i}>
                <span class="span-el"> &#10022; </span>
                <a target='_blank' href='${URL[i]}'>
                    ${URL[i]}
                </a>
                <svg class="delete-icon" viewBox="0 0 20 20">
                <path id="x-color" fill="none" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path>
                </svg>
             </li> 
        `; // Template String format
    }
    ulEl.innerHTML = listItems; // 3.1.1 Insert them in our HTML LIST

    // 3.2 Get all the elements with the CLASS DELETE-ICON 
    const deleteIcons = document.querySelectorAll(".delete-icon");
    // and Iterate through each ELEMENT and add an EVENT LISTENER on CLICK 
    deleteIcons.forEach((deleteIcon) => {
        // 3.2.1 When we CLICK on the DELETE-ICON we can DELETE individualy each SAVED URL
        deleteIcon.addEventListener("click", function(event) {

            var elementoParaApagar = event.currentTarget.parentElement;

            // 3.2.1.1 we will get the ID from the element that we want to DELETE
            var indiceDoElementoParaApagar = elementoParaApagar.dataset.id;

            // 3.2.1.2 so this way we can also DELETE it from the LOCALSTORAGE
            ulEl.removeChild(elementoParaApagar);

            myURL.splice(indiceDoElementoParaApagar, 1);

            // 3.2.1.3 substitute our list with the new one, without the DELETED ITEMS
            localStorage.myURL = JSON.stringify(myURL);
        });
    });
}

// 4. Create a FUNCTION that DELETES ALL the SAVED URL when the DELETE BUTTON is clicked --------------------------------------------------------------------------/
deleteBtn.addEventListener("dblclick", function() {
    // 4.1 CLEARS the LOCALSTORAGE
    localStorage.clear();

    // 4.2 Set our ARRAY to an EMPTY one
    myURL = [];

    // 4.2.1 RENDERS our EMPTY ARRAY
    render(myURL);
});

// 5. Create a FUNCTION that SAVES the URL that we put in the INPUT when the SAVE INPUT BUTTON is clicked ---------------------------------------------------------/
inputBtn.addEventListener("click", function() {
    if (inputEl.value !== "") {
        // 5.1 only executes the FUNCTION if the input is different of EMPTY, which means, it only SAVES the iNPUT if it is not EMPTY
        myURL.push(inputEl.value);
        // 5.2 After saving, it CLEARS out the INPUT FIELD TEXT 
        inputEl.value = "";
        // 5.3 turn the ARRAY into a STRING so we can STORE it in the LOCALSTORAGE
        localStorage.setItem("myURL", JSON.stringify(myURL));
        // 5.4 RENDER out the new URL LIST
        render(myURL);
    } else {
        // 5.5 if the INPUT is EMPTY and we CLICK on the SAVE INPUT BUTTON, it shows the MODAL 
        modal.style.display = "block";
        // alert("You need to put a value firts");
    }
});

// 6. Two FUNCTIONS that are ACTIVATED when the TOGGLE BUTTON is ACTIVE -------------------------------------------------------------------------------------------/
colorEl.onclick = function() {
    nightDay();
    spanColor();
};

// 6.1 the FUNCTION NIGHTDAY that ACTIVATES when the TOGGLE BUTTON is ACTIVE is to CHANGE all the COLORS of the HTML COMPONENTS, by ADDING the CLASS NIGHT
function nightDay() {
    if (colorEl.checked) {
        document.querySelector("body").classList.add("night");
        document.body.style.backgroundColor = "rgb(108, 122, 137)";

        // inputEl.addEventListener("focus", function () {
        //   this.style.border = "2px solid rgb(171, 183, 183)";
        // });
    } else {
        // 6.1.1 If the TOGGLE BUTTON is not ACTIVE the CLASS NIGHT is REMOVED from the HTML FILE
        document.querySelector("body").classList.remove("night");
        document.body.style.backgroundColor = "rgb(171, 183, 183)";

        // inputEl.addEventListener("focus", function () {
        //   this.style.border = "2px solid rgb(108, 122, 137)";
        // });
    }
}


// 6.2 the FUNCTION SPANCOLOR that ACTIVATES when the TOGGLE BUTTON is ACTIVE is to CHANGE the COLOR of the SPANS that are ADDED to our file throw JAVASCRIPT in the FUNCTION RENDER()
function spanColor() {
    // 6.2.1 if the TOGGLE BUTTON is ACTIVE, each SPANEL existent in the file will CHANGE its COLOR
    for (var i = 0; i < spanEl.length; i++) {
        var span = spanEl[i];
        if (colorEl.checked) {
            span.style.color = "rgb(171, 183, 183)";
        } else {
            // 6.2.2 if it is not ACTIVE it will RETURN to its initial COLOR
            span.style.color = "rgb(108, 122, 137)";
        }
    }
}

// 7. THE MODAL ---------------------------------------------------------------------------------------------------------------------------------------------------/

// 7.1 GET the MODAL
var modal = document.getElementById("myModal");

// 7.2 GET the <SPAN> element that CLOSES the MODAL
var span = document.getElementsByClassName("close")[0];

// 7.3 When the user CLICKS on <SPAN> (X), CLOSE the MODAL
span.onclick = function() {
    modal.style.display = "none";
};

// 7.4 When the user CLICKES ANYWHERE OUTISDE of the MODAL, CLOSES IT
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// 8. Get the Current Year ----------------------------------------------------------------------------------------------------------------------------------------/

// document.getElementById("year").innerHTML = new Date().getFullYear();
year.innerHTML = new Date().getFullYear();

// THE END --------------------------------------------------------------------------------------------------------------------------------------------------------/