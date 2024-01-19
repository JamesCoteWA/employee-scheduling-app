const scriptURL = 'https://script.google.com/macros/s/AKfycbw7EZFGEaSAOhFrCrNNl66WHwyqEyO9_4lEE_erDtELpKEPHvSfOjpWjDQbeuxroiA73g/exec';

function fetchDataFromSheet(sheetName) {
    const url = `${scriptURL}?action=getSheetData&sheetName=${sheetName}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (sheetName === 'Team') {
                displayTeamData(data);
            }
            // Add similar conditions for other sheets if needed
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayTeamData(data) {
    // Assuming 'data' is an array of arrays, each representing a row in the sheet
    const teamContainer = document.getElementById('team-data-container'); // Ensure this element exists in HTML
    teamContainer.innerHTML = ''; // Clear existing data

    data.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const div = document.createElement('div');
        div.className = 'team-member';
        div.textContent = `Employee ID: ${row[0]}, Name: ${row[3]}`; // Example: using first and fourth columns
        teamContainer.appendChild(div);
    });
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
            // Handle post-update actions here
        })
        .catch(error => console.error('Error:', error));
}

// Function to display the 14-day rotation schedule
function displaySchedule() {
    // Add logic for displaying the schedule here
}

// Function to handle adding/updating employee information
function manageEmployee(e) {
    e.preventDefault();
    // Add logic to manage employees here
}

// Function to assign roles to employees
function assignRole(e) {
    e.preventDefault();
    // Add logic for role assignment here
}

// Event listeners
document.getElementById('employee-form').addEventListener('submit', manageEmployee);
document.getElementById('role-assignment-form').addEventListener('submit', assignRole);

// Function to toggle the hamburger menu
function toggleMenu() {
    const menuOverlay = document.getElementById('menu-overlay');
    menuOverlay.classList.toggle('hidden');
}

// Function to show a section and hide others
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
    document.getElementById('navigation').classList.add('hidden');
    document.getElementById('menu-overlay').classList.add('hidden');
}

// Close the menu when clicking outside
document.addEventListener('click', function(event) {
    const menuOverlay = document.getElementById('menu-overlay');
    const hamburgerMenu = document.getElementById('hamburger-menu');

    if (!menuOverlay.contains(event.target) && !hamburgerMenu.contains(event.target)) {
        menuOverlay.classList.add('hidden');
    }
});

// Initial calls
displaySchedule();
fetchDataFromSheet('Team');

function updateSheetData(sheetName, data) {
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ action: 'updateSheetData', sheetName: sheetName, data: data }),
        headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(response => response.text())
    .then(result => console.log('Update result:', result))
    .catch(error => console.error('Error updating data:', error));
}

function manageEmployee(e) {
    e.preventDefault();
    const employeeData = {
        // Gather data from form fields
        name: document.getElementById('employee-name').value,
        id: document.getElementById('employee-id').value,
        // ... gather other fields as necessary
    };

    updateSheetData('Team', employeeData);
}

function assignRole(e) {
    e.preventDefault();
    const roleData = {
        // Gather data from role assignment form fields
        employee: document.getElementById('employee-select').value,
        role: document.getElementById('role-select').value,
        // ... gather other fields as necessary
    };

    updateSheetData('Career Ladder', roleData);
}

function displaySchedule() {
    // Add your logic to calculate and display the schedule
    // This will depend on the specific logic you want to implement for the schedule
}

document.addEventListener('DOMContentLoaded', () => {
    fetchDataFromSheet('Team'); // Load initial data
    displaySchedule(); // Display the schedule
});

