"use strict";

window.onload = init;

function init(){
    fetchUserProfile();
    
}



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
        const response = await fetch('http://localhost:8080/transaction/payments', {
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
