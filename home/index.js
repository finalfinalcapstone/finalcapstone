"use strict"

//global variables
let profileBio = document.querySelector('#profileBio');
let userData; 

// run when page loads
window.onload = init; 

function init(){
    var addBtn = document.getElementById("addBtn");
    addBtn.onclick = onAddBtnClicked;

    var subBtn = document.getElementById("subBtn");
    subBtn.onclick = onSubBtnClicked;

    var multiplyBtn = document.getElementById("multiplyBtn");
    multiplyBtn.onclick = onMultiplyBtn;

    var divisionBtn = document.getElementById("divisionBtn");
    divisionBtn.onclick = onDivisionBtn;

    fetchUserProfile();
}

// add button -- 
function onAddBtnClicked(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

   var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 + number2;
    answerField.value = sum;
}

// sub button -- 
function onSubBtnClicked(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 - number2;
    answerField.value = sum;
}

function onMultiplyBtn(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 * number2;

    answerField.value = sum;
}

function onDivisionBtn(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 / number2;
    
    answerField.value = sum;
}

// fetching userData 
async function fetchUserProfile() {
    try {
         userData = await getLoginData();

        // Set up headers for the fetch request
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        };

        const response = await fetch('http://localhost:8080/profile', {
            method: 'GET',
            headers: headers
        });

        const profileData = await response.json();
        if (profileData.firstName) {
            profileBio.querySelector('h2').innerText = `Welcome Back, ${profileData.firstName}!`;
        }
        console.log(profileData);
    } catch (error) {
        console.error('Error fetching', error.message);
    }
}


