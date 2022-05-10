const io = require("socket.io-client");

const socket = io.connect("https://malfinder-server.herokuapp.com/");

module.exports = socket;
