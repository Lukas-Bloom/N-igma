import { isCorrectCollision,slideLeft,slideRight, nextLevel } from "./collisionEvents.js";
import { PHYS } from "../constants.js";
import { game } from "../scenes.js";
import { socket } from "../socket.js";

function swapGhostBlocks(level, block) {
  level.spawn("G", block.gridPos.sub(0, 0));
}

function trampHandler(p, obj) {
  p.jump(PHYS.TRAMP_JUMP_HEIGHT);
  play("sound-jump");
  obj.play("bounce")
  setTimeout(function() {
    obj.play("idle")
  }, 500)
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
    p.collides("anything", (obj, side) => {
      if(side !== "bottom") return
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
      if (obj.is("tramp")) trampHandler(p, obj);
      if (!obj.is("ice")) {
        p.isOnIce = null;
        p.slideRight = null;
        p.slideLeft = null;
      }
      if (!obj.is("slime")) {
        p.isOnSlime = null;
      }

      if(obj.is("btnUp")) obj.frame = 61 
    }),
    otherPlayer.on("ground", (obj) => {
      if (obj.is("tramp")) trampHandler(otherPlayer, obj);
      if (obj.is("btnUp")) obj.frame = 61 
    })
  );
};
