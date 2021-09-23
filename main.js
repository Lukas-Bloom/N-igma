import kaboom from './node_modules/kaboom/dist/kaboom.mjs'
const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});


let currentKey
let playerNumber


const start = () => {

  document.addEventListener("keydown", keydown);

  const newGameBtn = document.getElementById('newGameButton');
  const joinGameBtn = document.getElementById('joinGameButton');

  newGameBtn.addEventListener('click', newGame);
  joinGameBtn.addEventListener('click', joinGame);

  function newGame() {
    playerNumber = 1
    go("game");
  }

  function joinGame() {
    playerNumber = 2
    go("game");
  }
}


const keydown = (e) => {
  currentKey = e.keyCode
  console.log("e keycode:", e.keyCode, " and current Key:", currentKey);
  socket.emit("keyPressedNow", currentKey);
};

start()
// import kaboom lib
kaboom({
  clearColor: ['black'],
})

// define some constants
const MOVE_SPEED = 480;
const FALL_DEATH = 2400;

//load assets
loadSprite("bean", "sprites/bean.png");
loadSprite("grass", "sprites/grass.png");
loadSprite("grass_l", "sprites/grass_l.png");
loadSprite("grass_r", "sprites/grass_r.png");
loadSprite("grass_l_top", "sprites/grass_l_top.png");
loadSprite("grass_r_top", "sprites/grass_r_top.png");
loadSprite("box", "sprites/box.png");
loadSprite("spikes", "sprites/spikes.png");

  const LEVELS = [
    [
    "                                                          ",
    "                             ####           L=============",
    "                                            1             ",
    "                        #            L======              ",
    "                                     1                    ",
    "              L===R                  1                    ",
    "              1   2                  1                    ",
    "              1   2       ^^^^^      1                    ",
    "==============     ==================                     ",
    ],
  ]

  const levelConf =  {
    // define the size of each block
    width: 16,
    height: 16,
    // define what each symbol means
    "=": () => [
      sprite("grass"),
      area(),
      solid(),
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
    ],
    
};
  
scene("game", ({ levelId } = { levelId: 0}) => {

  gravity(3200);

  // add level to scene
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);


  // define player object
  const player1 = add([
    sprite("bean"),
    pos(50, 0),
    area(),
    scale(2),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);

  const player2 = add([
    sprite("bean"),
    pos(100, 0),
    area(),
    scale(2),
    color(0, 0, 240),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);

  const players = [player1, player2]


  // action() runs every frame
  players[playerNumber - 1].action(() => {
    // center camera to player
    camPos(players[playerNumber - 1].pos);
    // check fall death
    if (players[playerNumber - 1].pos.y >= FALL_DEATH) {
      go("lose");
    }
  });

  keyDown("left", () => {
    players[playerNumber - 1].move(-MOVE_SPEED, 0);
  });

  keyDown("right", () => {
    players[playerNumber - 1].move(MOVE_SPEED, 0);
  });

  keyPress("space", () => {
    players[playerNumber - 1].jump();
  });

});


