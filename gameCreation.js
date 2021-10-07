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
  hideCanvas();

  showMenu();

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
    joinGameBtn.addEventListener("click", joinGame);
    newGameBtn.addEventListener("click", newGame);
  }

  if (playerNumber === 1) newGame();
  if (playerNumber === 2) {
    hideMenu();
    setTimeout(() => {
      joinGame();
    }, 1000);
  }
  const rlBtn = document.getElementById("rlBtn");
  const rgBtn = document.getElementById("rgBtn");

  rlBtn.addEventListener("click", rLvl);
  rgBtn.addEventListener("click", rGame);

  function rLvl() {
    location.reload();
  }
  function rGame() {
    localStorage.clear();
    location.reload();
  }

  function newGame() {
    socket.emit("startGame", getData("roooom"));

    socket.on("joinCode", (c) => {
      setData("roooom", c);
      if (joinCode) joinCode.append("Give this code to your friend:      ", c);
    });
    socket.on("init", () => {
      const otherPlayer = 2;
      const p = 1;
      let playerNumber = 1;
      setData("playerNumber", playerNumber);
      game(p, otherPlayer);
      hideMenu();
      showGamecode();
      showCanvas();
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
      hideMenu();
      hideGamecode();
      showCanvas();
    });
  }

  function showCanvas() {
    document.getElementsByTagName("canvas")[0].style.display = "block";
    document.getElementsByTagName("canvas")[0].style.margin = "0 auto";
  }

  function hideCanvas() {
    document.getElementsByTagName("canvas")[0].style.display = "none";
  }
  function hideMenu() {
    document.getElementById("mainMenuDiv").style.display = "none";
  }
  function showMenu() {
    document.getElementById("mainMenuDiv").style.display = "block";
  }
  function hideGamecode() {
    document.getElementById("gamecodeDiv").style.display = "none";
  }
  function showGamecode() {
    document.getElementById("gamecodeDiv").style.display = "block";
  }
};
