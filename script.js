const scriptURL = 'https://script.google.com/macros/s/AKfycbz1ESb-1Jnn4Li2mqylX1zq7QyggMoxSNpErABtc7HH5n-AXXIqlzTBZJSWowfKrRsD7w/exec';

function fetchDataFromSheet(sheetName) {
    const url = `${scriptURL}?action=getSheetData&sheetName=${sheetName}`;
    console.log("URL being fetched:", url); // This will log the complete URL

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched data:', data);
        })
        .catch(error => console.error('Error:', error));
}

// Function to update data in Google Sheets
function updateSheetData(sheetName, data) {
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateSheetData', sheetName: sheetName, data: data }),
        headers: new Headers({'Content-Type': 'application/json'})
    })
        .then(response => response.text())
        .then(result => {
            console.log('Success:', result);
            // Add logic for post-update actions, like refreshing data displayed
        })
        .catch(error => console.error('Error:', error));
}

// Function to display the 14-day rotation schedule
function displaySchedule() {
    // Logic to generate and display the schedule
    // Placeholder for schedule generation logic
}

// Function to handle adding/updating employee information
function manageEmployee(e) {
    e.preventDefault();
    // Logic to add/update employee in Google Sheets
    // Placeholder for employee management logic
}

// Function to assign roles to employees
function assignRole(e) {
    e.preventDefault();
    // Logic to assign roles based on 'Career Ladder' tab
    // Placeholder for role assignment logic
}

// Event listener for managing employee
document.getElementById('employee-form').addEventListener('submit', manageEmployee);

// Event listener for assigning roles
document.getElementById('role-assignment-form').addEventListener('submit', assignRole);

displaySchedule();
fetchDataFromSheet('Team');
