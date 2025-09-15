import WebSocket, { WebSocketServer } from "ws";
import http, { IncomingMessage, ServerResponse } from 'http';


const server = http.createServer(function(request : IncomingMessage , response : ServerResponse){

    // so i have added the types , i think this should be correct by now
    console.log(new Date()+ "Received Request For " + request.url);
    response.end("Connection Established")

}) ;

const wss = new WebSocketServer({server});


wss.on('connection' , function connection(ws){
    ws.on('error' , console.error);


    ws.on('message' , function message(data : any , isBinary : any){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data , {binary : isBinary});
            }
        });

    });


    ws.send("This is the message from the server!!")

});

server.listen(8080 , function(){
    console.log((new Date()) + "Server is listening on the port 8080")
})