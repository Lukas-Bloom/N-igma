import { PHYS } from "./constants.js";
import { p1, p2 } from "./players.js";
import { levels } from "./levels.js";
import { levelConf } from "./assets.js";
import { handleKeyEvents } from "./keyEvents.js";
import { handleCollisionEvents } from "./collisionEvents.js";
import { handleActionEvents } from "./actions.js";
import { socket } from "./socket.js";

scene("game", (playerNumber, levelIndex) => {
  gravity(PHYS.GRAVITY);
  const level = addLevel(levels()[levelIndex], levelConf());
  const players = [p1(), p2()];
  const p = players[playerNumber - 1];
  const otherPlayer = players[playerNumber === 1 ? 1 : 0];
  socket.on("gameover", () => {
    gameover();
  });
  handleActionEvents(p, otherPlayer);
  handleKeyEvents(p);
  handleCollisionEvents(p, otherPlayer, level, levelIndex);
});

scene("win", () => {
  add([text("You Win!")]);
  keyPress(() => go("game"));
});
export const game = (playerNumber,levelIndex) => {
  go("game", playerNumber,levelIndex);
};

export const win = () => {
  go("win");
};
