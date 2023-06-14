var _ = require('lodash');
var request = require('request');
var uuidv4 = require('uuid/v4');
var md5 = require('md5');
class OauthClient{
    constructor(config) {
        this.configObj = config.getResponse();
        this.requestUrl = this.configObj.url + "/" + "oauth/oauth";
        this.log = config.log;
    }

    /**
     *获取调用凭证
     * @param code  授权码（仅开放型模式需要）
     * @returns {boolean}
     */
    getToken(code = '') {
        var obj = {};
        if(_.isEmpty(code)) {
            obj.grant_type = 'client_credentials';
        }else {
            obj.grant_type = 'authorization_code';
            obj.code = code;
        }
        obj.id = uuidv4();
        obj.scope = 'all';
        obj.client_id = this.configObj.clientId;
        obj.timestamp = parseInt(new Date().getTime()/1000);
        obj.sign = md5(String(obj.client_id) + obj.timestamp + this.configObj.clientSecret);
        return new Promise((resolve)=>{
            this.post(obj, this.requestUrl).then(function (callback){
                resolve(callback);
            })
        });
    }

    /**
     *更新调用凭证
     * @param refreshToken 刷新令牌（有效期35天）
     * @returns {boolean}
     */
    refreshToken(refreshToken) {
        var obj = {};
        if(_.isEmpty(refreshToken)) {
            throw new Error('refresh_token can not be empty');
        }
        obj.id = uuidv4();
        obj.scope = 'all';
        obj.grant_type = 'refresh_token';
        obj.refresh_token = refreshToken;
        obj.client_id = this.configObj.clientId;
        obj.timestamp = parseInt(new Date().getTime()/1000);
        obj.sign = md5(String(obj.client_id) + obj.timestamp + this.configObj.clientSecret);
        return new Promise((resolve)=>{
            this.post(obj, this.requestUrl).then(function (callback){
                resolve(callback);
            })
        });
    }

    post(params, url) {
        if (this.log) {
            this.log.info(params)
        }
        var responseData = '';
        return new Promise(function (resolve,reject) {
            request.post(
                {
                    url: url,
                    form: params
                }, function (error, httpResponse, body) {
                    if (!_.isEmpty(error)) {
                        throw new Error('request failed:' + error);
                    }
                    if (this.log) {
                        this.log.info(body)
                    }
                    responseData = JSON.parse(body);
                    if (!_.isObject(responseData)) {
                        throw new Error('response failed:' + body);
                    }
                    resolve(responseData);
                }
            );
        });
    }

}

module.exports = OauthClient;
