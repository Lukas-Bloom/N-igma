import k from "./initKaboom.js";
import {P1,P2, PLAYER, COL} from "./constants.js"
import powerUp from "./powerUp.js"

loadSprite('bean', 'sprites/tileMap.png', {
	sliceX: 20,
	sliceY: 20,
	anims: {
		idle: 300,
		run: { from: 302, to: 303 ,loop:true }
	}
})
loadSprite("ball-rolling", "newSprites/ball-rolling.png", {
  sliceX: 2,
  sliceY: 2,
  anims: {
    idle: 0,
    run: { from: 0, to: 3, loop: true }
  } 
});
loadSprite("test-char2", "newSprites/test-char2.png");



export const p1 = () => {
  
  return add([
    sprite("ball-rolling", {
       anim: "idle",
       animSpeed: 0.5
    }),
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
    sprite("test-char2", {
      // animSpeed: 0.2,
      // frame: 300,
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
