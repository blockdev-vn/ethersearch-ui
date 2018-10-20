var Socket = function (url, handleBlock, handleTx, t) {
    this.url = url;
    this.handleBlock = handleBlock;
    this.handleTx = handleTx;
    this.t = t
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
        socket.emit('join', '2d051595aa51a29c6eda4eacafbe79234508ca7c');

        socket.on('join', (msg) => {
            console.log('join to ', msg);
        })

    })
    socket.on('BlockNew', (msg) => {
        console.log('BlockNew ', msg);
        self.handleBlock(msg);
    })
    socket.on('TxNew', (msg) => {
        self.handleTx(msg)
    })
    socket.on('2d051595aa51a29c6eda4eacafbe79234508ca7c', (msg) => {
        console.log("Address ");
        console.log(msg);

        if (self.t) {
            self.t(msg)
        }
    })
    socket.on('Tx', (msg) => {
        console.log("New Tx ");
        console.log(msg);

        if (self.t) {
            self.t(msg)
        }
    })
    socket.on('ERC20', (msg) => {
        console.log("new erc20 ");
        console.log(msg);

        if (self.t) {
            self.t(msg)
        }
    })
}
