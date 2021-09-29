import { PHYS, ANSWERS } from "./constants.js";

export const handleCollisionEvents = (p, otherPlayer, level, levelIndex) => {
  let keys = "";
  function trampHandler(obj, onPlayer) {
    onPlayer.jump(PHYS.TRAMP_JUMP_HEIGHT);
    play("sound-jump");
    destroy(obj);
    const tramp = level.spawn("T", obj.gridPos.sub(0, 0));
    setTimeout(function () {
      destroy(tramp);
      level.spawn("t", tramp.gridPos.sub(0, 0));
    }, 250);
  }

  function pickUpKey(obj) {
    keys += obj.name;
    destroy(obj);
    play("sound-pickupKey");
    if (keys.length === 12 && keys !== ANSWERS[levelIndex]) play("sound-error");
    if (keys === ANSWERS[levelIndex]) {
      const door = get("closedDoor")[0];
      destroy(door);
      level.spawn("O", door.gridPos.sub(0, 0));
      keys = "";
      play("sound-door2");
    }
  }

  function onDeath() {
    // socket.emit("gameover");
    gameover();
  }

  function gameover() {
    //play("sound-lose");
    add([text("You lose!"), pos(0, 0), scale(1.5)]);
    setTimeout(function () {
      if (playerNumber == 1) {
        newGame();
      } else {
        joinGame();
      }
    }, 2000);
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

  function spawnGhostblocks() {
    const ghostblks = get("invisibleBlock");
    for (let i = 0; i < ghostblks.length; i++) {
      destroy(ghostblks[i]);
      level.spawn("G", ghostblks[i].gridPos.sub(0, 0));
    }
  }
  function swapGhostBlocks(block) {
    level.spawn("G", block.gridPos.sub(0, 0));
  }
  function swapPlayers(opDestx, opDesty, pDestx, pDesty) {
    gravity(0);
    let px = p.pos.x;
    let py = p.pos.y;
    let opx = otherPlayer.pos.x;
    let opy = otherPlayer.pos.y;
    if (
      !(px === pDestx && py === pDesty && opx === opDestx && opy === opDesty)
    ) {
      const pk =
        px - pDestx === 0 ? 1 : Math.abs((py - pDesty) / (px - pDestx));
      const opk =
        opx - opDestx === 0 ? 1 : Math.abs((opy - opDesty) / (opx - opDestx));

      if (px > pDestx) {
        px = Math.max(px - PHYS.SWAP, pDestx);
      } else {
        px = Math.min(px + PHYS.SWAP, pDestx);
      }
      if (py < pDesty) {
        py = Math.min(py + pk * PHYS.SWAP, pDesty);
      } else {
        py = Math.max(py - pk * PHYS.SWAP, pDesty);
      }
      if (opx > opDestx) {
        opx = Math.max(opx - PHYS.SWAP, opDestx);
      } else {
        opx = Math.min(opx + PHYS.SWAP, opDestx);
      }
      if (opy < opDesty) {
        opy = Math.min(opy + opk * PHYS.SWAP, opDesty);
      } else {
        opy = Math.max(opy - opk * PHYS.SWAP, opDesty);
      }

      setTimeout(function () {
        p.moveTo(px, py);
        otherPlayer.moveTo(opx, opy);
        swapPlayers(opDestx, opDesty, pDestx, pDesty);
      }, 1000 / 60);
    } else {
      gravity(PHYS.GRAVITY);
      p.isTeleSwap = false;
      otherPlayer.isTeleSwap = false;
    }
  }
  function doTeleSwap(obj) {
    destroy(obj);
    const opDestx = p.pos.x;
    const opDesty = p.pos.y;
    const pDestx = otherPlayer.pos.x;
    const pDesty = otherPlayer.pos.y;

    setTimeout(function () {
      p.isTeleSwap = true;
      otherPlayer.isTeleSwap = true;
      swapPlayers(opDestx, opDesty, pDestx, pDesty);
    }, 50);
  }

  function isCorrectCollision(player, obj) {
    if (obj.is("player") || player.isTeleSwap) return false;
    return true;
  }
  return (
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
    }),
    p.collides("grass", () => {
      p.isOnIce = null;
      p.slideRight = null;
      p.slideLeft = null;
      p.isOnSlime = null;
    }),
    p.collides("openedDoor", () => {
      play("sound-win");
      levelIndex++;
      go("win");
    }),
    otherPlayer.collides("openedDoor", () => {
      levelIndex++;
      go("win");
    }),
    p.collides("slime", () => {
      p.isOnSlime = true;
    }),
    collides("player", "enemy", (player, enemy) => {
      if (!isCorrectCollision(player, enemy)) return;
      destroy(enemy);
      //level.spawn("^",enemy.gridPos.sub(0,0))
      onDeath();
    }),
    collides("player", "invisibleBlock", (player, invisibleBlock) => {
      if (invisibleBlock.is("player")) return;
      if (player.currentPowerUp === "ghost") {
        swapGhostBlocks(invisibleBlock);
      }
    }),
    p.on("ground", (obj) => {
      if (obj.is("tramp1")) trampHandler(obj, p);
      if (!obj.is("ice")) {
        p.isOnIce = null;
        p.slideRight = null;
        p.slideLeft = null;
      }
      if (!obj.is("slime")) {
        p.isOnSlime = null;
      }
    }),
    otherPlayer.on("ground", (obj) => {
      if (obj.is("tramp1")) trampHandler(obj, otherPlayer);
    }),
    collides("player", "powerUp", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      let powerUp = "";
      play("sound-powerup2");

      if (obj.is("doublejump")) powerUp = "doublejump";
      else if (obj.is("grow")) powerUp = "grow";
      else if (obj.is("shrink")) powerUp = "shrink";
      else if (obj.is("dash")) powerUp = "dash";
      else if (obj.is("ghost")) {
        powerUp = "ghost";
        if (player === p) {
          spawnGhostblocks();
        }
      }
      player.changePowerUp(powerUp, obj);
    }),
    collides("player", "key", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      pickUpKey(obj);
    }),
    collides("player", "teleSwap", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      doTeleSwap(obj);
      play("sound-teleswap");
    })
  );
};
