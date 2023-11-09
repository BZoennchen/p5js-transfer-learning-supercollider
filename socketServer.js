let express = require('express');
let app = express();
let server = app.listen(3000);

const PORT_IN = 57121
const PORT_OUT = 7448
const SERVER_PORT = 3000;

app.use(express.static('public'))

console.log("server is running");

let socket = require('socket.io');

let io = socket(server, {
  cors: {
    origin: 'http://localhost:'+SERVER_PORT,
    methods: ["GET", "POST"]
  }
});

function newConnection(socket) { 
    console.log('new connection: ' + socket.id);
    socket.on('sendMessage', receiveMessage);
}

function receiveMessage(data) { 
    console.log(data);

    var msg = {
        address: "/wek/outputs",
        args: [
            {
                type: "s",
                value: data.label
            }
        ]
    };

    console.log("Sending message", msg.address, msg.args, "to", udpPort.options.remoteAddress + ":" + udpPort.options.remotePort);
    udpPort.send(msg);
}

io.sockets.on('connection', newConnection);

var osc = require("osc");

var udpPort = new osc.UDPPort({
    // This is the port we're listening on.
    localAddress: "127.0.0.1",
    localPort: PORT_IN,

    // This is where sclang is listening for OSC messages.
    remoteAddress: "127.0.0.1",
    remotePort: PORT_OUT,
    metadata: true
});

// Open the socket.
udpPort.open();