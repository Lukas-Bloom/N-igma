import { PHYS } from "../constants.js";
import { handlePowerUpCollisions } from "./powerUpCollisions.js";
import { handleEnvCollisions } from "./envCollisions.js";
import { handleEnemyCollisions } from "./enemyCollisions.js";
import { game } from "../scenes.js";
import { socket } from "../socket.js";

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

export const handleCollisionEvents = (p, otherPlayer, level, levelIndex) => {
  handlePowerUpCollisions(level, p, otherPlayer, levelIndex);
  handleEnvCollisions(level, levelIndex, p, otherPlayer);
  handleEnemyCollisions(p, otherPlayer, levelIndex);
};
