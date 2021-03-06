import { PHYS, MAX_LEVEL } from "../constants.js";
import { handlePowerUpCollisions } from "./powerUpCollisions.js";
import { handleEnvCollisions } from "./envCollisions.js";
import { handleEnemyCollisions } from "./enemyCollisions.js";
import { win } from "../scenes.js";

let keys = "";

export const isCorrectCollision = (player, obj) => {
  if (obj.is("player") || player.isTeleSwap) return false;
  return true;
};

export const slideRight = (p) => {
  if (p.slideRight > PHYS.SLIDE) {
    p.slideRight -= PHYS.SLIDE;
    p.move(p.slideRight, 0);
    setTimeout(function () {
      slideRight(p);
    }, 1000 / 60);
  }
};

export const slideLeft = (p) => {
  if (p.slideLeft > PHYS.SLIDE) {
    p.slideLeft -= PHYS.SLIDE;
    p.move(-p.slideLeft, 0);
    setTimeout(function () {
      slideLeft(p);
    }, 1000 / 60);
  }
};

export const handleMovement = (bool) => {
  if (!bool) {
    get("btnUp").forEach((btn) => {
      btn.frame = 60;
    });
  }
  const blockDowns = get("blockDown");
  blockDowns.forEach((block) => {
    if (
      (!block.start && !block.end && !bool) ||
      (block.start && !bool) ||
      (block.end && bool) ||
      block.isMoving
    )
      return;
    moveBlock(block, 1, 1, bool);
  });

  const blockUps = get("blockUp");
  blockUps.forEach((block) => {
    if (
      (!block.start && !block.end && !bool) ||
      (block.start && !bool) ||
      (block.end && bool) ||
      block.isMoving
    )
      return;
    moveBlock(block, 1, -1, bool);
  });

  const allPlatformHors = get("platformHor");
  for (let i = 0; i < allPlatformHors.length; i++) {
    allPlatformHors[i].dir = allPlatformHors[i].dir || 1;
    const colliding = allPlatformHors[i].move(
      bool ? 75 * allPlatformHors[i].dir : 0,
      0
    );
    if (colliding) {
      allPlatformHors[i].dir *= -1;
    }
  }

  const allPlatformVers = get("platformVer");
  for (let i = 0; i < allPlatformVers.length; i++) {
    allPlatformVers[i].dir = allPlatformVers[i].dir || 1;
    const colliding = allPlatformVers[i].move(
      0,
      bool ? 75 * allPlatformVers[i].dir : 0
    );
    if (colliding) {
      allPlatformVers[i].dir *= -1;
    }
  }
};

function moveBlock(block, counter, dir, bool) {
  block.end = false;
  block.start = false;
  block.isMoving = true;
  setTimeout(function () {
    if (counter <= 16) {
      block.moveTo(block.pos.x, block.pos.y + dir * (bool ? 1 : -1));
      moveBlock(block, ++counter, dir, bool);
    } else {
      block.end = bool;
      block.start = !bool;
      block.isMoving = false;
    }
  }, 1);
}

export const nextLevel = (p) => {
  if (getData("lvlIndex") > MAX_LEVEL) {
    win();
    setData("lvlIndex", 0);
    return;
  }
  add([text("Good job!"), pos(p.pos.x, p.pos.y - 50), scale(0.2), z(100)]);
  setTimeout(function () {
    location.reload();
  }, 2000);
};

export const gameover = (p) => {
  play("sound-lose");
  p.isDead = true;
  add([text("You lose!"), pos(p.pos.x, p.pos.y - 50), scale(0.2), z(100)]);
  setTimeout(function () {
    p.isDead = false;
    location.reload();
  }, 2000);
};

export function pickUpKey(obj, levelIndex, level) {
  keys += obj.name;
  destroy(obj);
  play("sound-pickupKey");
  if (keys.length === 16 && keys !== "bronzesilvergold") play("sound-error");
  if (keys === "bronzesilvergold") {
    const door = get("closedDoor")[0];
    destroy(door);
    level.spawn("O", door.gridPos.sub(0, 0));
    keys = "";
    play("sound-door2");
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
export function doTeleSwap(obj, p, otherPlayer) {
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

let startAllMovingObjects = 0;
export const handleAllMovingObjects = (activated) => {
  if (activated && startAllMovingObjects < 1) {
    startAllMovingObjects++;

    //move monsters
    const allMonsters = get("monster");
    for (let i = 0; i < allMonsters.length; i++) {
      let speed = 60;
      let dir = randi(1, 2) === 1 ? -1 : 1;

      allMonsters[i].use({
        load() {
          this.play("walk");
        },
        update() {
          const vel = speed * dir;
          const colliding = this.move(vel, 0);
          if (colliding) {
            dir = vel > 0 ? -1 : 1;
          }
        },
      });
    }

    //move bats
    const allBats = get("bat");
    for (let i = 0; i < allBats.length; i++) {
      let dir = randi(1, 2) === 1 ? -1 : 1;
      let up = 0;
      let turn = false;
      let speed = 30;
      allBats[i].use({
        load() {
          this.play("fly");
        },
        update() {
          setTimeout(() => {
            if (up < 120 && !turn) {
              this.moveTo(this.pos.x, this.pos.y + dir / 4);
              up++;
              if (up === 119) turn = !turn;
            }
            if (up > 0 && turn) {
              this.moveTo(this.pos.x, this.pos.y - dir / 4);
              up--;
              if (up === 1) turn = !turn;
            }
          }, 100);

          //option2
          // const vel = speed * dir;
          // Math.floor(time()) % 2 === 0 ? this.move(0, -vel) : this.move(0, vel);
        },
      });
    }
  }
};

export const handleCollisionEvents = (p, otherPlayer, level, levelIndex) => {
  handlePowerUpCollisions(level, p, otherPlayer, levelIndex);
  handleEnvCollisions(level, levelIndex, p, otherPlayer);
  handleEnemyCollisions(p, otherPlayer, levelIndex, level);
};
