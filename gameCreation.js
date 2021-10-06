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
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
      toggleDisplay(document.getElementById("mainMenu"));
      toggleDisplay(document.getElementById("gamecodeDiv"));
  }

    }
    socket.on("joinCode", (c) => {
      console.log(c);
      joinCode.append(c);
    });
    socket.on("init", (pNumber) => {
      console.log("pnumber", pNumber);
      const otherPlayer = 2;
      const p = pNumber;
      game(p, otherPlayer, levelIndex);
    });
  }
  function joinGame() {
    const code = codeInput.value;
    socket.emit("joinGame", code);
    if (document.getElementById("newGameButton")) {
      document.getElementById("newGameButton").remove();
      document.getElementById("joinGameButton").remove();
      toggleDisplay(document.getElementById("mainMenu"));
      toggleDisplay(document.getElementById("gamecodeDiv"));
    }

    socket.on("init2", (pNumber) => {
      console.log("pnumber", pNumber);
      const otherPlayer = 1;
      const p = pNumber;
      game(p, otherPlayer, levelIndex);
    });
  }
  function toggleDisplay(obj) {
    var x = obj
    if (x.style.display === "none") {
      x.style.display = "block";
      } else {
      x.style.display = "none";
      }
};
