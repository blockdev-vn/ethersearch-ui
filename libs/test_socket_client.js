var IOClient = require('socket.io-client');
var socket = IOClient('http://localhost:3001');
var self = this;
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
    
})
socket.on('TxNew', (msg) => {
    console.log(msg);
})
socket.on('Tx', (msg) => {
    console.log("New Tx ");
    console.log(msg);

})
socket.on('ERC20', (msg) => {
    console.log("new erc20 ");
    console.log(msg);
})