import cardsData from "./data/cards-data.js";

let player1Name = document.getElementById("player1-name");
let player2Name = document.getElementById("player2-name");
let roundWinnerMessage = document.getElementById("round-winner-message");
let numberOfDrawsMessage = document.getElementById("number-of-draws");
let roundsCounterMessage = document.getElementsByClassName("rounds");
let player2PointsOnRoundMessage = document.getElementById("player2-points-on-round");
let player1PointsOnRoundMessage = document.getElementById("player1-points-on-round");
let player1PointsMessage = document.getElementById("player1-points");
let player2PointsMessage = document.getElementById("player2-points");
let drawButton = document.getElementById("draw-button");
let damageNumberUserMessage = document.getElementById("damage-number-user");
let damageNumberComputerMessage = document.getElementById("damage-number-computer");
let pokemonImageUserDraw = document.getElementById('pokemon-image-user')
let pokemonImageComputerDraw = document.getElementById('pokemon-image-computer');
let pokemonSvg = document.getElementsByClassName("pokemon-svg");


const cardsShuffle1 = document.getElementsByClassName("cards-center1");
const cardsShuffle2 = document.getElementsByClassName("cards-center2");
const cardsShuffle3 = document.getElementsByClassName("cards-center3");
const drawCardUser = document.getElementsByClassName("draw-card-user");
const drawCardComputer = document.getElementsByClassName("draw-card-computer");

class Player {
    constructor(name) {
        this.playerName = name;
        this.points = 0;
        this.pointsPerRound = 0;
    }
}

let nameOfPlayer = "Player 1";
let nameOfComputer = "Computer";
const humanPlayer = new Player(nameOfPlayer);
const computerPlayer = new Player(nameOfComputer);


class Game {
    constructor() {
        this.cards = cardsData;
        this.playedCardsHuman = [];
        this.playedCardsComputer = [];
        this.userPoints = humanPlayer.points;
        this.computerPoints = computerPlayer.points;
        this.userPointsPerRound = humanPlayer.pointsPerRound;
        this.computerPointsPerRound = computerPlayer.pointsPerRound;
        this.draws = 0;
        this.drawsPerRound = 0;
        this.rounds = 1;

        this.drawCardForUser = this.drawCardForUser.bind(this);
        this.drawCardForComputer = this.drawCardForComputer.bind(this);
        this.draw = this.draw.bind(this);
    }

    draw() {
        timeLineForCardsShuffle1.play();
        timeLineForCardsShuffle2.play();
        timeLineForCardsShuffle3.play();
        timeLineForCardsShuffle1.restart();
        timeLineForCardsShuffle2.restart();
        timeLineForCardsShuffle3.restart();


        drawButton.disabled = true;

        setTimeout(() => {
            timeLineForDrawCardUser.play();
            timeLineForDrawCardComputer.play();
            timeLineForDrawCardUser.restart();
            timeLineForDrawCardComputer.restart();
            tlPokemonImageUserDraw.play()
            tlPokemonImageUserDraw.restart()

            if (this.rounds === 4) {
                drawButton.disabled = true;

                if (game.userPoints > game.computerPoints) {
                    roundWinnerMessage.innerHTML = `${humanPlayer.playerName} wins the game`;
                } else if (game.computerPoints > game.userPoints) {
                    roundWinnerMessage.innerHTML = `${computerPlayer.playerName} wins the game`;
                }

                setTimeout(() => {
                    location.reload();
                }, 8000);
            }

            let getComputerSelection = this.drawCardForComputer();
            let getUserSelection = this.drawCardForUser();
            let damageOfComputerSelection = getComputerSelection[0].damage;
            let damageOfUserSelection = getUserSelection[0].damage;

            this.draws = ++this.draws;
            this.drawsPerRound = ++this.drawsPerRound;
            numberOfDrawsMessage.innerHTML = this.drawsPerRound;
            roundsCounterMessage[0].innerHTML = game.rounds;
            roundsCounterMessage[1].innerHTML = game.rounds;

            if (damageOfComputerSelection > damageOfUserSelection) {
                game.computerPoints = ++game.computerPoints;
                game.computerPointsPerRound = ++game.computerPointsPerRound;
                setTimeout(() => {
                    player2PointsOnRoundMessage.innerHTML = game.computerPointsPerRound;
                }, 2)
            } else if (damageOfComputerSelection < damageOfUserSelection) {
                game.userPoints = ++game.userPoints;
                game.userPointsPerRound = ++game.userPointsPerRound;
                setTimeout(() => {
                    player1PointsOnRoundMessage.innerHTML = game.userPointsPerRound;
                }, 2)
            }
            this.evalRound();
        }, 2500);

        setTimeout(() => {
            drawButton.disabled = false;
        }, 8000);
    }

