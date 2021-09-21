import Kaboom from './kaboomClass.js'


const hugo = new Kaboom([0,0,0])

hugo.doThis()

const vadSomHelst=hugo.k


const socket = io("ws://localhost:3000");
socket.on("init", (msg) => {
  console.log(msg);
});


let currentKey
const start=()=>{

  document.addEventListener("keydown", keydown);
}


const keydown = (e) => {
  currentKey=e.keyCode
  console.log("e keycode:",e.keyCode ," and current Key:", currentKey);
  socket.emit("keyPressedNow", currentKey);
};

start()
// import kaboom lib


vadSomHelst.loadSprite("bean", "sprites/bean.png");


// define some constants
const MOVE_SPEED = 480;
const FALL_DEATH = 2400;



vadSomHelst.scene("game", () => {
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
  const player = add([
    sprite("bean"),
    pos(0, 0),
    area(),
    scale(2),
    // makes it fall to gravity and jumpable
    body(),
    // the custom component we defined above
    origin("bot"),
  ]);

  // action() runs every frame
  player.action(() => {
    // center camera to player
    camPos(player.pos);
    // check fall death
    if (player.pos.y >= FALL_DEATH) {
      go("lose");
    }
  });

 
 

  vadSomHelst.keyDown("left", () => {
    player.move(-MOVE_SPEED, 0);
  });

  vadSomHelst.keyDown("right", () => {
    player.move(MOVE_SPEED, 0);
  });


});

vadSomHelst.scene("lose", () => {
  add([text("You Lose")]);
  keyPress(() => go("game"));
});

vadSomHelst.scene("win", () => {
  add([text("You Win")]);
  keyPress(() => go("game"));
});

vadSomHelst.go("game");
