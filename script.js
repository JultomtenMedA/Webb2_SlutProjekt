// Selecting the play and highscore buttons from the document
const playButton = document.querySelector("#play-button");
const highscoreButton = document.querySelector("#highscore-button");

// Variables to track game state and data
let playing = false;
let intervalId;
let timer;
let circle;
let timesClicked = -1; // Initial value to distinguish the first click
let score = 0;
let accuracy = 0;
const twentySeconds = 20;

// Class representing a Circle object
class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    // Method to create and return a element representing the circle
    create() {
        const circle = document.createElement("button");
        circle.style.cssText = `width: ${this.radius}px; height: ${this.radius}px; border-radius: 50%; background-color: ${this.color}; margin: 0 auto; margin-top: ${this.y}px; margin-left: ${this.x}px;`;
        document.body.appendChild(circle);
        return circle;
    }
}

// Class representing a generic text element
class Text {
    constructor(tagName) {
        this.tagName = tagName;
    }

    // Method to create and return a element representing the text
    create() {
        const element = document.createElement(this.tagName);
        element.style.cssText = "text-align: center; margin-top: 20px;";
        document.body.appendChild(element);
        return element;
    }
}

// Function to initialize the game when the play button is clicked
function play() {
    playButton.addEventListener("click", () => {
        startGame();
    });

    highscoreButton.addEventListener("click", () => {
        // Redirect to the highscore page when highscore button is clicked
        location.href = "highscore.html";
    });
}

// Function to start the game
function startGame() {
    // Adjusting the game dimensions based on the screen size
    const width = screen.width - 62;
    const height = screen.height - 311;

    // Display countdown and start the game after 3 seconds
    countDown();

    setTimeout(() => {
        new Text("h1").create().innerHTML = "Click the Circles";
        gameTimer(twentySeconds);
        new Text("h2").create().innerHTML = "Score: " + score;
        // Create a random circle on the screen
        circle = new Circle(Math.random() * width, Math.random() * height, 50, "#4CAF50").create();
    }, 3000);

    // Event listener to handle clicks during the game
    document.addEventListener("click", (event) => {
        if (event.target === circle) {
            // If the clicked element is the circle, update score and create a new circle
            score++;
            timesClicked++;
            accuracy = score / timesClicked;
            saveScore(score, accuracy);
            document.body.innerHTML = "";
            new Text("h1").create().innerHTML = "Click the Circles";
            new Text("h2").create().innerHTML = "Score: " + score;
            circle = new Circle(Math.random() * width, Math.random() * height, 50, "#4CAF50").create();
        } else if (event.target != circle) {
            // If the clicked element is not the circle, update accuracy and score
            if (timesClicked === -1) {
                score = 0;
                accuracy = 0;
                timesClicked++;
                saveScore(score, accuracy);
            } else {
                timesClicked++;
                accuracy = score / timesClicked;
                saveScore(score, accuracy);
            }
        }
    });
}

// Function to handle the game timer
function gameTimer(duration) {
    if (!timer) {
        timer = duration;
        intervalId = setInterval(function () {
            let seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? "0" + seconds : seconds;

            if (--timer < 0) {
                timer = duration;
            }

            if (timer == 0) {
                // If the timer reaches zero, end the game and redirect to the game-over page
                clearInterval(intervalId);
                location.href = "game-over.html";
            }
        }, 1000);
    }
}

// Function to handle the countdown before starting the game
function countDown() {
    playing = true;
    document.body.innerHTML = "";
    new Text("h1").create().innerText = "You have 20 seconds";
    new Text("h1").create().innerText = "Starting in...";

    // Display countdown numbers with a delay
    for (let i = 3; i >= 1; i--) {
        setTimeout(() => {
            document.body.innerHTML = "";
            new Text("h1").create().innerText = "You have 20 seconds";
            new Text("h1").create().innerText = "Starting in...";
            new Text("h2").create().innerText = i;
        }, (3 - i) * 1000);
    }

    // Start the game timer after the countdown
    setTimeout(() => {
        document.body.innerHTML = "";
        gameTimer(twentySeconds);
    }, 3000);
}

// Function to save the score and accuracy to local storage
function saveScore(score = 0, accuracy) {
    accuracy = accuracy * 100;
    var roundedAccuracy = Math.ceil(accuracy);
    localStorage.setItem('myScore', score);
    localStorage.setItem('myAccuracy', roundedAccuracy);
}

play();
