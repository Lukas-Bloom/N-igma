import {PHYS } from "./constants.js";
import { p1, p2 } from "./players.js";
import {levels,levelConf } from "./levels.js";

const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});

let playerNumber

const start = () => {
  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");

  newGameBtn.addEventListener("click", newGame);
  joinGameBtn.addEventListener("click", joinGame);

  function newGame() {
    playerNumber = 1;
    go("game");
  }

  function joinGame() {
    playerNumber = 2;
    go("game");
  }
};

start();

// define some constants


scene("game", () => {
  gravity(PHYS.GRAVITY);
  
  // add level to scene
  //  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
  addLevel(levels()[0], levelConf());

  const players = [p1(), p2()];
  const p = players[playerNumber - 1];
  let jumps;
  let isJumping = false;

  action(() => {
    socket.emit(
      "pos",
      players[playerNumber - 1].pos.x,
      players[playerNumber - 1].pos.y
    );
    socket.on("moveOtherPlayer", (x, y) => {
      players[playerNumber === 1 ? 1 : 0].moveTo(x, y);
    });
  });

  // action() runs every frame
  players[playerNumber - 1].action(() => {
    // center camera to player
    camPos(players[playerNumber - 1].pos);
    // check fall death
    if (players[playerNumber - 1].pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
    checkIfGrounded()
  });

  pickupPowerup();

  keyDown("left", () => {
    players[playerNumber - 1].move(-PHYS.MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    players[playerNumber - 1].move(PHYS.MOVE_SPEED, 0);
  });

  keyPress("space", () => {
    if (p.jumps > 0 && !p.isJumping) {
      p.jump();
    }
  });

  keyRelease("space", () => {
      p.isJumping = false
      p.jumps --
  });









  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount
      p.isJumping = false
    }
  }

  
  function pickupPowerup() {
    p.collides("doublejump", (j) => {
      destroy(j)
      p.jumpsAmount = 2
    });
  }

  

});
