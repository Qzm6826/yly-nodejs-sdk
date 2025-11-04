# Oauth - OAuth 配置

## 概述

Oauth 类用于管理易联云的 OAuth 相关配置,包括设置推送回调地址。

## 初始化

```javascript
const { Oauth, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
config.setUrl('https://open-api.10ss.net/v2');
const rpcClient = new RpcClient(config);
const oauth = new Oauth(rpcClient);
```

## API 方法

### setPushUrl - 设置推送URL接口

设置接收易联云推送消息的回调地址。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| cmd | string | 是 | - | 推送队列键 |
| link | string | 是 | - | 推送地址URL |
| status | string | 否 | 'open' | 推送开关,可选值: 'open'/'close' |

#### 返回值

返回 Promise 对象,resolve 时包含接口响应数据。

#### 示例

```javascript
// 开启推送
oauth.setPushUrl('print_status', 'https://yourdomain.com/callback', 'open')
  .then(res => {
    console.log('推送URL设置成功:', res);
  })
  .catch(err => {
    console.error('设置失败:', err);
  });

// 关闭推送
oauth.setPushUrl('print_status', 'https://yourdomain.com/callback', 'close')
  .then(res => {
    console.log('推送已关闭:', res);
  });
```

#### 错误处理

```javascript
// 参数验证错误
try {
  await oauth.setPushUrl('', 'https://example.com'); // 抛出错误: cmd can not be empty
} catch (err) {
  console.error(err.message);
}

try {
  await oauth.setPushUrl('print_status', ''); // 抛出错误: url can not be empty
} catch (err) {
  console.error(err.message);
}
```

## 常见用法

### 设置打印状态推送

```javascript
const oauth = new Oauth(rpcClient);

// 设置打印状态推送回调
await oauth.setPushUrl(
  'print_status',
  'https://api.yourdomain.com/webhook/print-status',
  'open'
);
```

### 设置订单完成推送

```javascript
// 设置订单完成推送回调
await oauth.setPushUrl(
  'order_complete',
  'https://api.yourdomain.com/webhook/order-complete',
  'open'
);
```

## 注意事项

1. 推送 URL 必须是可公网访问的 HTTPS 地址
2. 回调接口需要能够正确接收 POST 请求
3. 建议在回调接口中做好幂等处理
4. status 参数默认为 'open',如需关闭推送请显式传入 'close'