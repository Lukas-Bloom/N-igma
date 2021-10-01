import k from "./initKaboom.js";
import {P1,P2, PLAYER, COL} from "./constants.js"
import powerUp from "./powerUp.js"

loadSprite('crab-green-no-shell', 'newSprites/crab-green-no-shell.png')

loadSprite('crab-green', 'newSprites/beach.png', {
	sliceX: 3,
	sliceY: 3,
	anims: {
		idle: 0,
		run: { from: 1, to: 2, loop:true }
	}
})
loadSprite('crab-red', 'newSprites/beach.png', {
  sliceX: 3,
  sliceY: 3,
  anims: {
    idle: 3,
    run: { from: 4, to: 5, loop: true }
  }
})



export const p1 = () => {
  
  return add([
    sprite("crab-green-no-shell"),
    pos(P1.POSX, P1.POSY),
    area(/*{ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }*/),
    // color(COL.P1),
    body(),
    origin("bot"),
    powerUp(),
    {
      jumpsAmount: 1,
      currentPowerUp: '',
    },
    "player"
  ]);
};

export const p2 = () => {

  return add([
    sprite("crab-red", {
      frame: 3
    }),
    pos(P2.POSX, P2.POSY),
    area(/*{ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }*/),
    // color(COL.P2),
    body(),
    origin("bot"),
    powerUp(),
    {
      jumpsAmount: 1,
      currentPowerUp: '',
    },
    "player"
  ]);
};
