
var _ = require('lodash');

class PicturePrint {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    /**
     * 图形打印接口  (不支持机型: k4-wh, k4-wa, m1)
     * @param machineCode 机器码
     * @param pictureUrl 图片链接地址
     * @param originId 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母
     * @param idempotence 默认1，传入本参数，会根据origin_id进行幂等处理，2小时内相同origin_id会返回上一次的结果
     * @returns {*}
     */
    index(machineCode, pictureUrl, originId, idempotence = 0) {
        if (_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if (_.isEmpty(String(pictureUrl))) {
            throw new Error('picture_url can not be empty');
        }
        if (_.isEmpty(String(originId))) {
            throw new Error('origin_id can not be empty');
        }

        var params = {
            machine_code : machineCode,
            picture_url : pictureUrl,
            origin_id : originId
        };
        if (1 == idempotence) {
            params.idempotence = idempotence
        }

        return this.rpcClient.call('pictureprint/index', params);
    }

}

module.exports = PicturePrint;
