"use strict";

// global variables
let userData;
let paymentTransactionForm = document.getElementById('paymentTransactionForm');
let paymentBtn = document.getElementById("paymentBtn");
let displayRecentPayment = document.getElementById("displayRecentPayment");

window.onload = init;

function init() {
    paymentBtn.onclick = submitPaymentForm;
}

async function submitPaymentForm(e) {
    e.preventDefault();

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

        // After submitting the deposit, reload recent deposits
        loadRecentPayments();
    } catch (error) {
        console.error('Error posting transaction:', error);
    }
}

async function loadRecentPayments() {
    try {
        userData = await getLoginData();

        // Set up headers for the fetch request
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        };

        const response = await fetch('http://localhost:8080/transaction/payments', {
            method: 'GET',
            headers: headers
        });

        const paymentData = await response.json();

        // slice(0, 3)
        displayRecentPayments(paymentData);
    } catch (error) {
        console.error('Error fetching recent payments:', error);
    }
}

function displayRecentPayments(payments) {
    displayRecentPayment.innerHTML = '';

    payments.forEach(payments => {
        const paymentElement = document.createElement('div');
        paymentElement.innerHTML = `
            <p>ID: ${payments.id}</p>
            <p>Date: ${payments.date}</p>
            <p>Time: ${payments.time}</p>
            <p>Description: ${payments.description}</p>
            <p>Vendor: ${payments.vendor}</p>
            <p>Amount: ${payments.amount}</p>
            <hr>
        `;
        displayRecentPayment.appendChild(paymentElement);
    });
}