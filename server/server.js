const app = require("express")();
const gameServer = require("http").createServer(app);
const io = require("socket.io")(gameServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  client.emit("ini", getClientId(client.id));

  client.on("startGame", () => {
    codeToSend = client.id;
    codeToSend = codeToSend.substring(0, 4);
    client.emit("joinCode", codeToSend);
    client.join(codeToSend);
    client.playerNumber = 1;
    client.emit("init", client.playerNumber);
  });

  client.on("joinGame", (roomCode) => {
    async function x() {
      let checkRooms, arrayRooms;
      if (roomCode.length !== 4) {
        console.log("baaaaaaaaaaad");
        return;
      }
      try {
        checkRooms = await io.in(roomCode).fetchSockets();
        arrayRooms = Array.from(checkRooms[0].rooms);
      } catch {
        console.log("baaad2");
        return;
      }

      if (io.sockets.adapter.rooms.get(roomCode).size < 2) {
        client.join(roomCode);
        client.playerNumber = 2;
        client.emit("init2", client.playerNumber);
      } else console.log("too many playaer ");
    }
    x();

    // const mauro = async () => {
    //   const sockets = await io.fetchSockets();
    //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    //   for (const socket of sockets) {
    //     console.log("IDEEE", socket.id);
    //     // console.log("handsjake", socket.handshake);
    //     console.log("rooomsss", socket.rooms);
    //     console.log("dataaaa", socket.data);
    //   }
    // };

    // mauro();
  });

  client.on("keyPressedNow", (key) => {
    console.log(key);
  });
  client.on("pos", (posX, posY) => {
    client.broadcast.emit("moveOtherPlayer", posX, posY);
  });
  client.on("movObjPos", (objArray) => {
    client.broadcast.emit("syncObj", objArray);
  });
});

const getClientId = (id) => {
  let x = { clientId: id };
  return x;
};

gameServer.listen(3000);
