
var _ = require('lodash');

class Printer{

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    addPrinter(machineCode, msign, nickName = '', phone = '') {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(msign))) {
            throw new Error('msign can not be empty');
        }
        return this.rpcClient.call('printer/addprinter', {machine_code : machineCode, msign : msign, print_name : nickName, phone : phone});
    }

    deletePrinter(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/deleteprinter', {machine_code : machineCode});
    }

    setVoice(machineCode, content, aid = '', isFile = false) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(content))) {
            throw new Error('set the content can not be empty');
        }
        if(!_.isBoolean(isFile)) {
            throw new Error('is_file parameter type must be boolean');
        }
        return this.rpcClient.call('printer/setvoice', {machine_code : machineCode, content : content, is_file : isFile, aid : aid});
    }

    deleteVoice(machineCode, aid) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isNumber(aid)) {
            throw new Error('aid can not be empty');
        }
        return this.rpcClient.call('printer/deletevoice', {machine_code : machineCode, aid : aid});
    }

    shutdownRestart(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/shutdownrestart', {machine_code : machineCode, response_type : type})
    }

    setsound(machineCode, voice, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        if(!_.isNumber(voice)) {
            throw new Error('voice parameter must be a number');
        }
        return this.rpcClient.call('printer/setsound', {machine_code : machineCode, response_type : type, voice : voice});
    }

    getPrintInfo(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/printinfo', {machine_code : machineCode});
    }

    getVersion(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/getversion', {machine_code : machineCode});
    }

    cancelAll(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/cancelall', {machine_code : machineCode});
    }

    cancelOne(machineCode, orderNo) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(orderNo)) {
            throw new Error('order_id parameter must be a number');
        }
        return this.rpcClient.call('printer/cancelone', {machine_code : machineCode, order_id : orderNo});
    }

    setIcon(machineCode, logoUrl) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(logoUrl))) {
            throw new Error('logoUrl can not be empty');
        }
        return this.rpcClient.call('printer/seticon', {machine_code : machineCode, img_url : logoUrl});
    }

    deleteIcon(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/deleteicon', {machine_code : machineCode});
    }

    btnPrint(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/btnprint', {machine_code : machineCode, response_type : type})
    }

    getOrder(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/getorder', {machine_code : machineCode, response_type : type})
    }

    getOrderStatus(machineCode, orderNo) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(orderNo)) {
            throw new Error('order_id parameter must be a number');
        }
        return this.rpcClient.call('printer/getorderstatus', {machine_code : machineCode, order_id : orderNo});
    }

    getOrderPagingList(machineCode, pageIndex = 1, pageSize = 10) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(pageIndex)) {
            throw new Error('page_index parameter must be a number');
        }
        if(!_.isNumber(pageSize)) {
            throw new Error('page_size parameter must be a number');
        }
        return this.rpcClient.call('printer/getorderpaginglist', {machine_code : machineCode, page_index : pageIndex, page_size : pageSize})
    }

    getPrintStatus(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/getprintstatus', {machine_code : machineCode});
    }

}

module.exports = Printer;