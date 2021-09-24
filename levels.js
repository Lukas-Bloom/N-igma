import {COL} from "./constants.js"
loadSprite("beanMonster", "sprites/bean.png");
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


function patrol(speed = 60, dir = 1) {
    return {
        id: "patrol",
        require: [ "pos", "area", ],
        update() {
            const vel = speed * dir;
            // if collides with something when it's moving, turn around
            const colliding = this.move(vel,0);
            if (colliding) {
                dir = vel > 0 ? -1 : 1;
            }}}}

export const levels =()=>{
return [
  [
    "                                                          ",
    "                                                          ",
    "                             ####           L=============",
    "                                            1             ",
    "                        #            L======              ",
    "                J                    1                    ",
    "              L===R                  1                    ",
    "              1   2                  1                    ",
    "              1   2       ^^^^^      1                    ",
    "==============     ==================                     ",
  ],
  [
    "                                                                                      1 ",
    "                                            L=============                             1",
    "                                            1                                          1",
    "                        # ======     L======                                           1                   ",
    "                                     1                                                 1                  ",
    "              L===R          @       1                                                 1                  ",
    "              1   2                                                                                       ",
    "              1   2                                                                                       ",
    "==============     =======================================================================================",
  ],
  [
    "============iiiiiiiiiiiiiiiiiiii                          ",
    "                                                          ",
    "                                                          ",
    "        iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii           ",
    "                                                          ",
    "                                                          ",
    " iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii                         ",
    "                                                          ",
    "                                                          ",
    "     iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii            ",
    "                                                          ",
    "                                                          ",
    " iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii                         ",
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                          =iiiiiiiiiiiiiii                ",
  ],
  [
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                             L=======R                    ",
    "                             1       2                    ",
    "                             1       2                    ",
    "                             1       2                    ",
    "=================ssssssssssss         ====================",
  ],
  [
    "                                                          ",
    "                             =============R               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2               ",
    "                                          2         O     ",
    "                                          2               ",
    "                   t                      2               ",
    "====================                       =============  ",
  ],
  [
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                                                          ",
    "                                                    D     ",
    "                                                          ",
    "                  K       E       Y                       ",
    "==========================================================",
  ],
  ];
}

export const levelConf =()=>{  return({    // define the size of each block
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
      sprite("beanMonster"),
      area(),
      body(),
      color(COL.GREEN),
      scale(),
      patrol()
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
  }
  )
}
