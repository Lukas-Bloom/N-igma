import { game } from "./scenes.js";
import { socket } from "./socket.js";

socket.on("reLoad", () => {
  location.reload();
  console.log("reloadinggg");
});

export const spawnPlayers = (p1, p2) => {
  let startPlayers = get("startPlayer");
  if (startPlayers.length === 2) {
    p1.moveTo(startPlayers[0].pos);
    p2.moveTo(startPlayers[1].pos);
  }
};

export const createGame = () => {
  let playerNumber = getData("playerNumber");
  if (!getData("lvlIndex")) {
    setData("lvlIndex", 0);
    setData("roooom", getData("roooom") || "changeMe");
  }
  let codeInput;
  let joinCode;
  let newGameBtn;
  let joinGameBtn;

  if (!playerNumber) {
    codeInput = document.getElementById("codeInput");
    joinCode = document.getElementById("joinCode");
    newGameBtn = document.getElementById("newGameButton");
    joinGameBtn = document.getElementById("joinGameButton");
    joinGameBtn.addEventListener("click", joinGame);
    newGameBtn.addEventListener("click", newGame);
  }

  if (playerNumber === 1) newGame();

  if (playerNumber === 2) {
    setTimeout(() => {
      joinGame();
    }, 1000);
  }

  function newGame() {
    //console.log("42", getData("roooom"));
    socket.emit("startGame", getData("roooom"));
    if (document.getElementById("newGameButton"))
      document.getElementById("newGameButton").remove();
    if (document.getElementById("joinGameButton"))
      document.getElementById("joinGameButton").remove();
    if (document.getElementById("codeInput"))
      document.getElementById("codeInput").remove();

    socket.on("joinCode", (c) => {
      setData("roooom", c);
      if (joinCode) joinCode.append("Share this code: ", c);
    });
    socket.on("init", () => {
      const otherPlayer = 2;
      const p = 1;
      let playerNumber = 1;
      setData("playerNumber", playerNumber);

      game(p, otherPlayer);
      if (document.getElementById("joinCode")) {
        setTimeout(() => {
          document.getElementById("joinCode").remove();
        }, 10000);
      }
    });
  }

  function joinGame() {
    let code;
    code = document.getElementById("codeInput").value || getData("roooom");
    setData("roooom", code);
    socket.emit("joinGame", code);
    if (document.getElementById("newGameButton")) {
      newGameButton.remove();
    }
    socket.on("wrongCode", (z) => {
      console.log("wrong code msg", z);
    });
    socket.on("tooManyP", () => {
      console.log("Room already full msg");
    });

    socket.on("init2", () => {
      if (document.getElementById("joinGameButton"))
        document.getElementById("joinGameButton").remove();
      if (document.getElementById("codeInput"))
        document.getElementById("codeInput").remove();
      const otherPlayer = 1;
      const p = 2;
      let playerNumber = 2;
      setData("playerNumber", playerNumber);
      game(p, otherPlayer);
    });
  }
};
