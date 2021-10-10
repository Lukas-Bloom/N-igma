//export const socket = io("ws://192.168.0.2:3000"); //change the address to the ip server in the LAN.
export const socket = io("ws://localhost:3000"); //change the address to the ip server in the LAN.
//export const socket = io("ws://192.168.1.231:3000"); //change the address to the ip server in the LAN.
//export const socket = io("ws://10.250.84.54:3000"); //change the address to the ip server in the LAN.

socket.on("ini", (msg) => {
  console.log(msg);
});