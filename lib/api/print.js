
var _ = require('lodash');

class Print{

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    index(machineCode, originId, content) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(originId))) {
            throw new Error('origin_id can not be empty');
        }
        if(_.isEmpty(String(content))) {
            throw new Error('content can not be empty');
        }
        return this.rpcClient.call('print/index', {machine_code : machineCode, origin_id : originId, content : content})
    }

}

module.exports = Print;