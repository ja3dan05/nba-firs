// script.js

// Fetch NBA players' data
fetch('https://www.balldontlie.io/api/v1/players')
    .then(response => response.json())
    .then(data => {
        displayPlayers(data.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display players in a table
function displayPlayers(players) {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');

    // Create table header
    const headerRow = document.createElement('tr');
    const headers = ['First Name', 'Last Name', 'Position', 'Team'];
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

    // Populate table with player data
    players.forEach(player => {
        const row = document.createElement('tr');

        const firstNameCell = document.createElement('td');
        firstNameCell.textContent = player.first_name;
        row.appendChild(firstNameCell);

        const lastNameCell = document.createElement('td');
        lastNameCell.textContent = player.last_name;
        row.appendChild(lastNameCell);

        const positionCell = document.createElement('td');
        positionCell.textContent = player.position || 'N/A';
        row.appendChild(positionCell);

        const teamCell = document.createElement('td');
        teamCell.textContent = player.team.full_name;
        row.appendChild(teamCell);

        table.appendChild(row);
    });

    contentDiv.appendChild(table);
}
