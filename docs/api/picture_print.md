# PicturePrint - 图片打印

## 概述

PicturePrint 类提供图片打印功能,支持通过网络图片URL进行打印。

**注意**: 不支持机型 k4-wh, k4-wa, m1

## 初始化

```javascript
const { PicturePrint, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
config.setUrl('https://open-api.10ss.net/v2');
const rpcClient = new RpcClient(config);
const picturePrint = new PicturePrint(rpcClient);
```

## API 方法

### index - 打印图片

打印网络图片到指定打印机。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| pictureUrl | string | 是 | - | 图片链接地址 |
| originId | string | 是 | - | 商户系统内部订单号,32字符内,只能是数字、大小写字母 |
| idempotence | number | 否 | 0 | 幂等标识: 0-关闭, 1-开启(2小时内相同origin_id返回上次结果) |

#### 返回值

返回 Promise 对象,resolve 时包含易联云订单ID等信息。

#### 基础示例

```javascript
// 打印二维码图片
await picturePrint.index(
  '1234567890',
  'http://example.com/qrcode.png',
  'PIC20251104001'
);
```

#### 幂等处理示例

```javascript
// 开启幂等处理,防止重复打印
await picturePrint.index(
  '1234567890',
  'http://example.com/poster.jpg',
  'PIC20251104002',
  1  // 开启幂等
);
```

## 注意事项

1. **机型限制**: 不支持 k4-wh, k4-wa, m1 机型,使用前请确认打印机型号
2. **图片可访问性**: 图片URL必须是公网可访问的地址,局域网地址无法使用
3. **图片大小**: 建议单张图片不超过 2MB,过大可能导致打印失败
4. **图片尺寸**: 宽度建议与打印机纸张宽度匹配(58mm约384px, 80mm约576px)
5. **图片格式**: 推荐使用 JPG 格式
6. **打印速度**: 图片打印速度较文本慢,批量打印时注意控制间隔
7. **幂等处理**: 开启幂等后,2小时内相同 originId 不会重复打印
8. **URL编码**: 如果URL包含特殊字符,需要进行URL编码
9. **HTTPS优先**: 建议使用 HTTPS 协议的图片地址,更安全可靠