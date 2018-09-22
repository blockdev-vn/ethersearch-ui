var IOClient = require('socket.io-client');
var IOServer = require('socket.io');
var Tx = require('ethereumjs-tx');
var CONST = require('./const')

class Socket {
    constructor(url, server) {
        this.client = IOClient(url);
        this.server = IOServer(server, { origins: '*:*'});
        // this.server = IOServer(server);
        // this.server.set('transports', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
        // this.server.set('origins', '*:*');
    }
    start() {
        this.connectToApi();
        this.handleConnectionFromClient();
    }
    handleConnectionFromClient() {
        var self = this;
        self.server.sockets.on('connection', function (socket) {
            console.log('connect from ', socket.id);
            self.handleJoin(socket);
            self.handleLeave(socket);
        })
    }

    handleJoin(socket) {
        socket.on(CONST.Join, (room) => {
            console.log('join ', room);
            socket.join(room);
            socket.emit(CONST.Join, room);
        })
    }

    handleLeave(socket) {
        socket.on(CONST.Leave, (room) => {
            socket.leave(room);
        })
    }

    connectToApi() {
        var self = this;
        var io = this.client
        io.on('connect', (socket) => {
            console.log('connect');
            io.emit('join', 'BlockNew');
            io.emit('join', 'TxNew');
        
            io.on('join', (msg) => {
                console.log('join to ', msg);
            })
        })
        io.on('BlockNew', (msg) => {
            console.log('BlockNew ', msg.number);
            self.server.to(CONST.BlockNew).emit(CONST.BlockNew, msg);
            if (this.app && this.app.blocks) {
                this.app.blocks.slice(1);
                this.app.blocks.push(msg);
            }
        })
        io.on('TxNew', (msg) => {
            var tx = new Tx(msg)
            msg.from = '0x' + tx.getSenderAddress().toString('hex');
            console.log('TxNew ', msg);
            self.server.to(CONST.TxNew).emit(CONST.TxNew, msg);

        })
    }
}

module.exports = Socket