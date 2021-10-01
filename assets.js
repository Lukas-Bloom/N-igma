import { COL } from "./constants.js";

//gfx
loadSprite("beanMonster", "sprites/bean.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("grass_l", "sprites/grass_l.png");
loadSprite("grass_l_top", "sprites/grass_l_top.png");
loadSprite("grass_r", "sprites/grass_r.png");
loadSprite("grass_r_top", "sprites/grass_r_top.png");
loadSprite("box", "sprites/box.png");
loadSprite("spikes", "sprites/spikes.png");
loadSprite("key", "sprites/key.png");
loadSprite("closedDoor", "sprites/doorClosed.png");
loadSprite("openedDoor", "sprites/doorOpened.png");
loadSprite("tramp1", "sprites/tramp1.png");
loadSprite("tramp2", "sprites/tramp2.png");
loadSprite("doublejump", "sprites/doublejump.png");
loadSprite("teleSwap", "sprites/teleSwap.png");
loadSprite("ghost", "sprites/ghost.png");
loadSprite("ghostblock", "sprites/ghostblock.png");
loadSprite("grow", "sprites/grow.png");
loadSprite("shrink", "sprites/shrink.png");
loadSprite("halfBlock", "sprites/halfBlock.png");
loadSprite("blackBox", "sprites/blackBox.png");
loadSprite("ice", "sprites/ice.png");
loadSprite("slime", "sprites/slime.png");
loadSprite("particle", "sprites/particle.png");
loadSprite("beanDash", "sprites/beanDash.png");
loadSprite("sky", "sprites/sky.png");
loadSprite("cloud1", "sprites/cloud1.png");
loadSprite("cloud2", "sprites/cloud2.png");
loadSprite('beachTiles', 'sprites/beachTiles.png', { sliceX: 8, sliceY: 8 });
//sounds
loadSound("sound-powerup", "sounds/sound-powerup.wav");
loadSound("sound-powerup2", "sounds/sound-powerup2.wav");
loadSound("sound-jump", "sounds/sound-jump.wav");
loadSound("sound-door", "sounds/sound-door.wav");
loadSound("sound-door2", "sounds/sound-door.wav");
loadSound("sound-teleswap", "sounds/sound-teleswap.wav");
loadSound("sound-lose", "sounds/sound-lose.mp3");
loadSound("sound-win", "sounds/sound-win.mp3");
loadSound("sound-pickupKey", "sounds/sound-pickupKey.wav");
loadSound("sound-error", "sounds/sound-error.wav");
loadSound("sound-hit", "sounds/sound-hit.wav");

//level conf
export const levelConf = () => {
  return ({    
    width: 16,
    height: 16,
    
    "P": () => ["startPlayer",],
    "+": () => [sprite("beachTiles", { frame: 17 }), area(), solid(),], //sand
    "=": () => [sprite("beachTiles", { frame: 18 }), area(), solid(),], //sand top
    "1": () => [sprite("beachTiles", { frame: 19 }), area(), solid(),], //sand top left
    "2": () => [sprite("beachTiles", { frame: 20 }), area(), solid(),], //sand top right
    "3": () => [sprite("beachTiles", { frame: 24 }), area(), solid(),], //sand, stone
    "L": () => [sprite("grass_l_top"), area(), solid(),],
    "R": () => [sprite("grass_r_top"), area(), solid(),],
    "#": () => [sprite("beachTiles", { frame: 56 }), area(), solid(), "box"],
    "^": () => [sprite("spikes"), area({ offset: [0, 6] }), solid(), color(COL.BLUE), "spikes", "enemy"],
    "@": () => [sprite("beanMonster"), area(), body(), color(COL.GREEN), scale(), patrol()],
    "J": () => [sprite("beachTiles", { frame: 48 }), area(), "doublejump", "powerUp"], //double jump color(COL.PURPLE)
    "i": () => [sprite("ice"), area(), solid(), color(COL.LIGHT_BLUE), "ice",],
    "K": () => [sprite("key"), area(), color(COL.GREEN), { name: 'key1' }, "key",],
    "E": () => [sprite("key"), area(), color(COL.RED), { name: 'key2' },"key",],
    "Y": () => [sprite("key"), area(), color(COL.BLUE),{ name: 'key3' },"key",],
    "k": () => [sprite("key"), color(COL.GREEN), fixed(), z(1), "answerKey",],
    "e": () => [sprite("key"), color(COL.RED), fixed(), z(1), "answerKey",],
    "y": () => [sprite("key"), color(COL.BLUE), fixed(), z(1),"answerKey",],
    "D": () => [sprite("closedDoor"), area(), scale(3), "closedDoor",],
    "O": () => [sprite("openedDoor"), area(), scale(3), "openedDoor",],
    "s": () => [sprite("slime", { flipY: true }), area({ offset: 6 }),solid(), color(COL.LGREEN), "slime",],
    "0": () => [sprite("ghost"), area(), opacity(1), color(COL.PURPLE), "ghost", "powerUp"],
    "g": () => [sprite("ghostblock"), area(), opacity(0), color(COL.LIGHT_BLUE), "invisibleBlock",],
    "G": () => [sprite("ghostblock"), area(), opacity(1), solid(), color(COL.PURPLE),"ghostblock",],
    "U": () => [sprite("teleSwap"), area(), color(COL.PURPLE), "teleSwap",],
    "t": () => [sprite("tramp1"), area(), solid(), "tramp1",],
    "T": () => [sprite("tramp2"), area(), solid(),  "tramp2",],
    "8": () => [sprite("grow"), area(), color(COL.MAGENTA), "grow", "powerUp"],
    "o": () => [sprite("shrink"), area(), color(COL.PURPLE), "shrink", "powerUp"],
    "£": () => [sprite("halfBlock"), area({ width: 12, height: 6 }), solid(),],
    "d": () => [sprite("shrink"), area(), color(COL.PURPLE), "dash", "powerUp"],
    "|": () => [sprite("halfBlock"), area(), solid(), opacity(0), "enemy",],
    ".": () => [sprite("particle"), area(), opacity(0.5),], //particle
    "B": () => [sprite("shrink"), color(COL.LIGHT_BLUE), area(), "barrier", "powerUp"],
    "b": () => [sprite("beachTiles", { frame: 57 }), area(), solid(),], //barrel
    "c": () => [sprite("beachTiles", { frame: 59 }), area(), solid(),], //chest
    "w": () => [sprite("beachTiles", { frame: 16 }), area(), z(5), opacity(0.5)], //water
    "z": () => [sprite("sky"), area(), layer(-10)],
    "x": () => [sprite("cloud1"), area(), layer(-9)],
    "<": () => [sprite("cloud2"), area(), layer(-9)],
    ">": () => [sprite("cloud2", { flipX: true }) , area(), layer(-9)],

  }
  )
}