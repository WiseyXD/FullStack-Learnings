import express from "express";
import WebSocket from "ws";
import http from "http";
const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.get("/", (req, res) => {
    console.log("getting api request on get endpoint.")
})

wss.on("connection", (ws) => {
    console.log("New connection established");
    ws.on("message", (message: string) => {
        ws.send("message back from server " + message);
        ws.send("Details of the socket connection " + ws);
    })
    ws.on("close", () => {
        console.log("Connection closed");
    });
});

server.listen(3000, () => {
    console.log("server is listening on port 3000");
});
