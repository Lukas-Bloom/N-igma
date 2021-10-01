import { ANSWERS, PHYS, COL } from "../constants.js";
import { isCorrectCollision } from "./collisionEvents.js";


let keys = "";

function pickUpKey(obj,levelIndex,level) {
  keys += obj.name;
  destroy(obj);
  play("sound-pickupKey");
  if (keys.length === 12 && keys !== ANSWERS[levelIndex]) play("sound-error");
  if (keys === ANSWERS[levelIndex]) {
    const door = get("closedDoor")[0];
    destroy(door);
    level.spawn("O", door.gridPos.sub(0, 0));
    keys = "";
    play("sound-door2");
  }
}

function spawnGhostblocks(level) {
  const ghostblks = get("invisibleBlock");
  for (let i = 0; i < ghostblks.length; i++) {
    destroy(ghostblks[i]);
    level.spawn("G", ghostblks[i].gridPos.sub(0, 0));
  }
}

function spawnParticles(player, clr, spr) {
  if (clr == null) { clr = COL.WHITE }
  if (spr == null) { spr = "particle" }
  let particles = []
  let part;
  for (let i = 0; i <= 25; i++) {
    part =
      add([
      sprite(spr),
      pos(player.pos.x, player.pos.y+8),
      origin("center"),
      scale(rand(0.1, 1)),
      opacity(1),
      color(clr),
      rotate(rand(360)),
      layer(10),
      move(rand(360), rand(70, 150)),
      ]);
      
    particles.push(part)
    // console.log("particles " +particles)
  }
    for (let p = 0; p < 600; p++) {

      setTimeout(function () {
        for (let b = 0; b < particles.length; b++) {
          particles[b].opacity = particles[b].opacity - 1.1/600
          
          // console.log(particles[b].opacity)
          if (p === 599) {
            destroy(particles[b])
          }
        }
      }, 6000 / 60)
    }
  }
  
  

function swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty) {
  gravity(0);
  let px = p.pos.x;
  let py = p.pos.y;
  let opx = otherPlayer.pos.x;
  let opy = otherPlayer.pos.y;
  if (!(px === pDestx && py === pDesty && opx === opDestx && opy === opDesty)) {
    const pk = px - pDestx === 0 ? 1 : Math.abs((py - pDesty) / (px - pDestx));
    const opk =
      opx - opDestx === 0 ? 1 : Math.abs((opy - opDesty) / (opx - opDestx));

    if (px > pDestx) {
      px = Math.max(px - PHYS.SWAP, pDestx);
    } else {
      px = Math.min(px + PHYS.SWAP, pDestx);
    }
    if (py < pDesty) {
      py = Math.min(py + pk * PHYS.SWAP, pDesty);
    } else {
      py = Math.max(py - pk * PHYS.SWAP, pDesty);
    }
    if (opx > opDestx) {
      opx = Math.max(opx - PHYS.SWAP, opDestx);
    } else {
      opx = Math.min(opx + PHYS.SWAP, opDestx);
    }
    if (opy < opDesty) {
      opy = Math.min(opy + opk * PHYS.SWAP, opDesty);
    } else {
      opy = Math.max(opy - opk * PHYS.SWAP, opDesty);
    }

    setTimeout(function () {
      p.moveTo(px, py);
      otherPlayer.moveTo(opx, opy);
      swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty);
    }, 1000 / 60);
  } else {
    gravity(PHYS.GRAVITY);
    p.isTeleSwap = false;
    otherPlayer.isTeleSwap = false;
  }
}
function doTeleSwap(obj, p, otherPlayer) {
  destroy(obj);
  const opDestx = p.pos.x;
  const opDesty = p.pos.y;
  const pDestx = otherPlayer.pos.x;
  const pDesty = otherPlayer.pos.y;

  setTimeout(function () {
    p.isTeleSwap = true;
    otherPlayer.isTeleSwap = true;
    swapPlayers(p, otherPlayer, opDestx, opDesty, pDestx, pDesty);
  }, 50);
}

export const handlePowerUpCollisions = (level, p, otherPlayer,levelIndex) => {
  return (
    collides("player", "powerUp", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      let powerUp = "";
      play("sound-powerup2");
      spawnParticles(player, COL.PURPLE);

      
      if (obj.is("doublejump")) powerUp = "doublejump";
      else if (obj.is("grow")) powerUp = "grow";
      else if (obj.is("shrink")) powerUp = "shrink";
      else if (obj.is("dash")) powerUp = "dash";
      else if(obj.is("barrier")) powerUp = "barrier"
      else if (obj.is("ghost")) {
        powerUp = "ghost";
        if (player === p) {
          spawnGhostblocks(level);
        }
      }
      player.changePowerUp(powerUp, obj);
    }),
    collides("player", "key", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      pickUpKey(obj,levelIndex,level);
    }),
    collides("player", "teleSwap", (player, obj) => {
      if (!isCorrectCollision(player, obj)) return;
      doTeleSwap(obj, p, otherPlayer);
      play("sound-teleswap");
    })
  );
};
