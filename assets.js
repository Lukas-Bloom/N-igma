import { COL } from "./constants.js";

//gfx
//loadSprite("beanMonster", "sprites/bean.png");
// loadSprite("box", "sprites/box.png");
// loadSprite("spikes", "sprites/spikes.png");
// loadSprite("key", "sprites/key.png");
// loadSprite("closedDoor", "sprites/doorClosed.png");
// loadSprite("openedDoor", "sprites/doorOpened.png");
// loadSprite("tramp1", "sprites/tramp1.png");
// loadSprite("tramp2", "sprites/tramp2.png");
// loadSprite("doublejump", "sprites/doublejump.png");
// loadSprite("teleSwap", "sprites/teleSwap.png");
// loadSprite("ghost", "sprites/ghost.png");
// loadSprite("ghostblock", "sprites/ghostblock.png");
// loadSprite("halfBlock", "sprites/halfBlock.png");
loadSprite("blackBox", "sprites/blackBox.png");
loadSprite("particle", "sprites/particle.png");
loadSprite("beanDash", "sprites/beanDash.png");
loadSprite("chest", "sprites/chest.png", { sliceX: 2, sliceY: 0 });
loadSprite("sandInside", "sprites/sandInside.png");
loadSprite("sky", "sprites/sky.png");
loadSprite("cloud1", "sprites/cloud1.png");
loadSprite("cloud2", "sprites/cloud2.png");
loadSprite('beachTiles', 'sprites/beachTiles.png', { sliceX: 8, sliceY: 8 });
loadSprite('jellyfish', 'sprites/jellyfish.png', {
  sliceX: 3, sliceY: 0, anims: {
    idle: 0,
    bounce: { from: 0, to: 2, loop: true }
  }});
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
loadSprite("beanDash", "sprites/beanDash.png");
loadSprite("tileMap", "sprites/tileMap.png", {
  sliceX: 20,
  sliceY: 20
});

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




