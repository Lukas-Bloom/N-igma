const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const checkIp = require("os");
let myCurrentIp;
try {
  myCurrentIp = checkIp.networkInterfaces()["Wi-Fi"][1].address;
} catch (e) {}
exports.myCurrentIp = `${myCurrentIp}`;

io.on("connection", (client) => {
  console.log(
    "\x1b[35m%s%s\x1b[0m",
    "Local IP address to use as a SERVER in local network: ",
    myCurrentIp + ":8080"
  );

  let currentRoom;

  client.emit("ini", getClientId(client.id));

  client.on("startGame", (z) => {
    if (z) console.log("One of the rooms is: ", "\x1b[36m", z);

    if (z.length !== 4) {
      codeToSend = client.id;
      codeToSend = codeToSend.substring(0, 4);
      currentRoom = codeToSend;
      client.join(codeToSend);
      client.emit("joinCode", codeToSend);
      client.emit("init");
    } else {
      codeToSend = z;
      currentRoom = z;
      client.join(z);
      client.emit("joinCode", z);
      client.emit("init");
    }
  });

  client.on("joinGame", (roomCode) => {
    currentRoom = roomCode;
    async function xpectacularFunction() {
      let checkRooms, arrayRooms;
      if (roomCode.length !== 4) {
        io.emit("wrongCode", roomCode);
        return;
      }

      try {
        checkRooms = await io.in(roomCode).fetchSockets();
        arrayRooms = Array.from(checkRooms[0].rooms);
      } catch (err) {
        io.emit("wrongCode", "say whaaaat. bad 2");
        // joining player will move to a temp room in currrent level when host ends game
        client.join("tempRoom");
        client.emit("init2");
        return;
      }

      if (io.sockets.adapter.rooms.get(roomCode).size < 2) {
        client.join(roomCode);
        client.emit("init2");
      } else {
        client.emit("tooManyP");
      }
    }
    xpectacularFunction();
  });

  client.on("disconnect", () => {
    client.to(currentRoom).emit("reLoad");
  });

  client.on("pos", (posX, posY) => {
    client.to(currentRoom).emit("moveOtherPlayer", posX, posY);
  });
  client.on("movObjPos", (objArray) => {
    client.to(currentRoom).emit("syncObj", objArray);
  });

  client.on("gameOver", () => {
    io.to(currentRoom).emit("gameOver");
  });

  client.on("powerUp", (powerUp, obj) => {
    client.to(currentRoom).emit("powerUp", powerUp, obj);
  });

  client.on("key", (obj) => {
    client.to(currentRoom).emit("key", obj);
  });

  client.on("teleSwap", (obj) => {
    client.to(currentRoom).emit("teleSwap", obj);
  });

  client.on("nextLevel", (nextLevel) => {
    io.to(currentRoom).emit("nextLevel", nextLevel);
  });
});

const getClientId = (id) => {
  let x = { clientId: id };
  return x;
};

gameServer.listen(3000);
