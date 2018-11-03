const request = require('request');
const async = require('async');
class BlockchainApi {
    constructor(apiUrl) {
        this.rootUrl = apiUrl;
        this.addressUrl = this.rootUrl + '/addr?a='
        this.addressTxs = this.rootUrl + '/addr/txs'
        this.addressNonce = this.rootUrl + '/addr/nonce'
        this.addressBalance = this.rootUrl + '/addr/balance'
        this.addressERC20Txs = this.rootUrl + '/addr/erc20/txs'
        this.addressERC20Balance = this.rootUrl + '/addr/erc20/balance'
        this.blockUrl = this.rootUrl + '/block?number='
        this.txUrl = this.rootUrl + '/tx?hash='
        this.latestNumberUrl = this.rootUrl + '/latestnumber'
        this.txPending = this.rootUrl + '/tx/pool?limit='
        this.contractList = this.rootUrl + '/contract/list?offset=0'
    }

    getBlockByNumer(number, cb) {
        var url = `${this.blockUrl}${number}`;
        console.log('getBlockByNumer ', number);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    getTx(hash, cb) {
        var url = `${this.txUrl}${hash}`;
        console.log('getTx ', hash);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    getAddressSummary(addr, cb) {
        var url = this.addressUrl + addr;

        request.get(url, (error, response, body) => {
            var statusCode = response && response.statusCode;
            // console.log(body);
            if (statusCode == 200) {
                var result = JSON.parse(body)
                cb(null, result);
            } else {
                cb(error, null)
            }
        });
    }

    getERC20History(addr, contractAddr, cb) {
        var url = `${this.addressERC20Txs}?a=${addr}&c=${contractAddr}`;
        console.log('getERC20History ', addr, contractAddr);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {               
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }
    getERC20Balance(addr, contractAddr, cb) {
        var url = `${this.addressERC20Balance}?a=${addr}&c=${contractAddr}`;
        console.log('getERC20History ', addr, contractAddr);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {               
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    getAddressHistory(addr, cb) {
        var url = `${this.addressTxs}?a=${addr}`;
        console.log('getAddressHistory ', addr);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    getAddressNonce(addr, cb) {
        var url = `${this.addressNonce}?a=${addr}`;
        console.log('addressNonce ', addr);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {               
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }
    getAddressBalance(addr, cb) {
        var url = `${this.addressBalance}?a=${addr}`;
        console.log('addressNonce ', addr);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {               
                cb(null, body);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    getPendingTx(limit, cb) {
        var url = this.txPending + limit;
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                cb(null, body.data);
            } else {
                cb(error || statusCode, null)
            }
        });
    }

    get10LatestBlock(cb) {
        var self = this;
        var rs = [];
        var url = this.latestNumberUrl;
        console.log("get10LatestBlock ", url);
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                var number = body.data;
                var limit = number - 10;
                async.whilst(
                    () => { return number > limit },
                    (next) => {
                        self.getBlockByNumer(number, (err, block) => {
                            // console.log(block);
                            if (block) {
                                rs.push(block.data)
                            }
                            number--;
                            next(err)
                        })
                    },
                    () => {
                        cb(null, rs);
                    }
                );

            } else {
                cb(null, rs)
            }
        });
    }
    getLatestContract(cb) {
        var url = this.contractList
        request.get({ url: url, json: true }, (error, response, body) => {
            var statusCode = response && response.statusCode;
            if (statusCode == 200) {
                cb(null, body.data);
            } else {
                cb(error || statusCode, null)
            }
        });
    }
}
module.exports = BlockchainApi