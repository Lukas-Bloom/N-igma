import { PHYS } from "./constants.js";
import { p1, p2 } from "./players.js";
import { levels, levelConf } from "./levels.js";

const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});

let playerNumber;

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
  addLevel(levels()[3], levelConf());

  const players = [p1(), p2()];
  const p = players[playerNumber - 1];

  action(() => {
    socket.emit("pos", p.pos.x, p.pos.y);
    socket.on("moveOtherPlayer", (x, y) => {
      players[playerNumber === 1 ? 1 : 0].moveTo(x, y);
    });
  });

  // action() runs every frame
  p.action(() => {
    // center camera to player
    camPos(p.pos);
    // check fall death
    if (p.pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
  });

  keyDown("left", () => {
    p.flipX(true);
    p.play("run");
    if (p.slideRight > PHYS.SLIDE) {
      return;
    }
    if (p.slideLeft) {
      p.move(-p.slideLeft, 0);
      p.slideLeft = Math.min(
        p.slideLeft + p.slideLeft / PHYS.SLIDE,
        PHYS.MOVE_SPEED
      );
    } else {
      p.move(p.isOnSlime ? -PHYS.SLIME_MOVE_SPEED : -PHYS.MOVE_SPEED, 0);
    }
  });

  keyRelease("left", () => {
    if (p.slideRight > PHYS.SLIDE) {
      return;
    }
    if (p.isOnIce) {
      slideLeft();
    }
  });

  keyDown("right", () => {
    p.flipX(false);
    p.play("run");
    if (p.slideLeft > PHYS.SLIDE) {
      return;
    }
    if (p.slideRight) {
      p.move(p.slideRight, 0);
      p.slideRight = Math.min(
        p.slideRight + p.slideRight / PHYS.SLIDE,
        PHYS.MOVE_SPEED
      );
    } else {
      p.move(p.isOnSlime ? PHYS.SLIME_MOVE_SPEED : PHYS.MOVE_SPEED, 0);
    }
  });

  keyRelease("right", () => {
    if (p.slideLeft > PHYS.SLIDE) {
      return;
    }
    if (p.isOnIce) {
      slideRight();
    }
  });

  keyPress("space", () => {
    if (p.grounded()) {
      p.jump(p.isOnSlime ? PHYS.SLIME_JUMP : null);
    }
  });

  keyRelease("left", () => {
    p.stop();
    p.play("idle");
  });

  keyRelease("right", () => {
    p.stop();
    p.play("idle");
  });
  p.collides("ice", () => {
    if (p.isOnIce) {
      return;
    }
    p.isOnIce = true;

    if (keyIsDown("right")) {
      p.slideRight = PHYS.MOVE_SPEED;
      p.slideLeft = PHYS.SLIDE;
      slideRight();
    } else if (keyIsDown("left")) {
      p.slideLeft = PHYS.MOVE_SPEED;
      p.slideRight = PHYS.SLIDE;
      slideLeft();
    } else {
      p.slideLeft = PHYS.SLIDE
      p.slideRight = PHYS.SLIDE
    }
  });

  function slideRight() {
    if (p.slideRight > PHYS.SLIDE) {
      p.slideRight -= PHYS.SLIDE;
      p.move(p.slideRight, 0);
      setTimeout(function () {
        slideRight();
      }, 1000 / 60);
    }
  }

  function slideLeft() {
    if (p.slideLeft > PHYS.SLIDE) {
      p.slideLeft -= PHYS.SLIDE;
      p.move(-p.slideLeft, 0);
      setTimeout(function () {
        slideLeft();
      }, 1000 / 60);
    }
  }

  p.collides("grass", () => {
    p.isOnIce = null;
    p.slideRight = null;
    p.slideLeft = null;
    p.isOnSlime = null
  });

  p.collides("slime", () => {
    p.isOnSlime = true
  })

  p.on("ground", (obj) => {
    if (obj.is("tramp1")) trampHandler(obj, p)
  })
  players[playerNumber == 1 ? 1 : 0].on("ground", (obj) => {
    if (obj.is("tramp1")) trampHandler(obj, players[playerNumber == 1 ? 1 : 0])
  })

  function trampHandler(obj, onPlayer) {
    onPlayer.jump(PHYS.TRAMP_JUMP_HEIGHT)
    destroy(obj)
    const tramp = level.spawn("T", obj.gridPos.sub(0, 0))
    setTimeout(function () {
      destroy(tramp)
      level.spawn("t", tramp.gridPos.sub(0, 0))
    }, 500)
  }
});
