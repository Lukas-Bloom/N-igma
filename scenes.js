import { p1, p2 } from "./players.js";
import { PHYS } from "./constants.js";
import { levels } from "./levels.js";
import { levelConf } from "./assets.js";
import { handleKeyEvents } from "./keyEvents.js";
import { handleCollisionEvents } from "./collisionEvents/collisionEvents.js";
import { handleActionEvents } from "./actions.js";
import { spawnPlayers,addTutorialText } from "./gameCreation.js";

//setData("lvlIndex", 4);

scene("game", (p, otherPlayer) => {
  let levelIndex = getData("lvlIndex");
  gravity(PHYS.GRAVITY);
  const level = addLevel(levels()[getData("lvlIndex")], levelConf());
  if (p == 1) {
    p = p1();
    otherPlayer = p2();
    spawnPlayers(p, otherPlayer);
  }
  if (p == 2) {
    p = p2();
    otherPlayer = p1();
    spawnPlayers(otherPlayer, p);
  }

  addTutorialText();


  handleActionEvents(p, otherPlayer, levelIndex, level);
  handleKeyEvents(p);
  handleCollisionEvents(p, otherPlayer, level, levelIndex);
  keyDown("0", () => {
    setData("lvlIndex", 0);
    setData("playerNumber", 0);
  });

  // clicked on the screen and hide the mouse
  if (!focused()) {
    focus();
    //document.getElementsByTagName("canvas")[0].style.cursor = "none";
  }
});

loadSprite("winScreen", "sprites/menu-background.png");
scene("win", () => {
  add([
    sprite("winScreen"),
    area(),
    pos(0, 0),
    scale(0.5),
    z(-2)
  ]);
  drawText
  add([text("You completed the game!"), pos(center()), scale(0.2), z(100)]);
});

export const game = (p, otherPlayer) => {
  go("game", p, otherPlayer);
};

export const win = () => {
  go("win");
};
