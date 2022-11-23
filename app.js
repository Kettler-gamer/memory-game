const main = document.querySelector(".main-content");

const player1 = { name: "", score: 0 };
const player2 = { name: "", score: 0 };

function createMainPage() {
  main.innerHTML = `
    <article class="main-article">
        <h2 class="article-text">Spela mot andra</h2>
        <article class="article-pname-container">
            <h3>Spelare 1</h3>
            <input class="player-input" />
        </article>
        <article class="article-pname-container">
            <h3>Spelare 2</h3>
            <input class="player-input" />
        </article>
        <button class="article-button" onclick="onStartGameClick(event)">Starta spelet</button>
    </article>`;
}

function setPlayerNames(names) {
  player1.name = names[0].value;
  player2.name = names[1].value;
}

function onStartGameClick(event) {
  const mainArticle = document.querySelector(".main-article");
  const inputs = mainArticle.querySelectorAll(".player-input");
  setPlayerNames(inputs);

  console.log(player1);
  console.log(player2);

  createGameField();
}

function createCard(parent, index) {
  const button = document.createElement("button");
  button.className = "card";

  const img = document.createElement("img");
  img.src = "assets/images/Badanka " + index + ".jpeg";

  button.append(img);
  parent.append(button);
}

function createGameField() {
  main.innerHTML = `
  <div class="playfield">
    <b>Spelare X tur</b>
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
            <h4>Player 1 hittade anka !concept!</h4>
        </article>
        <button class="button" onclick="resetGame()">Återställ Spel</button>
        <button class="button" onclick="returnToMeny()">Avsluta</button>
    </div>`;

  const cards = main.querySelector(".cards");
  let arr = [
    1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12,
    12,
  ];
  for (let i = 0; i < 24; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomNum = arr[randomIndex];
    createCard(cards, randomNum);
    arr.splice(randomIndex, 1);
  }
}
// returns to main meny
function returnToMeny() {
  resetGameInfo();
  createMainPage();
}
// resets the game
function resetGame() {
  resetGameInfo();
  resetPlayerData();
}
// restarts all game info
function resetGameInfo() {
  createGameField();
}
// restarts all player info
function resetPlayerData() {
  player1.name = "";
  player1.score = 0;
  player2.name = "";
  player2.score = 0;
}
createMainPage();
