import k from "./initKaboom.js";
import { PHYS } from "./constants.js";
import { p1, p2 } from "./players.js";

const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});

let playerNumber;

const start = () => {
  document.addEventListener("keydown", keydown);

  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");

  newGameBtn.addEventListener("click", newGame);
  joinGameBtn.addEventListener("click", joinGame);

  function newGame() {
    playerNumber = 1;
    k.go("game");
  }

  function joinGame() {
    playerNumber = 2;
    k.go("game");
  }
};

start();

// define some constants

k.scene("game", () => {
  const players = [p1(), p2()];

  k.action(() => {
    socket.emit(
      "pos",
      players[playerNumber - 1].pos.x,
      players[playerNumber - 1].pos.y
    );
    socket.on("moveOtherPlayer", (x, y) => {
      players[playerNumber === 1 ? 1 : 0].moveTo(x, y);
    });
  });

  gravity(PHYS.GRAVITY);
  
  k.add([
    rect(width(), 100),
    outline(4),
    pos(-500, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  // action() runs every frame
  players[playerNumber - 1].action(() => {
    // center camera to player
    camPos(players[playerNumber - 1].pos);
    // check fall death
    if (players[playerNumber - 1].pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
  });

  k.keyDown("left", () => {
    players[playerNumber - 1].move(-PHYS.MOVE_SPEED, 0);
  });

  k.keyDown("right", () => {
    players[playerNumber - 1].move(PHYS.MOVE_SPEED, 0);
  });
});
