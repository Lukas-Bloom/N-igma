import {COL} from "./constants.js"
import * as mo from "./movingObjects.js"

loadSprite("monster", "sprites/tileMap.png", {
  sliceX: 20,
  sliceY: 20,
  anims: {
    walk: { from: 341, to: 342, loop: true },
  },
});
loadSprite("bat", "sprites/tileMap.png", {
  sliceX: 20,
  sliceY: 20,
  anims: {
    fly: { from: 383, to: 384, loop: true },
  },
});
loadSprite("platform", "sprites/tileMap.png", {
  sliceX: 20,
  sliceY: 20,
});

loadSprite("grass", "sprites/grass.png");
loadSprite("grass_l", "sprites/grass_l.png");
loadSprite("grass_l_top", "sprites/grass_l_top.png");
loadSprite("grass_r", "sprites/grass_r.png");
loadSprite("grass_r_top", "sprites/grass_r_top.png");
loadSprite("box", "sprites/box.png");
loadSprite("spikes", "sprites/spikes.png");
loadSprite("bigKey", "sprites/bigKey.png");
loadSprite("closedDoor", "sprites/doorClosed.png");
loadSprite("openedDoor", "sprites/doorOpened.png");
loadSprite("tramp1", "sprites/tramp1.png");
loadSprite("tramp2", "sprites/tramp2.png");
loadSprite("doublejump", "sprites/doublejump.png");

export const levelConf =()=>{
  return({    // define the size of each block
  width: 16,
  height: 16,
  // define what each symbol means
    "=": () => [
      sprite("grass"),
      area(),
      solid(),
      "grass"
    ],
    "1": () => [
      sprite("grass_l"),
      area(),
      solid(),
    ],
    "2": () => [
      sprite("grass_r"),
      area(),
      solid(),
    ],
    "L": () => [
      sprite("grass_l_top"),
      area(),
      solid(),
    ],
    "R": () => [
      sprite("grass_r_top"),
      area(),
      solid(),
    ],
    "#": () => [
      sprite("box"),
      area(),
      solid(),
    ],
    "^": () => [
      sprite("spikes"),
      area(),
      solid(),
      color(COL.BLUE),
      "spikes"
    ],
    "@": () => [
      sprite("monster",{
        animSpeed:0.3,
        frame:340
      }),
      area(),
      body(),
      color(COL.GREEN),
      scale(),
      mo.patrol(),
      "enemy"
    ],
    "J": () => [
      sprite("doublejump"),
      area(),
      solid(),
      color(COL.LIGHT_BLUE),
      "doublejump"
    ],
    "i": () => [
      sprite("grass"),
      area(),
      solid(),
      color(COL.LIGHT_BLUE),
      "ice",
    ],
    "K": () => [
      sprite("bigKey"),
      area(),
      solid(),
      color(COL.GREEN),
      {name: 'key1'},
      "bigKey",
    ],
    "E": () => [
      sprite("bigKey"),
      area(),
      solid(),
      color(COL.RED),
      { name: 'key2' },
      "bigKey",
    ],
    "Y": () => [
      sprite("bigKey"),
      area(),
      solid(),
      color(COL.BLUE),
      { name: 'key3' },
      "bigKey",
    ],
    "D": () => [
      sprite("closedDoor"),
      area(),
      scale(3),
      "closedDoor",
    ],
    "O": () => [
      sprite("openedDoor"),
      area(),
      scale(3),
      "openedDoor",
    ],
    "s": () => [
      sprite("grass"),
      area(),
      solid(),
      color(COL.LGREEN),
      "slime",
    ],
    "t": () => [
      sprite("tramp1"),
      area(),
      solid(),
      "tramp1",
    ],
    "T": () => [
      sprite("tramp2"),
      area(),
      solid(),
      "tramp2",
    ],
    "B": () => [
      sprite("bat",{
        animSpeed:0.3,
        frame:385
      }),
        area(),
        solid(),
        color(COL.PURPLE),
        mo.batVertical(10,1,10),
        "enemy",
    ],
    "X": () => [
      sprite("platform",{
        frame:143
      }),
        area(),
        solid(),
        color(COL.ORANGE),
        mo.platformHorizontal(),
        "platform"
      
    ],
    "P": () => [
      sprite("platform",{
        frame:143
      }),
        area(),
        solid(),
        color(COL.ORANGE),
       mo.platformVertical(),
       "platform"
      
    ],
  }
  )
}