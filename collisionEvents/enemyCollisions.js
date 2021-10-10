import { loseBarrier } from "../powerUp.js";
import { socket } from "../socket.js";
import { gameover } from "./collisionEvents.js";


export const handleEnemyCollisions = (p) => {
  return p.collides("enemy", () => {
    if(p.isTeleSwap) return
    if (p.currentPowerUp === "loseBarrier") return;
    if(p.currentPowerUp === "barrier") {
      p.currentPowerUp === "loseBarrier"
      loseBarrier(1, p)
    } else {
      socket.emit("gameOver")
      gameover(p)
    }
  });
};
