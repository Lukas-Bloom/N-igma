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
  let mainMenuDiv;
  let gamecodeDiv;

  if (!playerNumber) {
    mainMenuDiv = document.getElementById("mainMenuDiv");
    gamecodeDiv = document.getElementById("gamecodeDiv");
    codeInput = document.getElementById("codeInput");
    joinCode = document.getElementById("joinCode");
    newGameBtn = document.getElementById("newGameButton");
    joinGameBtn = document.getElementById("joinGameButton");
    joinGameBtn.addEventListener("click", joinGame, toggleDisplay(document.getElementById("mainMenuDiv")),toggleDisplay(document.getElementById("gamecodeDiv")));
    newGameBtn.addEventListener("click", newGame, toggleDisplay(document.getElementById("mainMenuDiv")),toggleDisplay(document.getElementById("gamecodeDiv")));
    
  }

  if (playerNumber === 1) newGame();

  function newGame() {
    socket.emit("startGame", getData("roooom"));
 
    socket.on("joinCode", (c) => {
      setData("roooom", c);
      if (joinCode) joinCode.append("Gamecode: ", c);
    });
    socket.on("init", () => {
      const otherPlayer = 2;
      const p = 1;
      let playerNumber = 1;
      setData("playerNumber", playerNumber);
      toggleDisplay(document.getElementById("mainMenuDiv"));
      toggleDisplay(document.getElementById("gamecodeDiv"));
      game(p, otherPlayer);
      
    });
  }

  function joinGame() {
    let code;
    code = document.getElementById("codeInput").value || getData("roooom");
    setData("roooom", code);
    socket.emit("joinGame", code);

    socket.on("wrongCode", (z) => {
      console.log("wrong code msg", z);
    });
    socket.on("tooManyP", () => {
      console.log("Room already full msg");
    });

    socket.on("init2", () => {
      const otherPlayer = 1;
      const p = 2;
      let playerNumber = 2;
      setData("playerNumber", playerNumber);
      game(p, otherPlayer);
      toggleDisplay(document.getElementById("mainMenuDiv"));
      toggleDisplay(document.getElementById("gamecodeDiv"));
    });
  }

  function toggleDisplay(obj) {
    var x = obj
    if (x.style.display === "none") x.style.display = "block"
    else x.style.display = "none"
  }

};
