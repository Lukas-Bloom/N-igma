import {COL} from "./constants.js"
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
loadSound("sound-powerup", "sounds/sound-powerup.wav");
loadSound("sound-jump", "sounds/sound-jump.wav");
loadSound("sound-door", "sounds/sound-door.wav");
loadSound("sound-teleswap", "sounds/sound-teleswap.wav");


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
  //0
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
  //1
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
  //2
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
  //3
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
  //4
  [
    "                                            ==============",
    "                                                          ",
    "                                    gg                    ",
    "                                                          ",
    "                           g                              ",
    "                                                          ",
    "                                                          ",
    "            0                                             ",
    "==========================================================",
    ],
  //5
  [
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
  //6
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
  //7
  [
    "                                    U                     ",
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
    "                                          2          O    ",
    "                                          2               ",
    "                   t                      2               ",
    "====================                       =============  ",
  ],
  //8
  [
    "                                                                   D    ",
    "                                                                        ",
    "                                                                        ",
    "                                                               L======= ",
    "                                                               1        ",
    "                                                               1        ",
    "                                                               1        ",
    "                              J    U                           1        ",
    "                             L=======R                         1        ",
    "                             1       2                         1        ",
    "                             1       2                         1        ",
    "                             1       2       K     E     Y     1        ",
    "=================ssssssssssss         =========================         ",
  ],
  //9
  [
    "                                                                        ",
    "                                                                        ",
    "                                                                        ",
    "                                                               L======= ",
    "                                                               1        ",
    "                                                               1        ",
    "                             L=======R                         1        ",
    "                             1       2                         1        ",
    "                             1       2                         1        ",
    "                             1       2                         1        ",
    "                             1       2                         1        ",
    "               8     J       1       2                         1        ",
    "=============================         =========================         ",
  ],
  //10
  [
    "                 key                           ",
    "        Y                         E            ",
    "        #####                   ggg            ",
    "            #                 ggg              ",
    "            #               ggg                ",
    "            #             ggg                  ",
    "            #######     ggg             D      ",
    "           g#U    #g                           ",
    "           g     0 gK    J                     ",
    "===============================================",
  ],
  //11
  [
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                   #            ",
    "                   #            ",
    "           #   8   #     JU     ",
    "================================",
  ],
  //12
  [
    "                 key            ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "                                ",
    "            K          D        ",
    "          #####                 ",
    "         o£E Y£                 ",
    "================================",
  ],
  //13
  [
    "         Y       key                              ",
    "   D                                              ",
    "                                                  ",
    "         E      U                                 ",
    "gggggggggggggggggg                                ",
    "                                     K            ",
    "                                   ^^iiii         ",
    "                                   ######  #      ",
    "           g                       ££££££ ##      ",
    "       J  0g      t                #=========     ",
    "           g      £     o          #              ",
    "#####################^####sssssssss###############",
    "##################################################",
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
      opacity(1),
      scale(1),
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
      area({offset: 6}),
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
      color(COL.PURPLE),
      "doublejump",
      "powerUp"
    ],
    "i": () => [
      sprite("ice"),
      area(),
      solid(),
      color(COL.LIGHT_BLUE),
      "ice",
    ],
    "K": () => [
      sprite("key"),
      area(),
      color(COL.GREEN),
      {name: 'key1'},
      "key",
    ],
    "E": () => [
      sprite("key"),
      area(),
      color(COL.RED),
      { name: 'key2' },
      "key",
    ],
    "Y": () => [
      sprite("key"),
      area(),
      color(COL.BLUE),
      { name: 'key3' },
      "key",
    ],
    "k": () => [
      sprite("key"),
      color(COL.GREEN),
      fixed(),
      "answerKey",
    ],
    "e": () => [
      sprite("key"),
      color(COL.RED),
      fixed(),
      "answerKey",
    ],
    "y": () => [
      sprite("key"),
      color(COL.BLUE),
      fixed(),
      "answerKey",
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
      sprite("slime", {flipY: true}),
      area({offset: 6}),
      solid(),
      color(COL.LGREEN),
      "slime",
    ],
    "0": () => [
      sprite("ghost"),
      area(),
      opacity(1),
      color(COL.PURPLE),
      "ghost",
      "powerUp"
    ],
    "g": () => [
      sprite("ghostblock"),
      area(),
      opacity(0),
      color(COL.LIGHT_BLUE),
      "invisibleBlock",
    ],
    "G": () => [
      sprite("ghostblock"),
      area(),
      opacity(1),
      solid(),
      color(COL.PURPLE),
      "ghostblock",
    ],
    "U": () => [
      sprite("teleSwap"),
      area(),
      color(COL.PURPLE),
      "teleSwap",
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
    "8": () => [
      sprite("grow"),
      area(),
      color(COL.MAGENTA),
      "grow",
      "powerUp"
    ],
    "o": () => [
      sprite("shrink"),
      area(),
      color(COL.PURPLE),
      "shrink",
      "powerUp"
    ],
    "£": () => [
      sprite("halfBlock"),
      area({width: 12, height: 6}),
      solid(),
    ],
    
    
  }
  )
}
