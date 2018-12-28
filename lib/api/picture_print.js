
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
     * @returns {*}
     */
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