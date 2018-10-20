# Socket
Socket supports 3 channels: NewBlock, NewTx and {address}.
1. NewBlock: notify all new blocks
2. NewTx: notify all new transactions
3. {address}: Notify all transactions that are relevant to the address.

# Usage
[Code sample](https://github.com/blockdev-vn/ethersearch-ui/blob/master/libs/test_socket_client.js)

```
var IOClient = require('socket.io-client');
var socket = IOClient('http://localhost:3001');
var self = this;
socket.on('disconnect', function () {
    console.log("Disconnect to server")
});
socket.on('connect', (client) => {
    console.log('connect');
    // Join to new block channel
    socket.emit('join', 'BlockNew');

    // Join to new transaction channel
    socket.emit('join', 'TxNew');

    // Join to address 2d051595aa51a29c6eda4eacafbe79234508ca7c channel
    socket.emit('join', '2d051595aa51a29c6eda4eacafbe79234508ca7c');

    socket.on('join', (msg) => {
        console.log('join to ', msg);
    })

})

// Handle new block
socket.on('BlockNew', (msg) => {
    console.log('BlockNew ', msg);
    
})

// Handle new transaction
socket.on('TxNew', (msg) => {
    console.log(msg);
})

// Handle transaction of address 2d051595aa51a29c6eda4eacafbe79234508ca7c
// including new tx and confirmed tx
socket.on('Tx', (msg) => {
    console.log("New Tx ");
    console.log(msg);

})

// Hande erc20 tx of address 2d051595aa51a29c6eda4eacafbe79234508ca7c
socket.on('ERC20', (msg) => {
    console.log("new erc20 ");
    console.log(msg);
})
```
# Results
## BlockNew
* addessess is list of all tx.
* addresses[0]: Nornmal tx.
* addresses[1]: erc20 tx.
```
{ addresses: [ [ [Object] ], [ [Object] ] ],
  gasLimit: 4712388,
  gasUsed: 36231,
  miner: '0x0000000000000000000000000000000000000000',
  number: 17206,
  timestamp: 1540005941,
  txNumber: 1,
  uncleNumber: 0 
}
```
## TxNew
```
{ nonce: '0x4b',
  gasPrice: '0x174876e800',
  gas: '0x15f90',
  to: '0xc4c7fc58b37be1b4f2a6230cace76afd47cff748',
  value: '10',
  input: '0x',
  v: '0xfe8',
  r: '0x332746cdbf4161e2e2f789b9a9d30d2ef88386f72491734c554c32516fa090e1',
  s: '0x485607a8687683e107c3c7af733cce08a5c4cd1612457b7a70880ae685dcf868',
  hash: '0xf4cbe168ca96a0dee99e3d0476d88e7da64213299640664164e02efce1d02b8c',
  from: 'bef631117a301a3b36441da63f68f9e99ba2af1a'
}

```
## Address
### Tx
```
{ from: '2d051595aa51a29c6eda4eacafbe79234508ca7c',
  to: '2f0036792df25362a2de0bab82b4798657b4bc36',
  value: '0',
  blockNumber: 17206,
  timestamp: 1540005941,
  txIndex: 0,
  hash: '906d1fb87f820cfdd2ae318345d0cc2a1824b33e2f80929135fae0286a99b3a6',
  gasUsed: 36231,
  gasPrice: '100000000000',
  type: 'a' }
```
### ERC20 
```
{ contract: '2d051595aa51a29c6eda4eacafbe79234508ca7c',
  from: '2f0036792df25362a2de0bab82b4798657b4bc36',
  to: 'c4c7fc58b37be1b4f2a6230cace76afd47cff748',
  value: '9',
  timestamp: 1540005941,
  txIndex: 0,
  logIndex: 0,
  hash: '906d1fb87f820cfdd2ae318345d0cc2a1824b33e2f80929135fae0286a99b3a6',
  type: 't' }

```