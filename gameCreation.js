import { game } from "./scenes.js";

let levelIndex = 3;

let playerNumber;
export const createGame = () => {
  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");
  newGameBtn.addEventListener("click", newGame());
  joinGameBtn.addEventListener("click", joinGame());

  function newGame() {
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
    }
    playerNumber = 1;
    game(playerNumber, levelIndex);
  }
  function joinGame() {
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
    }
    playerNumber = 2;
    game(playerNumber, levelIndex);
  }
};
