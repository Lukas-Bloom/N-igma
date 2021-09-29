import { PHYS, ANSWERS } from "./constants.js";
import { p1, p2 } from "./players.js";
import { levels, levelConf } from "./levels.js";

const socket = io("ws://localhost:3000"); //change the address to the ip server in the LAN. 
socket.on("init", (msg) => {
  console.log(msg);
});

let playerNumber;
let keys = ''
let levelIndex = 13


const start = () => {
  const newGameBtn = document.getElementById("newGameButton");
  const joinGameBtn = document.getElementById("joinGameButton");

  newGameBtn.addEventListener("click", newGame);
  joinGameBtn.addEventListener("click", joinGame);

  function newGame() {
    document.getElementById("newGameButton").remove();
    document.getElementById("joinGameButton").remove();
    playerNumber = 1;
    go("game");
  }

  function joinGame() {
    document.getElementById("newGameButton").remove();
    document.getElementById("joinGameButton").remove();
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
    let campos = camPos(width()/2, height()/2)
  
    if(p.pos.x <= campos.x){
      campos = camPos(width()/2, height()/2)
    } else if(p.pos.x >= LEVEL_LENGTH[levelIndex]) {
      campos = camPos(LEVEL_LENGTH[levelIndex], height()/2)
    } else {
      campos = camPos(p.pos.x, height()/2)
    }
    // check fall death
    if (p.pos.y >= PHYS.FALL_DEATH) {
      go("lose");
    }
    checkIfGrounded();
    if(p.currentPowerUp !== "ghost") {
      destroyAllGhostBlocks()
    }
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
      p.jump(p.isOnSlime ? PHYS.SLIME_JUMP : PHYS.JUMP_HEIGHT);
      play("sound-jump");
    }
  });

  keyRelease("space", () => {
    p.isJumping = false;
    p.jumps--;
  });

  keyPress("shift", () => {
    if(p.currentPowerUp !== "dash") return

    if (keyIsDown("right") || keyIsDown("left")) {
      const dir = keyIsDown("left") ? -1 : 1
      p.currentPowerUp = "dashCooldown"
      const xStart = p.pos.x
      p.move(4000 * dir, 0)
      const xEnd = p.pos.x
      
      let ii = 0
      for(let i = xStart * dir; i < xEnd * dir - 22; i += 22) {
        ii++
        add([
          pos(p.pos.x - 22*ii*dir, p.pos.y - 17),
          sprite("beanDash" ,{flipX: (dir === -1 ? true : false)}),
          color(p.color),
          opacity(0.5),
          lifespan(0.45 - 0.1*ii),
        ]);
      }
      setTimeout(function () {
        if (p.currentPowerUp === "dashCooldown") {
          p.currentPowerUp = "dash"
        }
      }, 3000)
    } 
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
      play("sound-door");
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

    collides("player", "invisibleBlock", (player, invisibleBlock) => {
      if(invisibleBlock.is("player")) return
      if(player.currentPowerUp === "ghost") {
        swapGhostBlocks(invisibleBlock)
      }
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
    if(!obj.is("ice")) {
      p.isOnIce = null;
      p.slideRight = null;
      p.slideLeft = null;
    }
    if(!obj.is("slime")) {
      p.isOnSlime = null;
    }
  })
  otherPlayer.on("ground", (obj) => {
    if (obj.is("tramp1")) trampHandler(obj, players[playerNumber == 1 ? 1 : 0])
  })

  function trampHandler(obj, onPlayer) {
    onPlayer.jump(PHYS.TRAMP_JUMP_HEIGHT)
    play("sound-jump");
    destroy(obj)
    const tramp = level.spawn("T", obj.gridPos.sub(0, 0))
    setTimeout(function () {
      destroy(tramp)
      level.spawn("t", tramp.gridPos.sub(0, 0))
    }, 250)
  }

  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount;
      p.isJumping = false;
    }
  }

  function pickupPowerup() {
    function isCorrectCollision(player, obj) {
      if (obj.is("player") || player.isTeleSwap) return false
      return true
    }

    collides("player", "powerUp", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return
      let powerUp = ''
      play("sound-powerup2");

      if (obj.is("doublejump")) powerUp = "doublejump"
      else if (obj.is("grow")) powerUp = "grow"
      else if(obj.is("shrink")) powerUp = "shrink"
      else if(obj.is("dash")) powerUp = "dash"
      else if (obj.is("ghost")) {
        powerUp = "ghost"
        if(player === p) {
          spawnGhostblocks()
        }
      }

      player.changePowerUp(powerUp, obj)
    })

    collides("player", "key", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return
      pickUpKey(obj)
    });
    collides("player", "teleSwap", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return
      doTeleSwap(obj)
      play("sound-teleswap");
    });
  
  }
  
  function spawnGhostblocks() {
    const ghostblks = get("invisibleBlock")
    for (let i = 0; i < ghostblks.length; i++) {
      destroy(ghostblks[i])
      level.spawn("G", ghostblks[i].gridPos.sub(0, 0));
    }
  }
  function swapGhostBlocks(block) {
    level.spawn("G", block.gridPos.sub(0, 0));
  }
  function destroyAllGhostBlocks() {
    const ghostblks = get("ghostblock")
    for (let i = 0; i < ghostblks.length; i++) {
     setTimeout(function() {
       if (!otherPlayer.isTouching(ghostblks[i])) {
         destroy(ghostblks[i])
       }
     }, 50)
    }
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

  function doTeleSwap(obj) {
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
