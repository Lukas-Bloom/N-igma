import k from "./initKaboom.js";
import {P1,P2, COL} from "./constants.js"

k.loadSprite("bean", "sprites/bean.png");

export const p1 = () => {
  
  return (k.add([
    sprite("bean"),
    pos(P1.POSX, P1.POSY),
    area(),
    scale(P1.SCALE),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]));
};

export const p2 = () => {

  return k.add([
    sprite("bean"),
    pos(P2.POSX, P2.POSY),
    area(),
    scale(P2.SCALE),
    color(COL.RED),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);
};
