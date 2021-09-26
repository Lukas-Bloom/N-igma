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



export const p1 = () => {
  
  return add([
    sprite("bean", {
      anim: "idle",
    }),
    pos(P1.POSX, P1.POSY),
    area({ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }),
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
    sprite("bean", {
      animSpeed: 0.2,
      frame: 300,
    }),
    pos(P2.POSX, P2.POSY),
    area({ width: PLAYER.WIDTH, height: PLAYER.HEIGHT }),
    color(COL.RED),
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
