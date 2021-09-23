const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
  origin: ["http://127.0.0.1:8080"],
  methods: ["GET", "POST"]
  },
});

io.on("connection", (client) => {
  client.emit("init", getClientId(client.id));
  client.on("keyPressedNow",(key)=>{
    console.log(key)
  })

  client.on("posP1", (posX,posY)=>{
    console.log(posX,posY)
    client.broadcast.emit("test", posX,posY)

  })

});

function getClientId(id) {
  let x = { clientId: id };
  return x;
}

gameServer.listen(3000);
