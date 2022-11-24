const main = document.querySelector(".main-content");

const player1 = { name: "", score: 0 };
const player2 = { name: "", score: 0 };

const players = [player1, player2];

const cardChoices = { choice1: null, choice2: null };

let currentPlayer = 0;

function createMainPage() {
  main.innerHTML = `
    <article class="main-article">
        <h2 class="article-text">Spela mot andra</h2>
        <article class="article-pname-container">
            <h3>Spelare 1</h3>
            <input class="player-input" placeholder="Skriv namn på spelare 1" />
        </article>
        <article class="article-pname-container">
            <h3>Spelare 2</h3>
            <input class="player-input" placeholder="Skriv namn på spelare 2" />
        </article>
        <button class="article-button" onclick="onStartGameClick(event)">Starta spelet</button>
    </article>`;
}

function setPlayerNames(names) {
  if (names[0].value == "") {
    player1.name = "Spelare 1";
  } else {
    player1.name = names[0].value;
  }
  if (names[1].value == "") {
    player2.name = "Spelare 2";
  } else {
    player2.name = names[1].value;
  }
}

function onStartGameClick(event) {
  const mainArticle = document.querySelector(".main-article");
  const inputs = mainArticle.querySelectorAll(".player-input");
  setPlayerNames(inputs);

  createGameField();
}

function switchPlayers(img1Src, img2Src) {
  cardChoices.choice1.addEventListener("click", onCardClick);
  cardChoices.choice2.addEventListener("click", onCardClick);
  img1Src.hidden = true;
  img2Src.hidden = true;
  currentPlayer = (currentPlayer + 1) % 2;
  main.querySelector(
    ".current-player"
  ).textContent = `Spelare ${players[currentPlayer].name} tur`;
}

function updateScore() {
  let score = players[currentPlayer].score;
  let scoreContainer = main.querySelector(".usersPoints-container");
  scoreContainer.querySelectorAll("h3")[
    currentPlayer
  ].textContent = `${players[currentPlayer].name} : ${score}`;
}

function checkPair() {
  img1Src = cardChoices.choice1.querySelector("img");
  img2Src = cardChoices.choice2.querySelector("img");

  if (img1Src.src == img2Src.src) {
    players[currentPlayer].score++;
    updateScore();

    handleHistory(players[currentPlayer].name, img1Src.name);

    cardChoices.choice1.disabled = true;
    cardChoices.choice2.disabled = true;
  } else {
    switchPlayers(img1Src, img2Src);
  }
  cardChoices.choice1 = null;
  cardChoices.choice2 = null;
}

function onCardClick(event) {
  if (cardChoices.choice2 != null) {
    return;
  }
  const button = event.target;
  button.removeEventListener("click", onCardClick);
  if (cardChoices.choice1 == null) {
    cardChoices.choice1 = button;
  } else {
    cardChoices.choice2 = button;
    setTimeout(checkPair, 2000);
  }

  button.querySelector("img").hidden = false;
}

function handleHistory(player, imgName) {
  const h4 = document.createElement("h4");

  h4.textContent = `${player} hittade ${imgName}`;

  const historyContainer = main.querySelector(".history-container");
  historyContainer.append(h4);
}

function createCard(parent, index, cardName) {
  const button = document.createElement("button");
  button.className = "card";
  button.addEventListener("click", onCardClick);

  const img = document.createElement("img");
  img.src = "assets/images/Badanka " + index + ".jpeg";
  img.className = "img";
  img.hidden = true;
  img.name = cardName;

  button.append(img);
  parent.append(button);
}

function createGameField() {
  main.innerHTML = `
  <div class="playfield">
    <b class="current-player">Spelare ${player1.name} tur</b>
    <div class="cards">
        </div>
    </div>
    <div class="gameinfo-container">
        <h2>Poäng</h2>
        <div class="usersPoints-container">
            <h3 class="player-score">${player1.name} : ${player1.score}</h3>
            <h3 class="player-score">${player2.name} : ${player2.score}</h3>
        </div>
        <article class="history-container">
            <h3>Historik</h3>
        </article>
        <button class="button" onclick="resetGame()">Återställ Spel</button>
        <button class="button" onclick="returnToMeny()">Avsluta</button>
    </div>`;
  randomizeCards();
}

function randomizeCards() {
  const cards = main.querySelector(".cards");
  const cardInfos = [
    [1, "Svart anka"],
    [1, "Svart anka"],
    [2, "Gul anka"],
    [2, "Gul anka"],
    [3, "Sjukhus anka"],
    [3, "Sjukhus anka"],
    [4, "Fjärils anka"],
    [4, "Fjärils anka"],
    [5, "Guld anka"],
    [5, "Guld anka"],
    [6, "Drak anka"],
    [6, "Drak anka"],
    [7, "Lila anka"],
    [7, "Lila anka"],
    [8, "Brat anka"],
    [8, "Brat anka"],
    [9, "Sköldpads anka"],
    [9, "Sköldpads anka"],
    [10, "Spindel anka"],
    [10, "Spindel anka"],
    [11, "Batman anka"],
    [11, "Batman anka"],
    [12, "Enhörnings anka"],
    [12, "Enhörnings anka"],
  ];
  for (let i = 0; i < 24; i++) {
    let randomIndex = Math.floor(Math.random() * cardInfos.length);
    let randomNum = cardInfos[randomIndex][0];
    createCard(cards, randomNum, cardInfos[randomIndex][1]);
    cardInfos.splice(randomIndex, 1);
  }
}

// returns to main meny
function returnToMeny() {
  if (cardChoices.choice2 != null) return;
  resetAllPlayerData();
  createMainPage();
  currentPlayer = 0;
}
// resets the game
function resetGame() {
  resetPlayerScore();
  createGameField();
  currentPlayer = 0;
}
// restarts all player info
function resetAllPlayerData() {
  resetPlayerName();
  resetPlayerScore();
}
function resetPlayerName() {
  player2.name = "";
  player1.name = "";
}
function resetPlayerScore() {
  player1.score = 0;
  player2.score = 0;
}
createMainPage();
