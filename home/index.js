"use strict"

//global variables
let profileBio = document.querySelector('#profileBio');
let userData; 
let paymentTransactionForm = document.getElementById('depositTransactionForm');
let depositFormBtn = document.getElementById('depositFormBtn');
let paymentFormBtn = documen.getElementById('paymentFormBtn');
let depositBtn = document.getElementById("depositBtn");
let paymentBtn = document.getElementById("paymentBtn");

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
    
    depositFormBtn.onclick = showDepositForm;

    paymentFormBtn.onclick = showPaymentForm;

    depositBtn.onclick = submitDepositForm;

    paymentBtn.onclick = submitPaymentForm;

    
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
        console.error('Error fetching', error);
    }
}

function showDepositForm() {
    if (paymentTransactionForm.style.display === "none") {
        paymentTransactionForm.style.display = "block";
    } else {
        paymentTransactionForm.style.display = "none";
    }
}

async function submitDepositForm(e) {
    e.preventDefault();

    // Assuming getLoginData is defined somewhere
    userData = await getLoginData();

    // Set up headers for the fetch request
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userData.token}`
    };

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const vendor = document.getElementById('vendor').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Ensure the date format matches the expected format by the server
    const depositData = {
        date: date, 
        time: time, 
        description: description,
        vendor: vendor,
        amount: amount
    };
    

    try {
        const response = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(depositData)
        });

        const result = await response.json();

        console.log('Transaction result:', result);
    } catch (error) {
        console.error('Error posting transaction:', error);
    }
}

function showPaymentForm() {
    if (paymentTransactionForm.style.display === "none") {
        paymentTransactionForm.style.display = "block";
    } else {
        paymentTransactionForm.style.display = "none";
    }
}

async function submitPaymentForm(e) {
    e.preventDefault();

    // Assuming getLoginData is defined somewhere
    userData = await getLoginData();

    // Set up headers for the fetch request
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userData.token}`
    };

    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const vendor = document.getElementById('vendor').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Ensure the date format matches the expected format by the server
    const paymentData = {
        date: date, 
        time: time, 
        description: description,
        vendor: vendor,
        amount: amount
    };
    

    try {
        const response = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(paymentData)
        });

        const result = await response.json();

        console.log('Transaction result:', result);
    } catch (error) {
        console.error('Error posting transaction:', error);
    }
}


async function submitPaymentForm(e) {
    e.preventDefault();

    // Assuming getLoginData is defined somewhere
    const userData = await getLoginData();

    // Set up headers for the fetch request
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${userData.token}`
    };

    // Extract form data
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const vendor = document.getElementById('vendor').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Ensure the date format matches the expected format by the server
    const paymentData = {
        date,
        time,
        description,
        vendor,
        amount
    };

    try {
        // Send payment data to the server
        const response = await fetch('http://localhost:8080/transaction', {
            method: 'POST',
            headers,
            body: JSON.stringify(paymentData)
        });

        // Parse the server response
        const result = await response.json();

        console.log('Transaction result:', result);
    } catch (error) {
        console.error('Error posting transaction:', error);
    }
}

