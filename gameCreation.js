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
 

export const addTutorialText = ()=> {
  if (getData("lvlIndex") === 0) {
    add([
      sprite("tutorialTxt1"),
      area(),
      pos(90, 210),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt2"),
      area(),
      pos(240, 230),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt3"),
      area(),
      pos(420, 230),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt4"),
      area(),
      pos(570, 180),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt5"),
      area(),
      pos(805, 255),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt6"),
      area(),
      pos(905, 155),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt7"),
      area(),
      pos(1105, 195),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt8"),
      area(),
      pos(1055, 275),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt9"),
      area(),
      pos(1210, 315),
      scale(0.5),
      z(4)
    ]);
    add([
      sprite("tutorialTxt10"),
      area(),
      pos(1360, 215),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt11"),
      area(),
      pos(1455, 175),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt12"),
      area(),
      pos(1620, 247),
      scale(0.5),
      z(-2)
    ]);
    add([
      sprite("tutorialTxt13"),
      area(),
      pos(1936, 185),
      scale(0.5),
      z(-2)
    ]);
  }
}
