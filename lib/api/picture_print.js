
var _ = require('lodash');

class PicturePrint {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    index(machineCode, pictureUrl, originId) {
        if (_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if (_.isEmpty(String(pictureUrl))) {
            throw new Error('picture_url can not be empty');
        }
        if (_.isEmpty(String(originId))) {
            throw new Error('origin_id can not be empty');
        }
        return this.rpcClient.call('pictureprint/index', {machine_code : machineCode, picture_url : pictureUrl, origin_id : originId});
    }

}

module.exports = PicturePrint;