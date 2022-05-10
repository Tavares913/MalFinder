const express = require("express");
const app = express();

const port = process.env.PORT || 8000;
const expressServer = app.listen(port);

const socketio = require("socket.io");
const io = socketio(expressServer, {
  cors: {
    origin: "*",
  },
});

let currentlySearchingClients = [];
let nonCurrentlySearchingClients = [];

const contains = (arr, item) => {
  for (let elem of arr) {
    if (elem == item) {
      return true;
    }
  }
  return false;
};

io.on("connection", (socket) => {
  nonCurrentlySearchingClients.push(socket.id);

  socket.on("begin-search", () => {
    console.log("beginning search");
    nonCurrentlySearchingClients = nonCurrentlySearchingClients.filter(
      (client) => client != socket.id
    );
    if (!contains(currentlySearchingClients, socket.id)) {
      currentlySearchingClients.push(socket.id);
    }
  });

  socket.on("end-search", () => {
    console.log("ending search");
    currentlySearchingClients = currentlySearchingClients.filter(
      (client) => client != socket.id
    );

    if (!contains(nonCurrentlySearchingClients, socket.id)) {
      nonCurrentlySearchingClients.push(socket.id);
    }
  });

  socket.on("num-clients-searching", () => {
    socket.emit(
      "num-clients-searching-response",
      currentlySearchingClients.length
    );
  });

  socket.on("disconnecting", () => {
    currentlySearchingClients = currentlySearchingClients.filter(
      (elem) => elem != socket.id
    );
    nonCurrentlySearchingClients = nonCurrentlySearchingClients.filter(
      (elem) => elem != socket.id
    );
  });
});

console.log("express and socketio are listening on port 8000");
