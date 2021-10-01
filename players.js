import k from "./initKaboom.js";
import { P1, P2, PLAYER, COL } from "./constants.js";
import powerUp from "./powerUp.js";

loadSprite('crab-green', 'sprites/beachTiles.png', {
  sliceX: 8,
  sliceY: 8,
  anims: {
    idle: 0,
    run: { from: 1, to: 2, loop: true }
  }
})
loadSprite('crab-red', 'sprites/beachTiles.png', {
  sliceX: 8,
  sliceY: 8,
  anims: {
    idle: 8,
    run: { from: 9, to: 10, loop: true }
  }
})

export const p1 = () => {
  return add([
    sprite("crab-green", {
      anim: "idle",
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
      animSpeed: 0.2,
      frame: 9,
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
