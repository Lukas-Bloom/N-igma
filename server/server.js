const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  let currentRoom;
  client.emit("ini", getClientId(client.id));

  client.on("startGame", () => {
    codeToSend = client.id;
    codeToSend = codeToSend.substring(0, 4);
    currentRoom = codeToSend;
    client.join(codeToSend);
    client.emit("joinCode", codeToSend);
    client.emit("init");
  });

  client.on("joinGame", (roomCode) => {
    currentRoom = roomCode;
    async function xpectacularFunction() {
      let checkRooms, arrayRooms;
      if (roomCode.length !== 4) {
        console.log("baaaaaaaaaaad");
        client.emit("wrongCode");
        return;
      }
      try {
        checkRooms = await io.in(roomCode).fetchSockets();
        arrayRooms = Array.from(checkRooms[0].rooms);
      } catch {
        console.log("baaad2");
        io.emit("wrongCode");   
        return;
      }

      if (io.sockets.adapter.rooms.get(roomCode).size < 2) {
        client.join(roomCode);
        client.emit("init2");
      } else {
        console.log("too many playaer ");
        client.emit("tooManyP");
      }
    }
    xpectacularFunction();
  });

  client.on("pos", (posX, posY) => {
    client.to(currentRoom).emit("moveOtherPlayer", posX, posY);
  });
  client.on("movObjPos", (objArray) => {
    client.to(currentRoom).emit("syncObj", objArray);
  });
});

const getClientId = (id) => {
  let x = { clientId: id };
  return x;
};

gameServer.listen(3000);
