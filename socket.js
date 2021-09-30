export const socket = io("ws://localhost:3000"); //change the address to the ip server in the LAN.
socket.on("init", (msg) => {
  console.log(msg);
});