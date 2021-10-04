import { COL } from "./constants.js";

//gfx
loadSprite("beanMonster", "sprites/bean.png");
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
loadSprite("halfBlock", "sprites/halfBlock.png");
loadSprite("blackBox", "sprites/blackBox.png");
loadSprite("particle", "sprites/particle.png");
loadSprite("beanDash", "sprites/beanDash.png");
loadSprite("chest", "sprites/chest.png");
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
    "+": () => [sprite("beachTiles", { frame: 17 }), area(), solid(), layer(1), z(1)], //sand
    "=": () => [sprite("beachTiles", { frame: 18 }), area(), solid(), layer(1), z(1)], //sand top
    "1": () => [sprite("beachTiles", { frame: 19 }), area(), solid(), layer(1), z(1)], //sand top left
    "2": () => [sprite("beachTiles", { frame: 20 }), area(), solid(), layer(1), z(1)], //sand top right
    "3": () => [sprite("beachTiles", { frame: 24 }), area(), solid(), layer(1), z(1)], //sand, stone
    "¤": () => [sprite("beachTiles", { frame: 25 }), area(), solid(), layer(1), z(1)], //sand, star
    "4": () => [sprite("beachTiles", { frame: 26 }), area(), layer(-1), z(-1)], //dark sand
    "5": () => [sprite("beachTiles", { frame: 27 }), area(), layer(-1), z(-1)], //dark sand, shadow
    "6": () => [sprite("beachTiles", { frame: 32 }), area(), solid(), layer(1), z(1)], //oil left
    "7": () => [sprite("beachTiles", { frame: 33 }), area(), solid(), layer(1), z(1)], //oil
    "/": () => [sprite("beachTiles", { frame: 34 }), area(), solid(), layer(1), z(1)], //oil right
    "^": () => [sprite("beachTiles", { frame: 35 }), area(), solid(), "spikes", "enemy"], //spikes
    "#": () => [sprite("beachTiles", { frame: 56 }), area(), solid(), "box"], //box
    "b": () => [sprite("beachTiles", { frame: 57 }), area(), solid(),], //barrel
    "c": () => [sprite("chest"), area(), solid(),], //chest
    //"L": () => [sprite("grass_l_top"), area(), solid(),],
    //"R": () => [sprite("grass_r_top"), area(), solid(),],
    //"i": () => [sprite("ice"), area(), solid(), color(COL.LIGHT_BLUE), "ice",],
    "J": () => [sprite("beachTiles", { frame: 48 }), area(), "doublejump", "powerUp"], //doublejump 
    "d": () => [sprite("beachTiles", { frame: 49 }), area(), "dash", "powerUp"], //dash
    "o": () => [sprite("beachTiles", { frame: 50 }), area(), "shrink", "powerUp"], //shrink
    "B": () => [sprite("beachTiles", { frame: 51 }), area(), "barrier", "powerUp"], //barrier
    "8": () => [sprite("beachTiles", { frame: 52 }), area(), "grow", "powerUp"], //grow
    "@": () => [sprite("beanMonster"), area(), body(), color(COL.GREEN), scale(), patrol()],
    "K": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.BRONZE), { name: 'key1' }, "key",], //key bronze
    "E": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.SILVER), { name: 'key2' }, "key",], //key silver
    "Y": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.GOLD), { name: 'key3' }, "key",], //key gold
    "k": () => [sprite("key"), color(COL.GREEN), fixed(), z(1), "answerKey",],
    "e": () => [sprite("key"), color(COL.RED), fixed(), z(1), "answerKey",],
    "y": () => [sprite("key"), color(COL.BLUE), fixed(), z(1), "answerKey",],
    "D": () => [sprite("closedDoor"), area(), scale(3), "closedDoor",],
    "O": () => [sprite("openedDoor"), area(), scale(2), "openedDoor",],
    "s": () => [sprite("slime", { flipY: true }), area({ offset: 6 }), solid(), color(COL.LGREEN), "slime",],
    "0": () => [sprite("ghost"), area(), opacity(1), color(COL.PURPLE), "ghost", "powerUp"],
    "g": () => [sprite("ghostblock"), area(), opacity(0), color(COL.LIGHT_BLUE), "invisibleBlock",],
    "G": () => [sprite("ghostblock"), area(), opacity(1), solid(), color(COL.PURPLE), "ghostblock",],
    "U": () => [sprite("teleSwap"), area(), color(COL.PURPLE), "teleSwap",],
    "t": () => [sprite("tramp1"), area(), solid(), "tramp1",],
    "T": () => [sprite("tramp2"), area(), solid(), "tramp2",],
    "£": () => [sprite("halfBlock"), area({ width: 12, height: 6 }), solid(),],
    "|": () => [sprite("halfBlock"), area(), solid(), opacity(0), "enemy",],
    ".": () => [sprite("particle"), area(), opacity(0.5),], //particle
    "w": () => [sprite("beachTiles", { frame: 16 }), area(), z(5), opacity(0.5)], //water
    "z": () => [sprite("sky"), area(), layer(-100), z(-100)], //sky
    "x": () => [sprite("cloud1"), area(), layer(-9)], //cloud1
    "<": () => [sprite("cloud2"), area(), layer(-9)], //cloud2
    ">": () => [sprite("cloud2", { flipX: true }), area(), layer(-9)], //cloud2 flipped

  }
  )
}