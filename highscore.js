var returnButton = document.querySelector("#returnButton");
var highscoreList = document.querySelector("#highscoreList");

returnButton.addEventListener("click", () => {
    location.href = "index.html";
});

var myHighscore = localStorage.getItem('myHighscore');
if (myHighscore === null) {
    myHighscore = new Set();
} else {
    myHighscore = new Set(JSON.parse(myHighscore));
}

var top10Scores = Array.from(myHighscore).sort((a, b) => {
    if (a.score === b.score) {
        return b.accuracy - a.accuracy;
    }
    return b.score - a.score;
}).slice(0, 10);

highscoreList.innerHTML = top10Scores.map(score => `<li>Name: ${score.name} - Score: ${score.score} - Accuracy: ${score.accuracy}%</li>`).join('');