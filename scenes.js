import k from "./initKaboom.js";
import { p1, p2 } from "./players.js";

import { PHYS } from "./constants.js";
import { levels } from "./levels.js";
import { levelConf } from "./assets.js";
import { handleKeyEvents } from "./keyEvents.js";
import { handleCollisionEvents } from "./collisionEvents/collisionEvents.js";
import { handleActionEvents } from "./actions.js";
import { socket } from "./socket.js";
import { spawnPlayers } from "./gameCreation.js"

scene("game", (p, otherPlayer, levelIndex) => {
  gravity(PHYS.GRAVITY);
  const level = addLevel(levels()[levelIndex], levelConf());
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
  const allObjs = get()
  handleActionEvents(p, otherPlayer, levelIndex, level, allObjs);
  handleKeyEvents(p);
  handleCollisionEvents(p, otherPlayer, level, levelIndex);
});




scene("win", () => {
  add([text("You Win!")]);
  keyPress(() => go("game"));
});

export const game = (p, otherPlayer, levelIndex) => {
  go("game", p, otherPlayer, levelIndex);
};

export const nextLevel=()=>{
  go("game",p,otherplayer,levelIndex++)
}

export const win = () => {
  go("win");
};
