const playButton = document.querySelector("#play-button");
const highscoreButton = document.querySelector("#highscore-button");

let playing = false;
let intervalId;
let timer;
let circle;
let timesClicked = -1;
let score = 0;
let accuracy = 0;
const twentySeconds = 20;

class Circle {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    create() {
        const circle = document.createElement("button");
        circle.style.cssText = `width: ${this.radius}px; height: ${this.radius}px; border-radius: 50%; background-color: ${this.color}; margin: 0 auto; margin-top: ${this.y}px; margin-left: ${this.x}px;`;
        document.body.appendChild(circle);
        return circle
    }
}

class Text {
    constructor(tagName) {
        this.tagName = tagName;
    }

    create() {
        const element = document.createElement(this.tagName);
        element.style.cssText = "text-align: center; margin-top: 20px;";
        document.body.appendChild(element);
        return element;
    }
}

function play() {
    playButton.addEventListener("click", () => {
        startGame();
    });

    highscoreButton.addEventListener("click", () => {
        location.href = "highscore.html";
    });
}

function startGame() {

    const width = screen.width - 62;
    const height = screen.height - 311;
    
    countDown();

    setTimeout(() => {
        new Text("h1").create().innerHTML = "Click the Circles";
        gameTimer(twentySeconds);
        new Text("h2").create().innerHTML = "Score: " + score;
        circle = new Circle(Math.random() * width, Math.random() * height, 50, "#4CAF50").create();
        //circle = new Circle(width, height, 50, "#4CAF50").create();
    }, 3000);

    document.addEventListener("click", (event) => {
        if (event.target === circle) {
            score++;
            timesClicked++;
            accuracy = score / timesClicked;
            saveScore(score, accuracy);
            document.body.innerHTML = "";
            new Text("h1").create().innerHTML = "Click the Circles";
            new Text("h2").create().innerHTML = "Score: " + score;
            circle = new Circle(Math.random() * width, Math.random() * height, 50, "#4CAF50").create();
        } else if (event.target != circle) {
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
};

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
                clearInterval(intervalId);
                location.href = "game-over.html";
            }

        }, 1000);
    }
}

function countDown() {
    playing = true;
    document.body.innerHTML = "";
    new Text("h1").create().innerText = "You have 20 seconds";
    new Text("h1").create().innerText = "Starting in...";

    for (let i = 3; i >= 1; i--) {
        setTimeout(() => {
            document.body.innerHTML = "";
            new Text("h1").create().innerText = "You have 20 seconds";
            new Text("h1").create().innerText = "Starting in...";
            new Text("h2").create().innerText = i;
        }, (3 - i) * 1000);
    }

    setTimeout(() => {
        document.body.innerHTML = "";
        gameTimer(twentySeconds);
    }, 3000);
}

function saveScore(score = 0, accuracy) {
    accuracy = accuracy * 100;
    var roundedAccuracy = Math.ceil(accuracy)
    localStorage.setItem('myScore', score);
    localStorage.setItem('myAccuracy', roundedAccuracy);
}

play();