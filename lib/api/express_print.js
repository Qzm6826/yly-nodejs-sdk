
var _ = require('lodash');

class ExpressPrint {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    /**
     * 电子面单接口
     * @param machineCode 机器码
     * @param content 面单数据
     * @param originId 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母
     * @returns {*}
     */
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