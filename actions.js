import { PHYS } from "./constants.js";
import { socket } from "./socket.js";
import { handleMovement, gameOver, pickUpKey, doTeleSwap } from "./collisionEvents/collisionEvents.js";

let isDead = 0

export const handleActionEvents = (p, otherPlayer, levelIndex, level, allObjs) => {
  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount;
      p.isJumping = false;
    }
  }

  function destroyAllGhostBlocks() {
    if(p.currentPowerUp === "ghost") return
    const ghostblks = get("ghostblock");
    for (let i = 0; i < ghostblks.length; i++) {
      setTimeout(function () {
        if (!otherPlayer.isTouching(ghostblks[i])) {
          destroy(ghostblks[i]);
        }
      }, 50);
    }
  }

  return (
    action(() => {
      socket.emit("pos", p.pos.x, p.pos.y);
      socket.on("moveOtherPlayer", (x, y) => otherPlayer.moveTo(x, y));
      socket.on("gameOver", () => {
        isDead++
        if (isDead === 1) {
          gameOver(p, otherPlayer, levelIndex)
        }
      })
      isDead = 0

      socket.on("powerUp", (powerUp, obj) => {
        allObjs.forEach(o => {
          if(o._id === obj._id) otherPlayer.changePowerUp(powerUp, o)
        })
      }) 

      socket.on("key", (obj) => {
        allObjs.forEach(o => {
          if (o._id === obj._id) pickUpKey(o, levelIndex, level)
        })
      })

      socket.on("teleSwap", (obj) => {
        allObjs.forEach(o => {
          if (o._id === obj._id) doTeleSwap(o, p, otherPlayer)
        })
      })

      
      
      camPos((p.pos.x > 320 ? p.pos.x : 320), 125);
      handleMovement((otherPlayer.curPlatform()?.is("btn") || p.curPlatform()?.is("btn")))
      checkIfGrounded();
      destroyAllGhostBlocks();
    })
  );
};
