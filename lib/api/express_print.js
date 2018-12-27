
var _ = require('lodash');

class ExpressPrint {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    index(machineCode, content, originId) {
        if (_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if (_.isEmpty(String(content))) {
            throw new Error('content can not be empty');
        }
        if (_.isEmpty(String(originId))) {
            throw new Error('origin_id can not be empty');
        }
        return this.rpcClient.call('expressprint/index', {machine_code : machineCode, content : content, origin_id : originId});
    }

}

module.exports = ExpressPrint;