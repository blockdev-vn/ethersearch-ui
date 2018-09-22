# ethersearch-ui
This is a web app for ethereum blockexplorer.

Live demo at: [http://172.104.62.202/](http://172.104.62.202/)

# Install
```
npm install
```
# Start
```
npm run api
npm run ui
```
# Settings
### Api
Api is a web app that connects directly to fullnode. You should change configure:
* `RCP_URL`: rpc url to fullnode.
* `WS_URL`: ws url to fullnode.
* `PORT`: running port.
### UI
UI is a web interface app that connect to the Api above to get information.
* `SERVER_IP`: IP of server that runs UI.
* `PORT`: running port.
* `API_URL`: url to the Api above.

### Documents
* [Architect](https://github.com/blockdev-vn/ethersearch-ui/blob/master/docs/architect.md)
* [Api](https://github.com/blockdev-vn/ethersearch-ui/blob/master/docs/api.md)
* [Socket](https://github.com/blockdev-vn/ethersearch-ui/blob/master/docs/socket.md)