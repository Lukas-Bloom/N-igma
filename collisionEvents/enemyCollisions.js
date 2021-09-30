import { isCorrectCollision } from "./collisionEvents.js";
import { game } from "../scenes.js";

function gameover(p,otherPlayer, levelIndex) {
  //play("sound-lose");
  add([text("You lose!"), pos(0, 0), scale(1.5)]);
  setTimeout(function () {
 
    game(p.playerNumber,otherPlayer.playerNumber, levelIndex);
  }, 2000);
}

export const handleEnemyCollisions = (p,otherPlayer,levelIndex) => {
  return collides("player", "enemy", (player, enemy) => {
    if (!isCorrectCollision(player, enemy)) return;
    //level.spawn("^",enemy.gridPos.sub(0,0))
    gameover(p,otherPlayer, levelIndex);
  });
};
