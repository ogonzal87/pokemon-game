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
            player2PointsOnRoundMessage.innerHTML = game.computerPointsPerRound;
        } else if (damageOfComputerSelection < damageOfUserSelection) {
            game.userPoints = ++game.userPoints;
            game.userPointsPerRound = ++game.userPointsPerRound;
            player1PointsOnRoundMessage.innerHTML = game.userPointsPerRound;
        }

        this.evalRound();
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
            }, 3000);
        }
    }

    drawCardForUser() {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
        let selected = shuffled.slice(0, 1);

        damageNumberUserMessage.innerHTML = selected[0].damage;
        pokemonImageUserDraw.src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsHuman.push(selected);

        return selected;
    };

    drawCardForComputer = () => {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
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
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === value[0].name) {
            arr.splice(i, 1);
            i--;
        }
    }
}

document.getElementsByTagName("body")[0].style.opacity = "1"
