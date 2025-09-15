"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const http_1 = __importDefault(require("http"));
let userCount = 0;
const server = http_1.default.createServer(function (request, response) {
    // so i have added the types , i think this should be correct by now
    console.log(new Date() + "Received Request For " + request.url);
    response.end("Connection Established , We can communicate now!!");
});
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', function connection(socket) {
    socket.on('message', function message(data, isBinary) {
        console.log("recieved %s", data);
        socket.send("message have been received !!");
    });
    userCount++;
    console.log("something has established a connection through a websocket " + userCount);
    socket.send("This is the message from the server!! , connection to the websocket has been established");
});
server.listen(8080, function () {
    console.log((new Date()) + "Server is listening on the port 8080");
});
