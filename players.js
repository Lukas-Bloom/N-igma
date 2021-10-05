import k from "./initKaboom.js";
import { P1, P2, PLAYER, COL } from "./constants.js";
import powerUp from "./powerUp.js";

loadSprite('crab-green', 'sprites/beachTiles.png', {
  sliceX: 8,
  sliceY: 8,
  anims: {
    idle: { from: 0, to: 1, loop: true, },
    run: { from: 2, to: 3, loop: true },
  }
})
loadSprite('crab-red', 'sprites/beachTiles.png', {
  sliceX: 8,
  sliceY: 8,
  anims: {
    idle: { from: 8, to: 9, loop: true },
    run: { from: 10, to: 11, loop: true }
  }
})

export const p1 = () => {
  return add([
    sprite("crab-green", {
      anim: "idle",
      animSpeed: 0.25,
    }),
    pos(P1.POSX, P1.POSY),
    area({ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }),
    color(COL.WHITE),
    body(),
    origin("bot"),
    powerUp(),
    {
      playerNumber: 1,
      jumpsAmount: 1,
      currentPowerUp: "",
    },
    "player",
  ]);
};

export const p2 = () => {
  return add([
    sprite("crab-red", {
      anim: "idle",
      animSpeed: 0.2,
    }),
    pos(P2.POSX, P2.POSY),
    area({ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }),
    color(COL.WHITE),
    body(),
    origin("bot"),
    powerUp(),
    {
      playerNumber: 2,
      jumpsAmount: 1,
      currentPowerUp: "",
    },
    "player",
  ]);
};
