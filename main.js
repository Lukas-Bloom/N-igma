import { PHYS, ANSWERS } from "./constants.js";
import { p1, p2 } from "./players.js";
import { levels, levelConf } from "./levels.js";

const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});

let playerNumber;
let keys = ''
let levelIndex = 6

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
  const level = addLevel(levels()[levelIndex], levelConf());

  const players = [p1(), p2()];
  const p = players[playerNumber - 1];
  const otherPlayer = players[playerNumber === 1 ? 1 : 0];
  let jumps;
  let isJumping = false;

  // network actions
  action(() => {
    socket.emit("pos", p.pos.x, p.pos.y);
    socket.on("moveOtherPlayer", (x, y) => {
      otherPlayer.moveTo(x, y);
    });
  });

  //player actions
  p.action(() => {
    camPos(p.pos);
    // check fall death
    if (p.pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
    checkIfGrounded();
  });

  pickupPowerup();
  handleCollision();

  //key events

  keyDown("left", () => {
    if (keyIsPressed("left")) {
      p.flipX(true);
      p.play("run");
    }
    if (p.slideRight > PHYS.SLIDE || p.isTeleSwap) {
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
    p.play("idle");
    if (p.slideRight > PHYS.SLIDE) {
      return;
    }
    if (p.isOnIce) {
      slideLeft();
    }
  });

  keyDown("right", () => {
    if (keyIsPressed("right")) {
      p.flipX(false);
      p.play("run");
    }
    if (p.slideLeft > PHYS.SLIDE || p.isTeleSwap) {
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
    p.play("idle");
    if (p.slideLeft > PHYS.SLIDE) {
      return;
    }
    if (p.isOnIce) {
      slideRight();
    }
  });

  keyPress("space", () => {
    if (p.jumps > 0 && !p.isJumping && !p.isTeleSwap) {
      p.jump(p.isOnSlime ? PHYS.SLIME_JUMP : null);
    }
  });

  keyRelease("space", () => {
    p.isJumping = false;
    p.jumps--;
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
        p.slideLeft = PHYS.SLIDE;
        p.slideRight = PHYS.SLIDE;
      }
    });

    p.collides("grass", () => {
      p.isOnIce = null;
      p.slideRight = null;
      p.slideLeft = null;
      p.isOnSlime = null;
    });

    p.collides("openedDoor", () => {
      levelIndex++
      go("win")
    });
    otherPlayer.collides("openedDoor", () => {
      levelIndex++
      go("win")
    });

    p.collides("slime", () => {
      p.isOnSlime = true;
    });

    p.collides("spikes", (s, side) => {
      if (side !== "bottom") {
        return;
      }
      go("lose");
    });

    p.collides("ghostblock", () => {


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


  p.collides("slime", () => {
    p.isOnSlime = true
  })

  p.on("ground", (obj) => {
    if (obj.is("tramp1")) trampHandler(obj, p)
  })
  otherPlayer.on("ground", (obj) => {
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

  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount;
      p.isJumping = false;
    }
  }

  function pickupPowerup() {
    p.collides("doublejump", (j) => {
      doubleJump(p, j)
    });
    otherPlayer.collides("doublejump", (j) => {
      doubleJump(otherPlayer, j)
    });

    p.collides("bigKey", (key) => {
      pickUpKey(key)
    });
    otherPlayer.collides("bigKey", (key) => {
      pickUpKey(key)
    });

    p.collides("teleSwap", (ts) => {
      teleSwap(ts)
    });
    otherPlayer.collides("teleSwap", (ts) => {
      teleSwap(ts)
    });
    p.collides("ghost", (g) => {
      pickupGhost(p, g)
      spawnGhostblocks()
    });
    otherPlayer.collides("ghost", (g) => {
      pickupGhost(otherPlayer, g)
    });
  }
  
  function spawnGhostblocks() {
    const ghostblks = get("invisibleBlock")
    for (let i = 0; i < ghostblks.length; i++) {
      destroy(ghostblks[i])
      level.spawn("G", ghostblks[i].gridPos.sub(0, 0));
    }
  }

  function doubleJump(onPlayer, obj) {
    destroy(obj)
    onPlayer.jumpsAmount = 2
  }

  function pickUpKey(obj) {
    keys += obj.name
    destroy(obj)
    if(keys === ANSWERS[levelIndex]) {
      const door = get("closedDoor")[0]
      destroy(door)
      level.spawn("O", door.gridPos.sub(0, 0));
      keys = ''
    }
  }
  function pickupGhost(onPlayer, obj) {
    destroy(obj)
    onPlayer.ghost = 1

  }

  function teleSwap(obj) {
    destroy(obj)
    
    const opDestx = p.pos.x
    const opDesty = p.pos.y
    const pDestx = otherPlayer.pos.x
    const pDesty = otherPlayer.pos.y

    setTimeout(function() {
      p.isTeleSwap = true
      otherPlayer.isTeleSwap = true
      swapPlayers(opDestx, opDesty, pDestx, pDesty)
    },50)
  }

  function swapPlayers(opDestx, opDesty, pDestx, pDesty) {
    gravity(0)
    let px = p.pos.x
    let py = p.pos.y
    let opx = otherPlayer.pos.x
    let opy = otherPlayer.pos.y
    if (!(px === pDestx && py === pDesty && opx === opDestx && opy === opDesty)) {

      const pk = (px - pDestx) === 0 ? 1 : Math.abs((py - pDesty) / (px - pDestx))
      const opk = (opx - opDestx) === 0 ? 1 : Math.abs((opy - opDesty) / (opx - opDestx))
      
      if(px > pDestx) {
        px = Math.max(px - PHYS.SWAP, pDestx)
      } else {
        px = Math.min(px + PHYS.SWAP, pDestx)
      }
      if(py < pDesty) {
        py = Math.min(py + pk * PHYS.SWAP, pDesty)
      } else {
        py = Math.max(py - pk * PHYS.SWAP, pDesty)
      }
      if (opx > opDestx) {
        opx = Math.max(opx - PHYS.SWAP, opDestx)
      } else {
        opx = Math.min(opx + PHYS.SWAP, opDestx)
      }
      if (opy < opDesty) {
        opy = Math.min(opy + opk * PHYS.SWAP, opDesty)
      } else {
        opy = Math.max(opy - opk * PHYS.SWAP, opDesty)
      }

      setTimeout(function () {
        p.moveTo(px, py);
        otherPlayer.moveTo(opx, opy)
        swapPlayers(opDestx, opDesty, pDestx, pDesty);
      }, 1000 / 60);
    } else {
      gravity(PHYS.GRAVITY)
      p.isTeleSwap = false
      otherPlayer.isTeleSwap = false
    }
  }


});

scene("lose", () => {
  add([
    text("You lose!"),
    pos(screen.width / 2 - 200, screen.height / 2),
    scale(1.5),
  ]);
  keyPress(() => go("game"));
});
  scene("win", () => {
    add([
      text("You Win!"),
    ]);
    keyPress(() => go("game"));

});
