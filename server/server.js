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
    client.broadcast.emit("joinCode", client.id);
    client.join("testRoom");
    client.playerNumber = 1;
    client.emit("init", client.playerNumber);
  });

  client.on("joinGame", (code) => {
    console.log("the joing game client", client.id);
    console.log("the code", code);
    console.log("client rooms before", client.rooms);
    if (code === "123" && io.sockets.adapter.rooms.get("testRoom").size < 2) {
      client.join("testRoom");
      console.log("TRUE");
      client.playerNumber = 2;
      client.emit("init2", client.playerNumber);
    }
    else console.log("wrong code or too many playaer ");

    console.log(
      "how many now ?",
      io.sockets.adapter.rooms.get("testRoom").size
    );

    //console.log("client rooms after", client.rooms);

    //console.log(io.sockets.adapter.rooms.get("myRoom" ).size)
    // const room=code
    //console.log("30", room);

    // let allUsers;
    // if (room) {
    //   allUsers = room;
    //   console.log("28",allUsers)
    // }

    // let numClients = 0;
    // if (allUsers) {
    //   numClients = Object.keys(allUsers).length;
    //   console.log("34",numClients)
    // }

    // if (numClients === 0 || numClients > 1) {
    //   client.emit("nope");
    //   console.log("nope")
    //   return;
    // }

    // const foo = async () => {
    //   const sockets = await io.fetchSockets();
    //   console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

    //   for (const socket of sockets) {
    //     console.log("IDEEE", socket.id);
    //     // console.log("handsjake", socket.handshake);
    //     console.log("rooomsss", socket.rooms);
    //     console.log("dataaaa", socket.data);
    //   }
    // };

    // foo();
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
