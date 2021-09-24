import k from "./initKaboom.js";
import {P1,P2, COL} from "./constants.js"

loadSprite("bean", "sprites/bean.png");

export const p1 = () => {
  
  return (add([
    sprite("bean"),
    pos(P1.POSX, P1.POSY),
    area(),
    scale(P1.SCALE),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
    {
      jumpsAmount: 1,
    }
  ]));
};

export const p2 = () => {

  return add([
    sprite("bean"),
    pos(P2.POSX, P2.POSY),
    area(),
    scale(P2.SCALE),
    color(COL.RED),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
    {
      jumpsAmount: 1,
    }
  ]);
};
