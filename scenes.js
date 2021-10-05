import { p1, p2 } from "./players.js";
import { PHYS } from "./constants.js";
import { levels } from "./levels.js";
import { levelConf } from "./assets.js";
import { handleKeyEvents } from "./keyEvents.js";
import { handleCollisionEvents } from "./collisionEvents/collisionEvents.js";
import { handleActionEvents } from "./actions.js";
import { socket } from "./socket.js";
import { spawnPlayers } from "./gameCreation.js"

//setData("lvlIndex", 3);


scene("game", (p, otherPlayer) => {
  let levelIndex = getData("lvlIndex");
  gravity(PHYS.GRAVITY);
  const level = addLevel(levels()[getData("lvlIndex")], levelConf());
  if (p == 1) {
    p = p1();
    otherPlayer = p2();
    spawnPlayers(p, otherPlayer);
  }
  if (p== 2) {
    p = p2();
    otherPlayer = p1();
    spawnPlayers(otherPlayer, p);
  }
  
  handleActionEvents(p, otherPlayer, levelIndex, level);
  handleKeyEvents(p);
  handleCollisionEvents(p, otherPlayer, level, levelIndex);
  keyDown("0", () => {
    let lvlIndex = getData("lvlIndex")
    setData("lvlIndex", 0)
    setData("playerNumber", 0)
    console.log("lvlIndex "+ lvlIndex)
    
  });
});




scene("win", () => {
  add([text("You completed the game!"), pos(center()), scale(0.2)]);
  //keyPress(() => go("game", p.playerNumber,otherPlayer.playerNumber));
});

export const game = (p, otherPlayer) => {
  go("game", p, otherPlayer);
};

export const win = () => {
  go("win");
};
