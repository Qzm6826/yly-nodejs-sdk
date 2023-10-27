
var _ = require('lodash');

class Config{
    constructor(opt){
        if (!opt.cid){
            throw new Error('client_id can not be empty');
        }
        if (!opt.secret){
            throw new Error('client_secret can not be empty');
        }
        this.clientId = opt.cid;
        this.clientSecret = opt.secret;
        this.requestUrl = "https://open-api.10ss.net/v2";
    }

    /**
     * 设置应用id
     * @param cid client_id
     */
    setCid(cid){
        this.clientId = cid;
    }

    /**
     * 获取应用id
     * @returns {*} client_id
     */
    getCid(){
        return this.clientId;
    }

    /**
     * 设置应用秘钥
     * @param secret client_secret
     */
    setSecret(secret){
        this.clientSecret = secret;
    }

    /**
     * 获取应用秘钥
     * @returns {*} client_secret
     */
    getSecret(){
        return this.clientSecret;
    }

    /**
     * 设置接口地址
     * @param url
     */
    setUrl(url){
        this.requestUrl = url;
    }

    /**
     * 获取接口地址
     * @returns {string|*}
     */
    getUrl(){
        return this.requestUrl;
    }

    /**
     * 获取应用信息
     * @returns {{clientId: *, clientSecret: *, url: string|*}}
     */
    getResponse(){
        return {
            'clientId' : this.clientId,
            'clientSecret' : this.clientSecret,
            'url':this.requestUrl
        };
    }

    /**
     * 记录日志
     * @param log
     */
    setLog(log) {
        if (_.isEmpty(log)) {
            throw new Error('log can not be empty')
        }

        if (!_.isFunction(log.info)) {
            throw new Error("cant't set log without method of info")
        }

        if (!_.isFunction(log.error)) {
            throw new Error("cant't set log without method of error")
        }

        this.log = log
    }

    /**
     * 获取日志
     * @param log
     * @returns {*}
     */
    getLog(log) {
        return this.log
    }

}

module.exports = Config;
