

document.addEventListener('DOMContentLoaded', function () {
    fetchLeaderboard();
});

function fetchLeaderboard() {
    fetch('/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardList = document.getElementById('leaderboard-list');
            leaderboardList.innerHTML = '';
            data.forEach(entry => {
                const listItem = document.createElement('li');
                listItem.textContent = `${entry.name}: ${entry.score}`;
                leaderboardList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

