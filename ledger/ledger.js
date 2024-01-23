window.onload() = init  

function init(
    fetchUserProfile();


)



async function fetchUserProfile() {
    try {
        const userData = await getLoginData();

        // Set up headers for the fetch request
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userData.token}`
        };

        // Get the table body to append rows
        const tableBody = document.querySelector('table tbody');

        try {
            // Make a GET request to your API endpoint
            const response = await fetch('http://localhost:8080/ledger', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add other headers if needed
                }
            });

            // Check if the response status is OK (200)
            if (response.ok) {
                // Parse the JSON data
                const data = await response.json();

                // Check if the data is an array
                if (Array.isArray(data)) {
                    // Loop through the data and append rows to the table
                    data.forEach(expense => {
                        // Create a new row
                        const row = tableBody.insertRow();

                        // Insert cells with data
                        row.insertCell().textContent = expense.date;
                        row.insertCell().textContent = expense.description;
                        row.insertCell().textContent = expense.vendor;
                        row.insertCell().textContent = expense.amount;
                    });
                } else {
                    console.error('Invalid data format received from the API');
                }
            } else {
                console.error('Error:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching data from the API:', error);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Call the fetchUserProfile function
