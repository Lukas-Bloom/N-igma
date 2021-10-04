import { PHYS, ANSWERS } from "../constants.js";
import { handlePowerUpCollisions } from "./powerUpCollisions.js";
import { handleEnvCollisions } from "./envCollisions.js";
import { handleEnemyCollisions } from "./enemyCollisions.js";
import { game } from "../scenes.js";
import { socket } from "../socket.js";

let keys = "";

export const isCorrectCollision = (player, obj) => {
  if (obj.is("player") || player.isTeleSwap) return false;
  return true;
};

export const slideRight = (p) => {
  if (p.slideRight > PHYS.SLIDE) {
    p.slideRight -= PHYS.SLIDE;
    p.move(p.slideRight, 0);
    setTimeout(function () {
      slideRight(p);
    }, 1000 / 60);
  }
};

export const slideLeft = (p) => {
  if (p.slideLeft > PHYS.SLIDE) {
    p.slideLeft -= PHYS.SLIDE;
    p.move(-p.slideLeft, 0);
    setTimeout(function () {
      slideLeft(p);
    }, 1000 / 60);
  }
};

export const handleMovement = (bool) => {
  const blockDowns = get("blockDown")
  blockDowns.forEach(block => {
    if (!block.start && !block.end && !bool || block.start && !bool || block.end && bool || block.isMoving) return
    moveBlock(block, 1, 1, bool)
  })

  const blockUps = get("blockUp")
  blockUps.forEach(block => {
    if (!block.start && !block.end && !bool || block.start && !bool || block.end && bool || block.isMoving) return
    moveBlock(block, 1, -1, bool)
  })
}

function moveBlock(block, counter, dir, bool) {
  block.end = false
  block.start = false
  block.isMoving = true
  setTimeout(function () {
    if (counter <= 16) {
      block.moveTo(block.pos.x, block.pos.y + dir * (bool ? 1 : -1))
      moveBlock(block, ++counter, dir, bool)
    }
    else {
      block.end = bool
      block.start = !bool
      block.isMoving = false
    }
  }, 1000 / 30)
}

export function gameOver(p, otherPlayer, levelIndex) {
  socket.emit("gameOver")
  //play("sound-lose");
  console.log(p.isDead)
  p.isDead = true
  console.log(p.isDead)
  add([text("You lose!"), pos(0, 0), scale(1.5)]);
  setTimeout(function () {
    p.isDead = false
    game(p.playerNumber, otherPlayer.playerNumber, levelIndex);
  }, 2000);
}

export function pickUpKey(obj, levelIndex, level) {
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

function swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty) {
  gravity(0);
  let px = p.pos.x;
  let py = p.pos.y;
  let opx = otherPlayer.pos.x;
  let opy = otherPlayer.pos.y;
  if (!(px === pDestx && py === pDesty && opx === opDestx && opy === opDesty)) {
    const pk = px - pDestx === 0 ? 1 : Math.abs((py - pDesty) / (px - pDestx));
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
      swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty);
    }, 1000 / 60);
  } else {
    gravity(PHYS.GRAVITY);
    p.isTeleSwap = false;
    otherPlayer.isTeleSwap = false;
  }
}
export function doTeleSwap(obj, p, otherPlayer) {
  destroy(obj);
  const opDestx = p.pos.x;
  const opDesty = p.pos.y;
  const pDestx = otherPlayer.pos.x;
  const pDesty = otherPlayer.pos.y;

  setTimeout(function () {
    p.isTeleSwap = true;
    otherPlayer.isTeleSwap = true;
    swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty);
  }, 50);
}

export const handleCollisionEvents = (p, otherPlayer, level, levelIndex) => {
  handlePowerUpCollisions(level, p, otherPlayer, levelIndex);
  handleEnvCollisions(level, levelIndex, p, otherPlayer);
  handleEnemyCollisions(p, otherPlayer, levelIndex);
};
