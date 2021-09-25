import k from "./initKaboom.js";
import {P1,P2, COL} from "./constants.js"

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
    area(),
    scale(),
    body(),
    origin("bot"),
    {
      jumpsAmount: 1,
      ghost: 0,
    }
  ]);
};

export const p2 = () => {

  return add([
    sprite("bean", {
      animSpeed: 0.2,
      frame: 300,
    }),
    pos(P2.POSX, P2.POSY),
    area(),
    scale(),
    color(COL.RED),
    body(),
    origin("bot"),
    {
      jumpsAmount: 1,
      ghost: 0,
    }
  ]);
};
