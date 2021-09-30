import { PHYS } from "./constants.js";
import { socket } from "./socket.js";

export const handleActionEvents = (p, otherPlayer) => {
  const movObjList = get("platform");
  const movObjList2 = movObjList;

  //console.log(x[1].pos.y);
  //reset jumps when landing
  function checkIfGrounded() {
    if (p.grounded()) {
      p.jumps = p.jumpsAmount;
      p.isJumping = false;
    }
  }

  function destroyAllGhostBlocks() {
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
    // network actions
    action(() => {

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
      socket.on("moveOtherPlayer", (x, y) => {
        otherPlayer.moveTo(x, y);
        if (
          otherPlayer.pos.y >= PHYS.FALL_DEATH ||
          p.pos.y >= PHYS.FALL_DEATH
        ) {
          console.log("hej");
          onDeath();
        }
      });
    }),
    p.action(() => {
      let campos = camPos(width() / 2, height() / 2);

      if (p.pos.x <= campos.x) {
        campos = camPos(width() / 2, height() / 2);
        //} else if(p.pos.x >= LEVEL_LENGTH[levelIndex]) {
        // campos = camPos(LEVEL_LENGTH[levelIndex], height()/2)
      } else {
        campos = camPos(p.pos.x, height() / 2);
      }
      // check fall death
      if (p.pos.y >= PHYS.FALL_DEATH) {
        onDeath();
      }
      checkIfGrounded();
      if (p.currentPowerUp !== "ghost") {
        destroyAllGhostBlocks();
      }
    })
  );
};
