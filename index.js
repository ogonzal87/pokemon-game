import cardsData from "./data/cards-data.js";

class Player {
    constructor(name) {
        this.playerName = name;
        this.points = 0;
    }
}

let nameOfPlayer = "Oscar";
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
        this.draws = 0
        this.rounds = 0;

        this.drawCardForUser = this.drawCardForUser.bind(this);
        this.drawCardForComputer = this.drawCardForComputer.bind(this);
        this.draw = this.draw.bind(this);
    }

    draw() {
        let getComputerSelection = this.drawCardForComputer();
        let getUserSelection = this.drawCardForUser();
        let damageOfComputerSelection = getComputerSelection[0].damage;
        let damageOfUserSelection = getUserSelection[0].damage;

        if (damageOfComputerSelection > damageOfUserSelection) {
            this.computerPoints = ++this.computerPoints;
            document.getElementById("player1-points").innerHTML = game.userPoints;
        } else {
            this.userPoints = ++this.userPoints;
            document.getElementById("player2-points").innerHTML = game.computerPoints;
        }

        this.draws = ++this.draws
        if (this.draws % 3 == 0) {
            this.rounds = ++this.rounds;
            document.getElementById("rounds").innerHTML = game.rounds;

            if (this.userPoints > this.computerPoints) {
                document.getElementById("winner-message").innerHTML = `${humanPlayer.playerName} wins this round!!`;
            } else if (this.computerPoints > this.userPoints) {
                document.getElementById("winner-message").innerHTML = `${computerPlayer.playerName} wins this round!!`;
            } else {
                document.getElementById("winner-message").innerHTML = `${computerPlayer.playerName} and ${humanPlayer.playerName} are tied!`;
            }
        }
    }

    drawCardForUser() {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
        let selected = shuffled.slice(0, 1);

        document.getElementById('pokemon-image-user').src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsHuman.push(selected);

        return selected;
    };

    drawCardForComputer = () => {
        let shuffled = this.cards.sort(() => { return .5 - Math.random() });
        let selected = shuffled.slice(0, 1);

        document.getElementById('pokemon-image-computer').src = `./assets/images/${selected[0].name}.svg`;

        arrayRemove(this.cards, selected);
        this.playedCardsComputer.push(selected);

        return selected;
    };
}

const game = new Game(nameOfPlayer, nameOfComputer);

document.getElementById("player1-name").innerHTML = humanPlayer.playerName;
document.getElementById("player2-name").innerHTML = computerPlayer.playerName;
document.getElementById("draw").addEventListener("click", game.draw);

const imagess = document.getElementById("image").innerHTML = cardsData[0].image;

console.log(imagess)

function arrayRemove(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === value[0].name) {
            arr.splice(i, 1);
            i--;
        }
    }
}
