export const P1 = {
  POSX: 50,
  POSY: 0,
};
export const P2 = {
  POSX: 100,
  POSY: 0,
};

export const PLAYER = {
  WIDTH: 15,
  HEIGHT: 13,
}

export const COL = {
  BLACK: [0, 0, 0],
  WHITE: [255, 255, 255],
  RED: [255, 0, 0],
  BLUE: [0, 0, 255],
  GREEN: [0, 255, 0],
  ORANGE: [255, 150, 0],
  GREY: [160, 160 , 160],
  LGREY: [215, 215, 215],
  DGREY: [75, 75, 75],
  MAGENTA: [255, 0, 255],
  PURPLE: [180, 0, 180],
  SKYBLUE: [0, 190, 255],
  LGREEN: [0 , 255, 128],
  LIGHT_BLUE: [0, 255, 255],
  BRONZE: [205, 127, 50],
  SILVER: [211, 211, 211],
  GOLD: [255, 215, 0],
};

export const PHYS = {
  WORLD_SCALE:2,
  MOVE_SPEED: 140,
  FALL_DEATH: 2400,
  GRAVITY: 2000,
  SLIDE: 6,  // any factor of MOVE_SPEED. The smaller the more slippery
  JUMP_HEIGHT: 310,
  SLIME_JUMP: 230,
  SLIME_MOVE_SPEED: 70,
  TRAMP_JUMP_HEIGHT: 600,
  SWAP: 15,
};

export const OBJECT = {
  FAST: 120,
  MEDIUM: 60,
  SLOW: 30,
  LEFT: -1,
  RIGHT: 1,
  UP: -1,
  DOWN: 1,
  LONG: 100,
  SHORT: 25,
  LAGOM: 50,

  MOVE_SPEED: 140,
};
export const MAX_LEVEL = 3;

export const LEVEL_LENGTH = {
  0: 99 * 16,
  1: 47 * 16,
  2: 58 * 16,
  3: 120 * 16,
  4: 59 * 16, 
  5: 100 * 16, // don't exist
  6: 100 * 16, // don't exist
  7: 100 * 16, // don't exist
  8: 100 * 16, // don't exist
};
