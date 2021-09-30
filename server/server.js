const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (client) => {
  client.emit("init", getClientId(client.id));
  client.on("keyPressedNow", (key) => {
    console.log(key)
  })
  client.on("pos", (posX, posY) => {
    client.broadcast.emit("moveOtherPlayer", posX, posY)
  })
  client.on("movObjPos", (objArray) => {
    client.broadcast.emit("syncObj", objArray);
  });
});

const getClientId=(id) =>{
  let x = { clientId: id };
  return x;
}

gameServer.listen(3000);
