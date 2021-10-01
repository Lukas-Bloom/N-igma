export const socket = io("ws://localhost:3000"); //change the address to the ip server in the LAN.
socket.on("ini", (msg) => {
  console.log(msg);
});