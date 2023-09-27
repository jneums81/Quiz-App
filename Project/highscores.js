// Function to retrieve high scores from local storage
function getHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    return highScores;
}

// Function to display high scores in the HTML
function displayHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = '';

    const highScores = getHighScores();

    highScores.forEach((scoreData, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Player: ${scoreData.initials} - Score: ${scoreData.score}`;

        // Add different background colors to alternate list items
        if (index % 2 === 0) {
            listItem.style.backgroundColor = '#f2f2f2'; // Light gray background
        } else {
            listItem.style.backgroundColor = '#e0e0e0'; // Slightly darker gray background
        }

        highScoresList.appendChild(listItem);
    });
}

// Call the function to display high scores when the page loads
window.addEventListener('load', displayHighScores);


  