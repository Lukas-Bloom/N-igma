const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
  origin: ["http://127.0.0.1:8080"],
  methods: ["GET", "POST"]
  },
});

io.on("connection", (client) => {
  client.emit("init", mama(client.id));
  client.on("keyPressedNow",(key)=>{
    console.log(key)
  })

});

function mama(id) {
  let x = { clientId: id };
  return x;
}

gameServer.listen(3000);
