var _ = require('lodash');
var request = require('request');
var uuidv4 = require('uuid/v4');
var md5 = require('md5');
class RpcClient{
    constructor(token, config){
        this.atoken = token;
        this.configObj = config.getResponse();
        this.log = config.log;
    }

    call(action, obj) {
        if (!_.isObject(obj)) {
            throw new Error('pass in an object parameters');
        }
        if (_.isEmpty(action)) {
            throw new Error('action can not be empty');
        }
        obj.id = uuidv4();
        obj.client_id = this.configObj.clientId;
        obj.access_token = this.atoken;
        obj.timestamp = parseInt(new Date().getTime()/1000);
        obj.sign = md5(String(obj.client_id) + obj.timestamp + this.configObj.clientSecret);
        var requestUrl = this.configObj.url + "/" +action;
        return new Promise((resolve, reject)=>{
            this.post(obj, requestUrl).then(function (callback){
                resolve(callback);
            }).catch(function (error){
                reject(new Error('request failed:' + error));
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
                        // throw new Error('request failed:' + error);
                        return reject(new Error('request failed:' + error));
                    }
                    if (this.log) {
                        this.log.info(body)
                    }
                    try {
                        responseData = JSON.parse(body);
                    } catch (error) {
                        responseData = null;
                    }
                    if (!_.isObject(responseData)) {
                        throw new Error('response failed:' + body);
                    }
                    resolve(responseData);
                }
            );
        });
    }

}

module.exports = RpcClient;