    evalRound() {
        let starImg = document.createElement("IMG");
        starImg.src = "./assets/images/Bookmark.svg";
        starImg.style.width = "48px";

        if (this.draws % 3 == 0) {
            drawButton.disabled = true;
            this.rounds = ++this.rounds;
            this.drawsPerRound = 0;

            if (game.userPointsPerRound > game.computerPointsPerRound) {
                roundWinnerMessage.innerHTML = `${humanPlayer.playerName} wins`;
                player1PointsMessage.appendChild(starImg);
                player1PointsOnRoundMessage.innerHTML = game.userPointsPerRound;
            } else if (game.computerPointsPerRound > game.userPointsPerRound) {
                roundWinnerMessage.innerHTML = `${computerPlayer.playerName} wins`;
                player2PointsMessage.appendChild(starImg);
                player2PointsOnRoundMessage.innerHTML = game.computerPointsPerRound;
            }

            setTimeout(() => {
                game.computerPointsPerRound = 0;
                game.userPointsPerRound = 0;
                player1PointsOnRoundMessage.innerHTML = game.userPointsPerRound;
                player2PointsOnRoundMessage.innerHTML = game.computerPointsPerRound;
                roundWinnerMessage.innerHTML = ` `;
                game.computerPointsPerRound = 0;
                game.userPointsPerRound = 0;
                drawButton.disabled = false;
            }, 6000);
        }
    }

    drawCardForUser() {
        let shuffled = this.cards.sort(() => {
            return .5 - Math.random()
        });
        let selected = shuffled.slice(0, 1);

        damageNumberUserMessage.innerHTML = selected[0].damage;
        pokemonImageUserDraw.src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsHuman.push(selected);

        return selected;
    };

    drawCardForComputer = () => {
        let shuffled = this.cards.sort(() => {
            return .5 - Math.random()
        });
        let selected = shuffled.slice(0, 1);

        damageNumberComputerMessage.innerHTML = selected[0].damage;
        pokemonImageComputerDraw.src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsComputer.push(selected);

        return selected;
    };
}

const game = new Game(nameOfPlayer, nameOfComputer);

player1Name.innerHTML = humanPlayer.playerName;
player2Name.innerHTML = computerPlayer.playerName;
drawButton.addEventListener("click", game.draw);

function arrayRemove(arr, value) {
    arr.map((x) => {
        (x.name === value[0].name) ? arr.splice(x, 1) : '';
    });
}


/// ANIMATION ////

// Cards Shuffle
const timeLineForCardsShuffle1 = new TimelineMax({ paused: true });
const timeLineForCardsShuffle2 = new TimelineMax({ paused: true });
const timeLineForCardsShuffle3 = new TimelineMax({ paused: true });
const eachShuffleDuration = 2;

let shuffleCards1Path = {
    curviness: 2,
    values: [
        { y: 80, x: 300 },
        { y: -10, x: 10 },
        { y: 40, x: -60 },
        { y: -100, x: 50 },
        { y: 80, x: 297 },
    ]
}

let shuffleCards2Path = {
    curviness: 2,
    values: [
        { y: -1, x: 3 },
        { y: -10, x: 10 },
        { y: 10, x: -10 },
        { y: 100, x: -50 },
        { y: 80, x: -16 },
    ]
}

let shuffleCards3Path = {
    curviness: 2,
    values: [
        { y: -5, x: 5 },
        { y: -100, x: -50 },
        { y: 80, x: -266 },
    ]
}

timeLineForCardsShuffle1.to(cardsShuffle1, eachShuffleDuration, {
    bezier: shuffleCards1Path
})

timeLineForCardsShuffle2.to(cardsShuffle2, eachShuffleDuration, {
    bezier: shuffleCards2Path
})

timeLineForCardsShuffle3.to(cardsShuffle3, eachShuffleDuration, {
    bezier: shuffleCards3Path
})


// Drawn Cards
const timeLineForDrawCardUser = new TimelineMax({ paused: true });
const timeLineForDrawCardComputer = new TimelineMax({ paused: true });
const drawInitialCardDuration = 1;

timeLineForDrawCardUser
    .to(drawCardUser, drawInitialCardDuration, { y: 0, x: 0 })
    .to(drawCardUser, drawInitialCardDuration, { x: -1000, y: 150, delay: 4 })
    .to(drawCardUser, drawInitialCardDuration, { x: -1000, y: 1000 })
    .to(drawCardUser, 1.5, { x: 300, y: 800 })

timeLineForDrawCardComputer
    .to(drawCardComputer, drawInitialCardDuration, { y: 0, x: 0, delay: .3 })
    .to(drawCardComputer, drawInitialCardDuration, { x: 1000, y: 150, delay: 4.1 })
    .to(drawCardComputer, drawInitialCardDuration, { x: 1000, y: 1000 })
    .to(drawCardComputer, 1.5, { x: -300, y: 800 })

// Pokemon svg
const tlPokemonImageUserDraw = new TimelineMax({ paused: true });

tlPokemonImageUserDraw.set(pokemonSvg, { autoAlpha: 0 });

tlPokemonImageUserDraw
    .to(pokemonSvg, 1.5, { top: -80 })
    .to(pokemonSvg, 2, { autoAlpha: 1, ease: Linear.easeNone }, 0);

document.getElementsByTagName("body")[0].style.opacity = "1";