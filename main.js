import { PHYS } from "./constants.js";
import { p1, p2 } from "./players.js";
import { levels, levelConf } from "./levels.js";

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


scene("game", () => {
  gravity(PHYS.GRAVITY);
  
  // add level to scene
  addLevel(levels()[0], levelConf());

  const players = [p1(), p2()];
  const p = players[playerNumber - 1];
  let jumps;
  let isJumping = false;

// network actions
  action(() => {
    socket.emit("pos", p.pos.x, p.pos.y);
    socket.on("moveOtherPlayer", (x, y) => {
      players[playerNumber === 1 ? 1 : 0].moveTo(x, y);
    });
  });

  //player actions
  p.action(() => {

    camPos(p.pos);
    // check fall death
    if (p.pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
    checkIfGrounded()
  });

  pickupPowerup();
  handleCollision();




  //key events

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
    p.stop();
    p.play("idle");
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
    p.stop();
    p.play("idle");
    if (p.slideLeft > PHYS.SLIDE) {
      return;
    }
    if (p.isOnIce) {
      slideRight();
    }
  });

  keyPress("space", () => {
    if (p.jumps > 0 && !p.isJumping) {
      p.jump(p.isOnSlime ? PHYS.SLIME_JUMP : null);
    }
  });

  keyRelease("space", () => {
      p.isJumping = false
      p.jumps --
  });



  //misc funtions

  function handleCollision() {
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

    p.collides("grass", () => {
      p.isOnIce = null;
      p.slideRight = null;
      p.slideLeft = null;
      p.isOnSlime = null
    });

    p.collides("slime", () => {
      p.isOnSlime = true
    });

    p.collides("spikes", (s,side) => {
      if (side !== "bottom") {
        return
      }
      go("lose");
    });

  }


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
    p.collides("bigKey", (O) => {
      destroy(O)
  })}
});

scene("lose", () => {
  add([
    text("You Lose"),
  ]);
  keyPress(() => go("game"));
});

