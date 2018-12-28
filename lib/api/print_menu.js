
var _ = require('lodash');

class PrintMenu {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    /**
     * 添加应用菜单接口
     * @param machineCode 机器码
     * @param content 菜单详情(json)
     * @returns {*}
     */
    addPrintMenu(machineCode, content) {
        if (_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if (_.isEmpty(String(content))) {
            throw new Error('content can not be empty');
        }
        return this.rpcClient.call('printmenu/addprintmenu', {machine_code : machineCode, content : content});
    }

}

module.exports = PrintMenu;