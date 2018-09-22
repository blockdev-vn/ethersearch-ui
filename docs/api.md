
# Api of UI
## Address
### Address balance
Return balance of given address

```
/addr/nonce?a=0x2F0036792DF25362a2DE0Bab82B4798657B4BC36&block=latest
```

```
38
```

### Address nonce
Return nonce of given address

```
/addr/nonce?a=0x2F0036792DF25362a2DE0Bab82B4798657B4BC36&block=latest
```

```
"648320380374280103671755200316"
```

### Address history
Return 20 latest transactions of given address
```
/api/addr/txs?a=0x2F0036792DF25362a2DE0Bab82B4798657B4BC36
```

```
{
    "data": [
        {
            "blockNumber": 10566,
            "blockTime": 1534431406,
            "from": "0x2f0036792df25362a2de0bab82b4798657b4bc36",
            "gasPrice": "1",
            "gasUsed": "21000",
            "hash": "0xd8d7740442770335a677c5f50a80ae43526bb93679edc6ea41ecc4ef5e9bdcbb",
            "to": "0xc4c7fc58b37be1b4f2a6230cace76afd47cff748",
            "txIndex": 0,
            "type": 0,
            "value": "10"
        },
        {
            "blockNumber": 10562,
            "blockTime": 1534431394,
            "from": "0x2f0036792df25362a2de0bab82b4798657b4bc36",
            "gasPrice": "1",
            "gasUsed": "21000",
            "hash": "0x432e5dd342e52659c811dc1b88a7781011bf80ede75ac386e5dce03b634510f0",
            "to": "0xc4c7fc58b37be1b4f2a6230cace76afd47cff748",
            "txIndex": 0,
            "type": 0,
            "value": "10"
        }
    ]
}
```
### Address erc20 balance
Return erc20 balance of given address
```
/addr/balance?a=0x2F0036792DF25362a2DE0Bab82B4798657B4BC36&block=latest
```
```
"0x0000000000000000000000000000000000000000000000000000000000000075"
```
### Address erc20 history
Return 20 latest erc20 transactions of given address
```
/api/addr/erc20/txs?a=0xc4c7fc58b37be1b4f2a6230cace76afd47cff748&c=0x2d051595aa51a29c6eda4eacafbe79234508ca7c
```

```
{
    "data": [
        {
            "blockTime": 1537070616,
            "contract": "0x2d051595aa51a29c6eda4eacafbe79234508ca7c",
            "from": "0x2f0036792df25362a2de0bab82b4798657b4bc36",
            "hash": "0x9c4f0c1711058a51f814ac3ed65fdbb13a0643de9fc65b15d765d055b56324c3",
            "logIndex": 0,
            "to": "0xc4c7fc58b37be1b4f2a6230cace76afd47cff748",
            "txIndex": 0,
            "type": 1,
            "value": "9"
        }
    ]
}
```
