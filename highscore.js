// Selecting elements from the document
var returnButton = document.querySelector("#returnButton");
var highscoreList = document.querySelector("#highscoreList");

// Event listener for the return button to navigate back to the start page
returnButton.addEventListener("click", () => {
    location.href = "startsida.html";
});

// Retrieving highscores from local storage
var myHighscore = localStorage.getItem('myHighscore');

// If no highscores are found, initialize an empty Set
if (myHighscore === null) {
    myHighscore = new Set();
} else {
    // If highscores exist, parse the JSON and convert to a Set
    myHighscore = new Set(JSON.parse(myHighscore));
}

// Sorting the top 10 scores based on score and accuracy
var top10Scores = Array.from(myHighscore).sort((a, b) => {
    // If scores are equal, prioritize accuracy
    if (a.score === b.score) {
        return b.accuracy - a.accuracy;
    }
    // Otherwise, prioritize scores
    return b.score - a.score;
}).slice(0, 10); // Extracting the top 10 scores

// Displaying the top 10 scores in the highscore list element
highscoreList.innerHTML = top10Scores.map(score => `<li>Name: ${score.name} - Score: ${score.score} - Accuracy: ${score.accuracy}%</li>`).join('');
