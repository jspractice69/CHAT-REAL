const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

let LastMessage = ""

app.get('/chat', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    const file = "index.html";
    res.sendFile(file, options, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(err.status).end();
        } else {
            console.log('Sent:', file);
        }
    });
});


io.on("connection", socket => {
    console.log(`User Id: ${socket.id}`);
    
    if (LastMessage){
        socket.emit('message-out', LastMessage)
    }
    
    socket.on("Message", (data)=>{
        LastMessage = data
        io.emit('message-out',data)
    })
});


http.listen(3000, () => {
    console.log("Listening on port 3000");
});