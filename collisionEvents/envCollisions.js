import { isCorrectCollision,slideLeft,slideRight, nextLevel } from "./collisionEvents.js";
import { PHYS } from "../constants.js";
import { game } from "../scenes.js";
import { socket } from "../socket.js";

function swapGhostBlocks(level, block) {
  level.spawn("G", block.gridPos.sub(0, 0));
}

function trampHandler(level, obj, onPlayer) {
  onPlayer.jump(PHYS.TRAMP_JUMP_HEIGHT);
  play("sound-jump");
  destroy(obj);
  const tramp = level.spawn("T", obj.gridPos.sub(0, 0));
  setTimeout(function () {
    destroy(tramp);
    level.spawn("t", tramp.gridPos.sub(0, 0));
  }, 250);
}


export const handleEnvCollisions = (level, levelIndex, p, otherPlayer) => {
  return (
    p.collides("box", (box, side) => {
    
      if (p.curPlatform()?.is("player")) {
        if(!side) p.moveTo(otherPlayer.pos.x, otherPlayer.pos.y - 12)
      }
    }),
    otherPlayer.collides("box", (box, side) => {
      if (otherPlayer.curPlatform()?.is("player")) {
        if(!side) otherPlayer.moveTo(p.pos.x, p.pos.y - 12)
      }
    }),
    collides("player", "invisibleBlock", (player, invisibleBlock) => {
      if (!isCorrectCollision(player, invisibleBlock)) return;
      if (player.currentPowerUp === "ghost") {
        swapGhostBlocks(level, invisibleBlock);
      }
    }),
    p.collides("ice", () => {
      if (p.isOnIce) {
        return;
      }
      p.isOnIce = true;

      if (keyIsDown("right")) {
        p.slideRight = PHYS.MOVE_SPEED;
        p.slideLeft = PHYS.SLIDE;
        slideRight(p);
      } else if (keyIsDown("left")) {
        p.slideLeft = PHYS.MOVE_SPEED;
        p.slideRight = PHYS.SLIDE;
        slideLeft(p);
      } else {
        p.slideLeft = PHYS.SLIDE;
        p.slideRight = PHYS.SLIDE;
      }
    }),
    p.collides("grass", () => {
      p.isOnIce = null;
      p.slideRight = null;
      p.slideLeft = null;
      p.isOnSlime = null;
    }),
    p.collides("openedDoor", (obj) => {

      if (p.nextLevel) return;
      p.nextLevel = true;
      play("sound-win");
      let lvlIndex = getData("lvlIndex")
      lvlIndex++
      setData("lvlIndex", lvlIndex)
      socket.emit("nextLevel", lvlIndex)
      nextLevel(p);
    }),

    p.collides("slime", () => {
      p.isOnSlime = true;
    }),
    
    p.on("ground", (obj) => {
      if (obj.is("tramp1")) trampHandler(level, obj, p);
      if (!obj.is("ice")) {
        p.isOnIce = null;
        p.slideRight = null;
        p.slideLeft = null;
      }
      if (!obj.is("slime")) {
        p.isOnSlime = null;
      }
    }),
    otherPlayer.on("ground", (obj) => {
      if (obj.is("tramp1")) trampHandler(level, obj, otherPlayer);
    })
  );
};
