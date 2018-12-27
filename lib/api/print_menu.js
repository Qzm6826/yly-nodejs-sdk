
var _ = require('lodash');

class PrintMenu {

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

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