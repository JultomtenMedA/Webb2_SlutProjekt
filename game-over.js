// Selecting elements from the document
var highscoreButton = document.querySelector("#highscoreButton");
var returnButton = document.querySelector("#returnButton");
var saveButton = document.querySelector("#saveButton");
var name = document.querySelector("#nameInput");
var score = document.querySelector("#score");

// Event listener to navigate to the highscore page
highscoreButton.addEventListener("click", () => {
    location.href = "highscore.html";
});

// Event listener to navigate back to the start page
returnButton.addEventListener("click", () => {
    location.href = "index.html";
});

// Retrieving accuracy, score, and highscores from local storage
const myAccuracy = localStorage.getItem('myAccuracy');
const myScore = localStorage.getItem('myScore');
var myHighscore = localStorage.getItem('myHighscore');

// Displaying the player's score and accuracy
score.innerHTML = "You got a score of " + myScore + " with an accuracy of " + myAccuracy + "%";

// ------------------------------------------------------------------------------------------------ //

// If no highscores are found, initialize an empty Set
if (myHighscore === null) {
    myHighscore = new Set();
} else {
    // If highscores exist, parse the JSON and convert to a Set
    myHighscore = new Set(JSON.parse(myHighscore));
}

// Sorting the top 10 scores based on score
var top10Scores = Array.from(myHighscore).sort((a, b) => b.score - a.score).slice(0, 10);

// Event listener to save the player's score
saveButton.addEventListener("click", () => {
    saveScore();
});

// Function to save the player's score to local storage
function saveScore() {
    // Retrieve the player's name from the input
    const playerName = name.value;

    // Check if a score with the same name, score, and accuracy already exists
    const existingScore = Array.from(myHighscore).find(item => item.name === playerName && item.score === myScore && item.accuracy === myAccuracy);

    if (existingScore) {
        // Display an alert if the exact name, score, and accuracy already exist
        alert("The exact Name, Score, and Accuracy already exist!");
    } else if (playerName !== "") {
        // If the name is not empty, add the new score to the highscores
        myHighscore.add({ name: playerName, score: myScore, accuracy: myAccuracy });

        // Update the top 10 scores and save to local storage
        top10Scores = Array.from(myHighscore).sort((a, b) => b.score - a.score).slice(0, 10);
        localStorage.setItem("myHighscore", JSON.stringify(top10Scores));

        // Display an alert indicating that the score has been saved
        alert("Your score has been saved!");
    }
}