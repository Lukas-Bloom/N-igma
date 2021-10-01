import { game } from "./scenes.js";

let levelIndex = 0;

export const spawnPlayers = (p1, p2) => {
  let startPlayers = get("startPlayer")
  if (startPlayers.length === 2) {
    p1.moveTo(startPlayers[0].pos)
    p2.moveTo(startPlayers[1].pos)
  }
}

export const createGame = () => {
  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");
  newGameBtn.addEventListener("click", newGame);
  joinGameBtn.addEventListener("click", joinGame);

  function newGame() {
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
    }
    const p = 1;
    const otherPlayer = 2;
    game(p, otherPlayer, levelIndex);
  }
  function joinGame() {
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
    }
    const p = 2;
    const otherPlayer = 1;
    game(p, otherPlayer, levelIndex);
  }
};
