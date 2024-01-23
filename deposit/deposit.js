"use strict";

// global variables
let userData;
let depositFormBtn = document.getElementById('depositFormBtn');
let depositBtn = document.getElementById("depositBtn");
let displayRecentDeposit = document.getElementById("displayRecentDeposit");

window.onload = init;

function init() {
    depositBtn.onclick = submitDepositForm;
}

async function submitDepositForm(e) {
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

        // After submitting the deposit, reload recent deposits
        loadRecentDeposits();
    } catch (error) {
        console.error('Error posting transaction:', error);
    }
}

async function loadRecentDeposits() {
    try {
        userData = await getLoginData();

        // Set up headers for the fetch request
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        };

        const response = await fetch('http://localhost:8080/transaction/deposits', {
            method: 'GET',
            headers: headers
        });

        const depositData = await response.json();

        // slice(0, 3)
        displayRecentDeposits(depositData);
    } catch (error) {
        console.error('Error fetching recent deposits:', error);
    }
}

function displayRecentDeposits(deposits) {
    displayRecentDeposit.innerHTML = '';

    deposits.forEach(deposit => {
        const depositElement = document.createElement('div');
        depositElement.innerHTML = `
            <p>ID: ${deposit.id}</p>
            <p>Date: ${deposit.date}</p>
            <p>Time: ${deposit.time}</p>
            <p>Description: ${deposit.description}</p>
            <p>Vendor: ${deposit.vendor}</p>
            <p>Amount: ${deposit.amount}</p>
            <hr>
        `;
        displayRecentDeposit.appendChild(depositElement);
    });
}