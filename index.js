import cardsData from "./data/cards-data.js";

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
            document.getElementById("draw-button").disabled = true;

            if (game.userPoints > game.computerPoints) {
                document.getElementById("round-winner-message").innerHTML = `${humanPlayer.playerName} wins the game`;
            } else if (game.computerPoints > game.userPoints) {
                document.getElementById("round-winner-message").innerHTML = `${computerPlayer.playerName} wins the game`;
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
        document.getElementById("number-of-draws").innerHTML = this.drawsPerRound;
        document.getElementsByClassName("rounds")[0].innerHTML = game.rounds;
        document.getElementsByClassName("rounds")[1].innerHTML = game.rounds;

        if (damageOfComputerSelection > damageOfUserSelection) {
            game.computerPoints = ++game.computerPoints;
            game.computerPointsPerRound = ++game.computerPointsPerRound;
            document.getElementById("player2-points-on-round").innerHTML = game.computerPointsPerRound;
        } else if (damageOfComputerSelection < damageOfUserSelection) {
            game.userPoints = ++game.userPoints;
            game.userPointsPerRound = ++game.userPointsPerRound;
            document.getElementById("player1-points-on-round").innerHTML = game.userPointsPerRound;
        }

        this.evalRound();
    }

    evalRound() {
        let img = document.createElement("IMG");
        img.src = "./assets/images/Bookmark.svg";
        img.style.width = "48px";

        if (this.draws % 3 == 0) {
            document.getElementById("draw-button").disabled = true;
            this.rounds = ++this.rounds;
            this.drawsPerRound = 0;

            if (game.userPointsPerRound > game.computerPointsPerRound) {
                document.getElementById("round-winner-message").innerHTML = `${humanPlayer.playerName} wins`;
                document.getElementById("player1-points").appendChild(img);
                document.getElementById("player1-points-on-round").innerHTML = game.userPointsPerRound;
            } else if (game.computerPointsPerRound > game.userPointsPerRound) {
                document.getElementById("round-winner-message").innerHTML = `${computerPlayer.playerName} wins`;
                document.getElementById("player2-points").appendChild(img);
                document.getElementById("player2-points-on-round").innerHTML = game.computerPointsPerRound;
            }

            setTimeout(() => {
                game.computerPointsPerRound = 0;
                game.userPointsPerRound = 0;
                document.getElementById("player1-points-on-round").innerHTML = game.userPointsPerRound;
                document.getElementById("player2-points-on-round").innerHTML = game.computerPointsPerRound;
                document.getElementById("round-winner-message").innerHTML = ` `;
                game.computerPointsPerRound = 0;
                game.userPointsPerRound = 0;
                document.getElementById("draw-button").disabled = false;
            }, 3000);
        }
    }

    drawCardForUser() {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
        let selected = shuffled.slice(0, 1);

        document.getElementById("damage-number-user").innerHTML = selected[0].damage;
        document.getElementById('pokemon-image-user').src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsHuman.push(selected);

        return selected;
    };

    drawCardForComputer = () => {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
        let selected = shuffled.slice(0, 1);

        document.getElementById("damage-number-computer").innerHTML = selected[0].damage;
        document.getElementById('pokemon-image-computer').src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsComputer.push(selected);

        return selected;
    };
}

const game = new Game(nameOfPlayer, nameOfComputer);

document.getElementById("player1-name").innerHTML = humanPlayer.playerName;
document.getElementById("player2-name").innerHTML = computerPlayer.playerName;
document.getElementById("draw-button").addEventListener("click", game.draw);

function arrayRemove(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === value[0].name) {
            arr.splice(i, 1);
            i--;
        }
    }
}
