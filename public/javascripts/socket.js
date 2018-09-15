var Socket = function (url, handleBlock, handleTx) {
    this.url = url;
    this.handleBlock = handleBlock;
    this.handleTx = handleTx;
}
Socket.prototype.start = function () {
    var socket = io(this.url);
    var self = this;
    // socket.on('connect', function(){});
    // socket.on('event', function(data){});
    socket.on('disconnect', function () {
        console.log("Disconnect to server")
    });
    socket.on('connect', (client) => {
        console.log('connect');
        socket.emit('join', 'BlockNew');
        socket.emit('join', 'TxNew');

        socket.on('join', (msg) => {
            console.log('join to ', msg);
        })

    })
    socket.on('BlockNew', (msg) => {
        // console.log('BlockNew ', msg.number);
        self.handleBlock(msg);
    })
    socket.on('TxNew', (msg) => {
        self.handleTx(msg)
    })
}