//level conf
export const levelConf = () => {
  return ({
    width: 16,
    height: 16,

    "P": () => ["startPlayer",],
    "+": () => [sprite("beachTiles", { frame: 17 }), area(), solid(), layer(1), z(1)],                              //sand
    "=": () => [sprite("beachTiles", { frame: 18 }), area(), solid(), layer(1), z(1)],                              //sand top
    "1": () => [sprite("beachTiles", { frame: 19 }), area(), solid(), layer(1), z(1)],                              //sand top left
    "2": () => [sprite("beachTiles", { frame: 20 }), area(), solid(), layer(1), z(1)],                              //sand top right
    "3": () => [sprite("beachTiles", { frame: 24 }), area(), solid(), layer(1), z(1)],                              //sand, stone
    ":": () => [sprite("beachTiles", { frame: 21 }), area(), solid(), layer(1), z(1)],                              //sand, stone2
    "¤": () => [sprite("beachTiles", { frame: 25 }), area(), solid(), layer(1), z(1)],                              //sand, star
    "4": () => [sprite("beachTiles", { frame: 26 }), area(), layer(-1), z(-1)],                                     //dark sand
    "5": () => [sprite("sandInside"), area(), layer(-1), z(-1)],                                                    //dark sand, shadow
    "£": () => [sprite("beachTiles", { frame: 22 }), area({ width: 12, height: 6 }), solid(),],                     //halfblock sand top
    "$": () => [sprite("beachTiles", { frame: 23 }), area({ width: 12, height: 6 }), solid(),],                     //halfblock sand

    "6": () => [sprite("beachTiles", { frame: 32 }), area(), solid(), layer(1), z(1), "ice"],                       //oil left
    "7": () => [sprite("beachTiles", { frame: 33 }), area(), solid(), layer(1), z(1), "ice"],                       //oil
    "/": () => [sprite("beachTiles", { frame: 34 }), area(), solid(), layer(1), z(1), "ice"],                       //oil right
    "w": () => [sprite("beachTiles", { frame: 16 }), area({offset:[0,15]}), solid() ,z(5), opacity(0.5) ,"slime"],                          //water
    "^": () => [sprite("beachTiles", { frame: 35 }), area({offset:[0,8]}), solid(), "spikes", "enemy"],                           //spikes
    "p": () => [sprite("beachTiles", { frame: 36 }), area(), solid(), color(COL.BRONZE)],                           //platform
    "#": () => [sprite("beachTiles", { frame: 56 }), area(), solid(), "box"],                                       //box
    "b": () => [sprite("beachTiles", { frame: 57 }), area(), solid(),],                                             //barrel
    "t": () => [sprite("jellyfish", { animSpeed: 1}), area({offset:[0,8]}), solid(), layer(2), opacity(0.7), z(3), "tramp",],       //trampoline
    "g": () => [sprite("beachTiles", { frame: 37 }), area(), opacity(0), color(COL.LIGHT_BLUE), "invisibleBlock",], //invisible block
    "G": () => [sprite("beachTiles", { frame: 37 }), area(), opacity(1), solid(), color(COL.PURPLE), "ghostblock",],//ghostblock

    "J": () => [sprite("beachTiles", { frame: 48 }), area(), "doublejump", "powerUp"],                              //doublejump 
    "d": () => [sprite("beachTiles", { frame: 49 }), area(), "dash", "powerUp"],                                    //dash
    "o": () => [sprite("beachTiles", { frame: 50 }), area(), "shrink", "powerUp"],                                  //shrink
    "B": () => [sprite("beachTiles", { frame: 51 }), area(), "barrier", "powerUp"],                                 //barrier
    "8": () => [sprite("beachTiles", { frame: 52 }), area(), "grow", "powerUp"],                                    //grow
    "0": () => [sprite("beachTiles", { frame: 53 }), area(), opacity(1), "ghost", "powerUp"],                       //ghost
    "U": () => [sprite("beachTiles", { frame: 54 }), area(), "teleSwap",],                                          //teleswap
    "O": () => [sprite("chest", { frame: 1 }), body(), area(), "openedDoor",],                                      //chest open
    "D": () => [sprite("chest", { frame: 0 }), body(), area(), "closedDoor",],                                      //chest open

    "K": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.BRONZE), { name: 'bronze' }, "key",],          //key bronze
    "E": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.SILVER), { name: 'silver' }, "key",],          //key silver
    "Y": () => [sprite("beachTiles", { frame: 40 }), area(), color(COL.GOLD), { name: 'gold' }, "key",],            //key gold
    "k": () => [sprite("beachTiles", { frame: 40 }), color(COL.BRONZE), fixed(), z(1), "answerKey",],               //key bronze (answer)
    "e": () => [sprite("beachTiles", { frame: 40 }), color(COL.SILVER), fixed(), z(1), "answerKey",],               //key silver (answer)
    "y": () => [sprite("beachTiles", { frame: 40 }), color(COL.GOLD), fixed(), z(1), "answerKey",],                 //key gold (answer)
    "|": () => [sprite("beachTiles", { frame: 23 }), area(), solid(), opacity(0), "enemy",],                        //level bottom (death)
    
    ".": () => [sprite("beachTiles", { frame: 38 }), area(), opacity(0.5), "particle",],                                        //particle
    "z": () => [sprite("sky"), area(), layer(-100), z(-100)],                                                       //sky
    "x": () => [sprite("cloud1"), area(), layer(-9)],                                                               //cloud1
    "<": () => [sprite("cloud2"), area(), layer(-9)],                                                               //cloud2
    ">": () => [sprite("cloud2", { flipX: true }), area(), layer(-9)],                                              //cloud2 flipped
    
    //"@": () => [sprite("beanMonster"), area(), body(), color(COL.GREEN), scale(), patrol()],                      //monster
  }
  )
}