var highscoreButton = document.querySelector("#highscore-button");
var returnButton = document.querySelector("#return-button");
var saveButton = document.querySelector("#saveButton");
var name = document.querySelector("#nameInput");
var score = document.querySelector("#score")

highscoreButton.addEventListener("click", () => {
    location.href = "highscore.html";
});

returnButton.addEventListener("click", () => {
    location.href = "index.html";
});

const myAccuracy = localStorage.getItem('myAccuracy');
const myScore = localStorage.getItem('myScore');
var myHighscore = localStorage.getItem('myHighscore');

score.innerHTML = "You got a score of " + myScore + " with an accuracy of " + myAccuracy + "%";

// ------------------------------------------------------------------------------------------------ //

if (myHighscore === null) {
    myHighscore = new Set();
} else {
    myHighscore = new Set(JSON.parse(myHighscore));
}

var top10Scores = Array.from(myHighscore).sort((a, b) => b.score - a.score).slice(0, 10);

saveButton.addEventListener("click", () => {
    saveScore()
});

function saveScore() {
    const playerName = name.value;
    const existingScore = Array.from(myHighscore).find(item => item.name === playerName && item.score === myScore && item.accuracy === myAccuracy);
    if (existingScore) {
        alert("The exact Name, Score and Accuracy already exists!");
    } else if (playerName !== "") {
        myHighscore.add({ name: playerName, score: myScore, accuracy: myAccuracy });
        top10Scores = Array.from(myHighscore).sort((a, b) => b.score - a.score).slice(0, 10);
        localStorage.setItem("myHighscore", JSON.stringify(top10Scores));
        alert("Your score has been saved!");
    }
}
