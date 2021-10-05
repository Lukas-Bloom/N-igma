import { isCorrectCollision } from "./collisionEvents.js";
import { game } from "../scenes.js";
import { loseBarrier } from "../powerUp.js";
import { gameover } from "./collisionEvents.js";


export const handleEnemyCollisions = (p,otherPlayer,levelIndex) => {
  return collides("player", "enemy", (player, enemy) => {
    if (!isCorrectCollision(player, enemy) || player.currentPowerUp === "loseBarrier") return;
    if(player.currentPowerUp === "barrier") {
      player.currentPowerUp === "loseBarrier"
      loseBarrier(1, player)
    } else {
      gameover(p, otherPlayer, levelIndex);
    }
  });
};
