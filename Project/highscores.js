// Function to retrieve high scores from local storage
function getHighScores() {
    // Check if high scores exist in local storage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  
    // Sort high scores in descending order (highest score first)
    highScores.sort((a, b) => b.score - a.score);
  
    return highScores;
  }
  
  // Function to display high scores in the HTML
  function displayHighScores() {
    const highScoresList = document.getElementById('high-scores-list');
    highScoresList.innerHTML = ''; // Clear previous content
  
    // Retrieve high scores from local storage
    const highScores = getHighScores();
  
    // Populate the high scores list
    highScores.forEach((scoreData, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `Player: ${scoreData.initials} - Score: ${scoreData.score}`;
      highScoresList.appendChild(listItem);
    });
  }
  
  
  // Call the function to display high scores when the page loads
  window.addEventListener('load', displayHighScores);

  function saveHighScore(initials, score) {
    const highScores = getHighScores();
  
    // Create a new high score entry
    const newHighScore = { initials, score };
  
    // Add the new entry to the high scores array
    highScores.push(newHighScore);
  
    // Save the updated high scores array to local storage
    localStorage.setItem('highScores', JSON.stringify(highScores));
  }
  
  