
var _ = require('lodash');

class Print{

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    /**
     * 打印接口
     * @param machineCode 机器码
     * @param originId 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母
     * @param content 打印内容
     * @param idempotence 默认1，传入本参数，会根据origin_id进行幂等处理，2小时内相同origin_id会返回上一次的结果
     * @returns {*}
     */
    index(machineCode, originId, content, idempotence = 0) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(originId))) {
            throw new Error('origin_id can not be empty');
        }
        if(_.isEmpty(String(content))) {
            throw new Error('content can not be empty');
        }

        var params = {
            machine_code : machineCode,
            origin_id : originId,
            content : content
        };

        if (1 == idempotence) {
            params.idempotence = idempotence
        }

        return this.rpcClient.call('print/index', params)
    }

}

module.exports = Print;
