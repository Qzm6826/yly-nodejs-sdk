<h1 align="center">yly-nodejs-sdk</h1>
<p align="center">
<a href="https://www.travis-ci.org/Qzm6826/yly-nodejs-sdk"><img src="https://www.travis-ci.org/Qzm6826/yly-nodejs-sdk.svg?branch=master" alt="Build Status"></a>
</p>

# Requirement
```
node,npm
```

# Installation  
```shell
 npm install yly-nodejs-sdk --save
```  

# Usage || instructions
1. 接口类lib/api/*.js，集成了所有的易联云接口
2. 配置类config.js
3. 授权类oauth_client.js，获取调用凭证AccessToken，每日上限次数２０次，２４小时后更新次数
4. 接口调用类rpc_client.js，可以直接用这个类直接进行接口调用

### 第1步引入sdk
```js
var yly = require('yly-nodejs-sdk');   
```

### 第2步实例化一个配置对象
```js
var config = new yly.Config({
    'cid' : '',         //应用id
    'secret' : ''       //应用秘钥
});
```

### 第3步实例化一个oauth2.0客户端授权模式的授权对象
```js
var oauthClient = new yly.OauthClinet(config);
```

### 第4步获取调用凭证token对象(返回值为一个promise)，此步获取到的token对象可在有效期内一直使用，不用每次调用前都去获取一次，建议应用授权一次后存放到全局缓存中
```js
oauthClient.getToken().then(function (res){
    if (
        res.error != 0 &&
        res.error_description != 'success'
    ) {
        throw new Error('failed:' + res.error_description);
    }
    var tokenData = {
        'accessToken' : res.body.access_token,
        'refreshToken' : res.body.refresh_token,
    };
    if (res.body.machine_code != null) {
        tokenData.machineCode = res.body.machine_code;
    }
    console.log(tokenData);
});
```

### 第5步实例化远程调用的rpcClient对象
```js
var RpcClient = new yly.RpcClient(accessToken, config);
```

### 第6步实例化一个API对象
```js
var Print = new yly.Print(RpcClient);
```

### 第7步调用服务方法，获取资源数据,返回promise对象
```js
Print.index(machineCode, originId, content).then(function(res){
    console.log(res);
});
```

# ChangeLog
#### [v2.0.1]
* Release Date : 2023-10-18
1. [Feature]v2更新[K8关键词设置](https://www.kancloud.cn/ly6886/oauth-api/3198288)接口。
#### [v2.0]
* Release Date : 2023-06-07
1. [Feature]更新接口v2.0版本，[文档](https://www.kancloud.cn/ly6886/oauth-api/3170299)
2. [Feature]v2新增[订单重打（单订单）](https://www.kancloud.cn/ly6886/oauth-api/3170332)接口。
3. [Feature]v2新增[面单取消](https://www.kancloud.cn/ly6886/oauth-api/3170326)
