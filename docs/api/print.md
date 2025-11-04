# Print - 文本打印

## 概述

Print 类提供文本内容打印功能,支持易联云打印指令格式。

## 初始化

```javascript
const { Print, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
config.setUrl('https://open-api.10ss.net/v2');
const rpcClient = new RpcClient(config);
const print = new Print(rpcClient);
```

## API 方法

### index - 打印文本内容

打印文本内容到指定打印机。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| originId | string | 是 | - | 商户系统内部订单号,32字符内,只能是数字、大小写字母 |
| content | string | 是 | - | 打印内容 |
| idempotence | number | 否 | 0 | 幂等标识: 0-关闭, 1-开启(2小时内相同origin_id返回上次结果) |

#### 返回值

返回 Promise 对象,resolve 时包含易联云订单ID等信息。

#### 基础示例

```javascript
// 简单文本打印
await print.index(
  '1234567890',
  'ORDER20251104001',
  '测试打印内容'
);
```

#### 格式化打印示例

```javascript
// 使用易联云打印指令格式化内容
const content = `
<center>易联云订单</center>
<center>********************************</center>
订单号: #12345
时间: 2025-11-04 10:30:00
--------------------------------
商品名称       数量    价格
--------------------------------
美式咖啡        1      25.00
提拉米苏        1      30.00
--------------------------------
<right>总计: 55.00 元</right>
<center>谢谢惠顾!</center>
<QR>https://www.yilianyun.net</QR>
`;

await print.index('1234567890', 'ORDER20251104001', content);
```

#### 幂等处理示例

```javascript
// 开启幂等处理,防止重复打印
await print.index(
  '1234567890',
  'ORDER20251104002',
  '订单内容',
  1  // 开启幂等
);

// 2小时内再次调用相同 originId,会返回上次的结果而不会重复打印
await print.index(
  '1234567890',
  'ORDER20251104002',  // 相同的订单号
  '订单内容',
  1
);
```

## 注意事项

1. **订单号规则**: originId 必须是32字符内的数字和字母组合,建议使用时间戳+随机数
2. **幂等处理**: 开启幂等后,2小时内相同 originId 不会重复打印
3. **内容长度**: 打印内容不宜过长,建议单次打印内容控制在合理范围内
4. **字符编码**: 确保打印内容使用 UTF-8 编码,避免乱码
5. **指令格式**: 严格按照易联云指令格式编写,错误的指令可能导致打印异常