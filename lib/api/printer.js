
var _ = require('lodash');

class Printer{

    constructor(rpc_client) {
        this.rpcClient = rpc_client;
    }

    /**
     * 自有型应用授权终端
     * @param machineCode 机器码
     * @param msign 机器密钥
     * @param nickName 打印机昵称
     * @param phone gprs卡号
     * @returns {*}
     */
    addPrinter(machineCode, msign, nickName = '', phone = '') {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(msign))) {
            throw new Error('msign can not be empty');
        }
        return this.rpcClient.call('printer/addprinter', {machine_code : machineCode, msign : msign, print_name : nickName, phone : phone});
    }

    /**
     * 删除终端授权接口
     * @param machineCode 机器码
     * @returns {*}
     */
    deletePrinter(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/deleteprinter', {machine_code : machineCode});
    }

    /**
     * 设置内置语音接口
     * 注意: 仅支持K4-WA、K4-GAD、K4-WGEAD型号
     * @param machineCode 机器码
     * @param content 在线语音地址链接 or 自定义语音内容(json)
     * @param aid 0 ~ 9 , 定义需设置的语音编号,若不提交,默认升序
     * @param isFile true or false
     * @returns {*}
     */
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

    /**
     * 删除内置语音接口
     * 注意: 仅支持K4-WA、K4-GAD、K4-WGEAD型号
     * @param machineCode 机器码
     * @param aid 0 ~ 9 编号
     * @returns {*}
     */
    deleteVoice(machineCode, aid) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isNumber(aid)) {
            throw new Error('aid can not be empty');
        }
        return this.rpcClient.call('printer/deletevoice', {machine_code : machineCode, aid : aid});
    }

    /**
     * 关机重启接口
     * @param machineCode 机器码
     * @param type restart or shutdown
     * @returns {*}
     */
    shutdownRestart(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/shutdownrestart', {machine_code : machineCode, response_type : type})
    }

    /**
     * 声音调节接口
     * @param machineCode 机器码
     * @param voice 音量 0 ~ 3
     * @param type buzzer (蜂鸣器) or horn (喇叭)
     * @returns {*}
     */
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

    /**
     * 获取机型打印宽度接口
     * @param machineCode 机器码
     * @returns {*}
     */
    getPrintInfo(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/printinfo', {machine_code : machineCode});
    }

    /**
     * 获取机型软硬件版本接口
     * @param machineCode 机器码
     * @returns {*}
     */
    getVersion(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/getversion', {machine_code : machineCode});
    }

    /**
     * 取消所有未打印订单接口
     * @param machineCode 机器码
     * @returns {*}
     */
    cancelAll(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/cancelall', {machine_code : machineCode});
    }

    /**
     * 取消单条未打印订单接口
     * @param machineCode 机器码
     * @param orderNo 未打印的易联云ID
     * @returns {*}
     */
    cancelOne(machineCode, orderNo) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(orderNo)) {
            throw new Error('order_id parameter must be a number');
        }
        return this.rpcClient.call('printer/cancelone', {machine_code : machineCode, order_id : orderNo});
    }

    /**
     * 设置logo接口
     * @param machineCode 机器码
     * @param logoUrl logo链接地址
     * @returns {*}
     */
    setIcon(machineCode, logoUrl) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(logoUrl))) {
            throw new Error('logoUrl can not be empty');
        }
        return this.rpcClient.call('printer/seticon', {machine_code : machineCode, img_url : logoUrl});
    }

    /**
     * 取消logo接口
     * @param machineCode 机器码
     * @returns {*}
     */
    deleteIcon(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/deleteicon', {machine_code : machineCode});
    }

    /**
     * 按键打印设置接口
     * @param machineCode 机器码
     * @param type btnopen or btnclose
     * @returns {*}
     */
    btnPrint(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/btnprint', {machine_code : machineCode, response_type : type})
    }

    /**
     * 接单拒单设置接口
     * @param machineCode 机器码
     * @param type open or close
     * @returns {*}
     */
    getOrder(machineCode, type) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(_.isEmpty(String(type))) {
            throw new Error('response_type can not be empty');
        }
        return this.rpcClient.call('printer/getorder', {machine_code : machineCode, response_type : type})
    }

    /**
     * 获取订单状态接口
     * @param machineCode 机器码
     * @param orderNo 易联云订单id
     * @returns {*}
     */
    getOrderStatus(machineCode, orderNo) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(orderNo)) {
            throw new Error('order_id parameter must be a number');
        }
        return this.rpcClient.call('printer/getorderstatus', {machine_code : machineCode, order_id : orderNo});
    }

    /**
     * 获取订单列表接口
     * @param machineCode 机器码
     * @param pageIndex 第几页  最大100
     * @param pageSize 查询条数 最大100
     * @returns {*}
     */
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

    /**
     * 订单重打（单订单）
     * @param machineCode
     * @param orderNo
     * @returns {*}
     */
    reprint(machineCode, orderNo) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if(!_.isNumber(orderNo)) {
            throw new Error('order_id parameter must be a number');
        }
        return this.rpcClient.call('printer/reprintorder', {machine_code : machineCode, order_id : orderNo});
    }

    /**
     * 获取终端状态接口
     * @param machineCode 机器码
     * @returns {*}
     */
    getPrintStatus(machineCode) {
        if(_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        return this.rpcClient.call('printer/getprintstatus', {machine_code : machineCode});
    }

    /**
     * K8关键词设置接口
     * @param machineCode
     * @param keys
     * @param type
     * @param content
     * @returns {*}
     */
    setKeyWords(machineCode, keys, type, content) {
        if (_.isEmpty(String(machineCode))) {
            throw new Error('machine_code can not be empty');
        }
        if (_.isEmpty(String(keys))) {
            throw new Error('keys can not be empty');
        }
        if (_.isEmpty(String(type))) {
            throw new Error('type can not be empty');
        }
        return this.rpcClient.call('printer/setkeywords', {machineCode : machineCode, keys : keys, type : type, content : content})
    }

}

module.exports = Printer;
