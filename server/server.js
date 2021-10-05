const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (client) => {
  client.emit("init", mama(client.id));
  client.on("keyPressedNow", (key) => {
    console.log(key)
  })

  client.on("pos", (posX, posY) => {
    client.broadcast.emit("moveOtherPlayer", posX, posY)
  })

  client.on("gameOver", () => {
    client.broadcast.emit("gameOver")
  })

  client.on("powerUp", (powerUp, obj) => {
    client.broadcast.emit("powerUp", powerUp, obj)
  })

  client.on("key", (obj) => {
    client.broadcast.emit("key", obj)
  })

  client.on("teleSwap", (obj) => {
    client.broadcast.emit("teleSwap", obj)
  })

  client.on("nextLevel", (nextLevel) => {
    client.broadcast.emit("nextLevel", nextLevel)
  })
});

function mama(id) {
  let x = { clientId: id };
  return x;
}

gameServer.listen(3000);
