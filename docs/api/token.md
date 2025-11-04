# Token 获取与刷新

## 概述

Token是调用易联云API的凭证,包括access_token和refresh_token。每日获取token的次数上限为20次,token有效期为24小时。

## 获取调用凭证

### 方法说明

`getToken(code)` - 获取access_token

**参数:**

- `code` (可选) - 授权码,仅开放型应用模式需要传入,自有应用模式无需传入

**返回值:**
返回Promise对象,响应数据包含:

- `access_token` - 调用凭证,有效期24小时
- `refresh_token` - 刷新令牌,有效期35天
- `expires_in` - access_token过期时间(秒)
- `machine_code` - 机器码(开放型应用返回)

### 使用示例

#### 1. 自有应用模式(client_credentials)

```js
var yly = require('yly-nodejs-sdk');

// 配置应用信息
var config = new yly.Config({
    'cid': 'your_client_id',         // 应用id
    'secret': 'your_client_secret'   // 应用秘钥
});
config.setUrl('https://open-api.10ss.net/v2');

// 创建OAuth客户端
var oauthClient = new yly.OauthClinet(config);

// 获取token
oauthClient.getToken().then(function (res){
    if (res.error != 0 && res.error_description != 'success') {
        throw new Error('failed:' + res.error_description);
    }

    var tokenData = {
        'accessToken': res.body.access_token,
        'refreshToken': res.body.refresh_token,
    };

    // 计算过期时间
    var expiresTime = parseInt(new Date().getTime()/1000) + res.body.expires_in - 86400;

    console.log('Token获取成功:', tokenData);

    // 建议将token存储到缓存中(如Redis)
    // redis.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime);
});
```

#### 2. 开放型应用模式(authorization_code)

```js
var yly = require('yly-nodejs-sdk');

var config = new yly.Config({
    'cid': 'your_client_id',
    'secret': 'your_client_secret'
});

var oauthClient = new yly.OauthClinet(config);

// 传入授权码获取token
var authorizationCode = 'user_authorization_code';

oauthClient.getToken(authorizationCode).then(function (res){
    if (res.error != 0 && res.error_description != 'success') {
        throw new Error('failed:' + res.error_description);
    }

    var tokenData = {
        'accessToken': res.body.access_token,
        'refreshToken': res.body.refresh_token,
        'machineCode': res.body.machine_code  // 开放型应用会返回机器码
    };

    console.log('Token获取成功:', tokenData);
});
```

## 开放型应用-极速授权token

### 方法说明

`getgetTokenBySecret(machineCode, secret, secretType = 0)` - 通过终端信息获取access_token

**参数:**

- `machineCode` (必填) - 终端号
- `secret` (必填) - 终端密钥或二维码密钥
- `secretType` - 密钥类型 0-终端密钥 1-二维码密钥

**返回值:**
返回Promise对象,响应数据包含:

- `access_token` - 调用凭证,有效期24小时
- `refresh_token` - 刷新令牌,有效期35天
- `expires_in` - access_token过期时间(秒)
- `machine_code` - 机器码(开放型应用返回)

### 使用示例

```js
var yly = require('yly-nodejs-sdk');

// 配置应用信息
var config = new yly.Config({
    'cid': 'your_client_id',         // 应用id
    'secret': 'your_client_secret'   // 应用秘钥
});
config.setUrl('https://open-api.10ss.net/v2');

// 创建OAuth客户端
var oauthClient = new yly.OauthClinet(config);

// 传入授权码获取token
var machineCode = '1233443244';
var secret = '*******'
var secretType = 0

// 获取token
oauthClient.getTokenBySecret(machineCode, secret, secretType).then(function (res){
    if (res.error != 0 && res.error_description != 'success') {
        throw new Error('failed:' + res.error_description);
    }

    var tokenData = {
        'accessToken': res.body.access_token,
        'refreshToken': res.body.refresh_token,
    };

    // 计算过期时间
    var expiresTime = parseInt(new Date().getTime()/1000) + res.body.expires_in - 86400;

    console.log('Token获取成功:', tokenData);

    // 建议将token存储到缓存中(如Redis)
    // redis.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime);
});
```

## 刷新调用凭证

### 方法说明

`refreshToken(refreshToken)` - 使用refresh_token刷新access_token

**参数:**
- `refreshToken` (必填) - 刷新令牌,通过getToken获取

**返回值:**
返回Promise对象,响应数据与getToken相同

### 使用示例

```js
var yly = require('yly-nodejs-sdk');

var config = new yly.Config({
    'cid': 'your_client_id',
    'secret': 'your_client_secret'
});

var oauthClient = new yly.OauthClinet(config);

// 使用之前保存的refresh_token刷新
var oldRefreshToken = 'your_refresh_token';

oauthClient.refreshToken(oldRefreshToken).then(function (res){
    if (res.error != 0 && res.error_description != 'success') {
        throw new Error('failed:' + res.error_description);
    }

    var tokenData = {
        'accessToken': res.body.access_token,
        'refreshToken': res.body.refresh_token,
    };

    console.log('Token刷新成功:', tokenData);
});
```

## 实现原理

### 请求参数

获取token时,SDK会自动构建以下参数:

**自有应用模式:**
```js
{
    grant_type: 'client_credentials',  // 授权类型
    id: uuid,                          // 唯一请求ID
    scope: 'all',                      // 授权范围
    client_id: 'your_client_id',       // 应用ID
    timestamp: 1234567890,             // 时间戳
    sign: 'md5_signature'              // 签名: md5(client_id + timestamp + client_secret)
}
```

**开放型应用模式:**
```js
{
    grant_type: 'authorization_code',  // 授权类型
    code: 'authorization_code',        // 授权码
    id: uuid,
    scope: 'all',
    client_id: 'your_client_id',
    timestamp: 1234567890,
    sign: 'md5_signature'
}
```

**刷新token:**
```js
{
    grant_type: 'refresh_token',       // 授权类型
    refresh_token: 'your_refresh_token', // 刷新令牌
    id: uuid,
    scope: 'all',
    client_id: 'your_client_id',
    timestamp: 1234567890,
    sign: 'md5_signature'
}
```

### 请求地址

```
POST {baseUrl}/oauth/oauth
```

默认baseUrl: `https://open-api.10ss.net/v2`

## 最佳实践

### 1. Token缓存管理

建议将token存储到缓存中(如Redis),避免频繁请求:

```js
const redis = require('redis');
const client = redis.createClient();

// 获取token后存储
oauthClient.getToken().then(function (res){
    if (res.error != 0 && res.error_description != 'success') {
        throw new Error('failed:' + res.error_description);
    }

    var tokenData = {
        'accessToken': res.body.access_token,
        'refreshToken': res.body.refresh_token,
    };

    // 设置过期时间(提前1天刷新,避免过期)
    var expiresTime = parseInt(new Date().getTime()/1000) + res.body.expires_in - 86400;

    client.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime);
});

// 使用token时从缓存读取
client.get('tokenData', function(err, reply){
    if (err || !reply) {
        // token不存在或已过期,重新获取
        return oauthClient.getToken();
    }

    var tokenData = JSON.parse(reply);
    var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    // 调用API...
});
```

## 注意事项

1. **调用限制**: 每日获取token的次数上限为20次,建议做好缓存管理
2. **有效期**: access_token有效期24小时,refresh_token有效期35天
3. **提前刷新**: 建议在token过期前刷新,避免API调用失败
4. **安全存储**: client_secret和token应安全存储,不要暴露在客户端代码中
5. **错误重试**: 网络异常时应有重试机制,但要注意不要超过每日调用限制
