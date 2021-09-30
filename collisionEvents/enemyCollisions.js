import { isCorrectCollision } from "./collisionEvents.js";
import { game } from "../scenes.js";
import { loseBarrier } from "../powerUp.js";

function gameover(p,otherPlayer, levelIndex) {
  play("sound-lose");
  p.isDead = true
  add([text("You lose!"), pos(0, 0), scale(1.5)]);
  setTimeout(function () {
 
    game(p.playerNumber,otherPlayer.playerNumber, levelIndex);
  }, 2000);
}

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
