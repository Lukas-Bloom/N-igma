import { loseBarrier } from "../powerUp.js";
import { gameOver } from "./collisionEvents.js";
import { socket } from "../socket.js";

export const handleEnemyCollisions = (p,otherPlayer,levelIndex) => {
  return p.collides("enemy", () => {
    if (p.currentPowerUp === "loseBarrier") return;
    if(p.currentPowerUp === "barrier") {
      p.currentPowerUp === "loseBarrier"
      loseBarrier(1, p)
    } else {
      gameOver(p, otherPlayer, levelIndex)
    }
  });
};
