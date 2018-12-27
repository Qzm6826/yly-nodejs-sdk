
var _ = require('lodash');

class Oauth{

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    setPushUrl(cmd, link, status = 'open') {
        if (_.isEmpty(String(cmd))) {
            throw new Error('cmd can not be empty');
        }
        if (_.isEmpty(String(link))) {
            throw new Error('url can not be empty');
        }
        return this.rpcClient.call('oauth/setpushurl', {cmd : cmd, url : link, status : status})
    }

}

module.exports = Oauth;