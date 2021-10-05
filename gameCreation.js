import { game } from "./scenes.js";
import { socket } from "./socket.js";
let levelIndex = 4;

export const createGame = () => {
  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");
  const codeInput = document.getElementById("codeInput");
  const joinCode = document.getElementById("joinCode");

  newGameBtn.addEventListener("click", newGame);
  joinGameBtn.addEventListener("click", joinGame);

  function newGame() {
    socket.emit("startGame");
    newGameBtn.remove();
    joinGameBtn.remove();
    codeInput.remove();

    socket.on("joinCode", (c) => {
      console.log(c);
      joinCode.append("Share this code: ", c);
    });
    socket.on("init", () => {
      const otherPlayer = 2;
      const p = 1;
      game(p, otherPlayer, levelIndex);
      setTimeout(()=>{joinCode.remove()},10000)
    });
  }
  function joinGame() {
    const code = codeInput.value;
    socket.emit("joinGame", code);
    if (document.getElementById("newGameButton")) {
      newGameButton.remove();
    }
    socket.on("wrongCode", () => {
      console.log("baaaaaaaaaaaaaadcodededede");
    });
    socket.on("tooManyP", () => {
      console.log("Room already full");
    });

    socket.on("init2", () => {
      if (document.getElementById("joinGameButton")) {
        joinGameButton.remove();
      }
      codeInput.remove();
      const otherPlayer = 1;
      const p = 2;
      game(p, otherPlayer, levelIndex);
    });
  }
};
