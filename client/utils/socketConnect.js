const io = require("socket.io-client");

const socket = io.connect("localhost:8000");

module.exports = socket;
