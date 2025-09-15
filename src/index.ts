import WebSocket, { WebSocketServer , RawData } from "ws";
import http, { IncomingMessage, ServerResponse } from 'http';

let userCount = 0;


const server = http.createServer(function(request : IncomingMessage , response : ServerResponse){

    // so i have added the types , i think this should be correct by now
    console.log(new Date()+ "Received Request For " + request.url);
    response.end("Connection Established , We can communicate now!!")

}) ;

const wss = new WebSocketServer({server});


wss.on('connection' , function connection(socket){
    socket.on('error' , console.error);


    socket.on('message' , function message(data : RawData , isBinary : boolean ){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data , {binary : isBinary});
            }
        });

    })

    userCount++;
    
    console.log("something has established a connection through a websocket " + userCount)

    socket.send("This is the message from the server!! , connection to the websocket has been established" )

});

server.listen(8080 , function(){
    console.log((new Date()) + "Server is listening on the port 8080")
})