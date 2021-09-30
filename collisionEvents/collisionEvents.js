import { PHYS } from "../constants.js";
import { handlePowerUpCollisions } from "./powerUpCollisions.js";
import { handleEnvCollisions } from "./envCollisions.js";
import { handleEnemyCollisions } from "./enemyCollisions.js";

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

export const handleCollisionEvents = (p, otherPlayer, level, levelIndex) => {
  handlePowerUpCollisions(level, p, otherPlayer, levelIndex);
  handleEnvCollisions(level, levelIndex, p, otherPlayer);
  handleEnemyCollisions(p, otherPlayer, levelIndex);
};
