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

loadSprite("bean", "sprites/bean.png");

scene("game", () => {
  gravity(3200);

  // add level to scene

  add([
    rect(width(), 100),
    outline(4),
    pos(-500, height()),
    origin("botleft"),
    area(),
    solid(),
    color(127, 200, 255),
  ]);

  // define player object
  const player1 = add([
    sprite("bean"),
    pos(-400, 0),
    area(),
    scale(2),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);

  const player2 = add([
    sprite("bean"),
    pos(-200, 0),
    area(),
    scale(2),
    color(0, 0, 240),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);

  const players = [player1, player2]

  action(() => {
    socket.emit("pos", players[playerNumber - 1].pos.x, players[playerNumber - 1].pos.y)
    socket.on("moveOtherPlayer", (x, y) => {
      players[playerNumber === 1 ? 1 : 0].moveTo(x, y)
    })
  });

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

});


