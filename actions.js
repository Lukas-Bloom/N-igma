import { PHYS } from "./constants.js";
import { socket } from "./socket.js";
import {
  handleMovement,
  gameover,
  pickUpKey,
  doTeleSwap,
  nextLevel,
} from "./collisionEvents/collisionEvents.js";

let isDead = 0;
let isPowerUp = 0;
let nextL = 0;

export const handleActionEvents = (p, otherPlayer, levelIndex, level) => {
  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount;
      p.isJumping = false;
    }
  }

  function destroyAllGhostBlocks() {
    if (p.currentPowerUp === "ghost") return;
    const ghostblks = get("ghostblock");
    for (let i = 0; i < ghostblks.length; i++) {
      setTimeout(function () {
        if (!otherPlayer.isTouching(ghostblks[i])) {
          destroy(ghostblks[i]);
        }
      }, 50);
    }
  }

 

  return action(() => {
    /*      socket.emit("movObjPos", movObjList2);
      socket.on("syncObj", (stuff) => {
        console.log("holaaa");
        for (let i = 0; i < stuff.length; i++) {
          movObjList2[i].moveTo(
            Math.floor(stuff[i].pos.x),
            Math.floor(stuff[i].pos.y)
          );
        }
      }); */

    socket.emit("pos", p.pos.x, p.pos.y);
    socket.on("moveOtherPlayer", (x, y) => otherPlayer.moveTo(x, y));
    socket.on("gameOver", () => {
      isDead++;
      if (isDead === 1) {
        gameover(p);
      }
    });
    isDead = 0;

    socket.on("powerUp", (powerUp, obj) => {
      isPowerUp++;
      if (isPowerUp === 1) {
        console.log(get("powerUp"), obj._id);
        get("powerUp").forEach((o) => {
          if (o._id === obj._id) otherPlayer.changePowerUp(powerUp, o);
        });
      }
    });
    isPowerUp = 0;

    socket.on("key", (obj) => {
      get("key").forEach((o) => {
        if (o._id === obj._id) pickUpKey(o, levelIndex, level);
      });
    });

    
    socket.on("teleSwap", (obj) => {
      get("teleSwap").forEach((o) => {
        if (o._id === obj._id) doTeleSwap(o, p, otherPlayer);
      });
    });
    
    socket.on("nextLevel", (nextLvl) => {
      nextL++;
      if (nextL === 1) {
        setData("lvlIndex", nextLvl);
        nextLevel(p, otherPlayer);
      }
    });
    nextL = 0;
    
    
          camPos((p.pos.x > 320 ? p.pos.x : 320), 168);
          handleMovement((otherPlayer.curPlatform()?.is("btn") || p.curPlatform()?.is("btn")))
          checkIfGrounded();
          destroyAllGhostBlocks();
        })

};
