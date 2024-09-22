/* script.js */

let playersData = [];

// Fetch NBA players' data (first 100 players)
fetch('https://www.balldontlie.io/api/v1/players?per_page=100')
    .then(response => response.json())
    .then(data => {
        playersData = data.data;
        displayPlayers(playersData);
        createTeamChart(playersData);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Function to display players in a table
function displayPlayers(players) {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content
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

// Add event listener for search input
document.getElementById('search').addEventListener('keyup', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredPlayers = playersData.filter(player =>
        player.first_name.toLowerCase().includes(searchTerm) ||
        player.last_name.toLowerCase().includes(searchTerm) ||
        player.team.full_name.toLowerCase().includes(searchTerm)
    );
    displayPlayers(filteredPlayers);
});

// Function to create a chart of team distribution
function createTeamChart(players) {
    const teamCounts = {};

    players.forEach(player => {
        const teamName = player.team.full_name;
        teamCounts[teamName] = (teamCounts[teamName] || 0) + 1;
    });

    const ctx = document.getElementById('teamChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(teamCounts),
            datasets: [{
                label: 'Number of Players',
                data: Object.values(teamCounts),
                backgroundColor: 'rgba(29, 66, 138, 0.5)',
                borderColor: 'rgba(29, 66, 138, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Display as a horizontal bar chart
            scales: {
                x: {
                    beginAtZero: true,
                    precision: 0
                },
                y: {
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 10
                        }
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
