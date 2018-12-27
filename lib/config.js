
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
        this.requestUrl = "https://open-api.10ss.net/";
    }

    setCid(cid){
        this.clientId = cid;
    }

    getCid(){
        return this.clientId;
    }

    setSecret(secret){
        this.clientSecret = secret;
    }

    getSecret(){
        return this.clientSecret;
    }

    setUrl(url){
        this.requestUrl = url;
    }

    getUrl(){
        return this.requestUrl;
    }

    getResponse(){
        return {
            'clientId' : this.clientId,
            'clientSecret' : this.clientSecret,
            'url':this.requestUrl
        };
    }

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

    getLog(log) {
        return this.log
    }

}

module.exports = Config;