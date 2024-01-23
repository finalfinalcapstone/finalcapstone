"use strict"

async function allTransactionsLedger(e) {
    e.preventDefault();

    // Assuming getLoginData is defined somewhere
    const userData = await getLoginData();

    // Set up headers for the fetch request
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${userData.token}`
    };

    // Extract form data
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const description = document.getElementById('description').value;
    const vendor = document.getElementById('vendor').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const queryParams = new URLSearchParams({
        date,
        time,
        description,
        vendor,
        amount
    });

    try {
        // Send payment data to the server as query parameters in the URL
        const response = await fetch(`http://localhost:8080/transaction?${queryParams}`, {
            method: 'GET',
            headers
        });

        // Parse the server response
        const result = await response.json();

        console.log('Transaction result:', result);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}
