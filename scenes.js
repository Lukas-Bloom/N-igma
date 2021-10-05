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

// setData("level0",
//   [
//     "                 key                           ",
//     "                                  E            ",
//     "        #####                   ggg            ",
//     "            #                 ggg              ",
//     "            #               ggg                ",
//     "            #  t           ggg                 ",
//     "            #######     ggg             D      ",
//     "            g#U    #g                          ",
//     "^   J   Y  g     0 gK t   J                    ",
//     "===============================================",
//   ],
// )
//setData("lvlInd", 2);


scene("game", (p, otherPlayer, levelIndex) => {
  let lvlInd = getData("lvlInd");
  //console.log("lvlInd1 " + lvlInd)
  if (!lvlInd) { lvlInd = 0; setData("lvlInd", lvlInd); 
  //console.log("lvlInd2 " +lvlInd)}
  gravity(PHYS.GRAVITY);
  //const level = addLevel(levels()[levelIndex], levelConf());
  const level = addLevel(levels()[getData("lvlInd")], levelConf());
  
  //const level = addLevel(getData("level0"), levelConf());
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
  handleActionEvents(p, otherPlayer);
  handleKeyEvents(p);
  handleCollisionEvents(p, otherPlayer, level, levelIndex);
  keyDown("7", () => {
    //setData("level0", level)
    lvlInd = getData("lvlInd")
    setData("lvlInd", 0)
    console.log("lvlInd "+ lvlInd)
    //console.log("level saved " +level)
  });
});




scene("win", () => {
  add([text("You Win!")]);
  keyPress(() => go("game"));
});

export const game = (p, otherPlayer, levelIndex) => {
  go("game", p, otherPlayer, levelIndex);
};

export const nextLevel = () => {
  setData("lvlInd", lvlInd)
  console.log("lvlInd3 " + lvlInd)
  //go("game", p, otherplayer, levelIndex++)
  go("game",p,otherplayer,lvlInd)
}

export const win = () => {
  go("win");
};
