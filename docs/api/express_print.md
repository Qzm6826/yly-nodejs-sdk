# ExpressPrint - 电子面单打印

## 概述

ExpressPrint 类提供电子面单打印功能,支持多家快递公司的面单打印和取消。

## 初始化

```javascript
const { ExpressPrint, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
config.setUrl('https://open-api.10ss.net/v2');
const rpcClient = new RpcClient(config);
const expressPrint = new ExpressPrint(rpcClient);
```

## API 方法

### 1. index - 打印电子面单

打印电子面单到指定打印机。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| content | string | 是 | - | 面单数据(JSON字符串) |
| originId | string | 是 | - | 商户系统内部订单号,32字符内,只能是数字、大小写字母 |
| sandbox | number | 否 | 0 | 测试环境: 0-关闭, 1-开启 |

#### 面单内容格式

content 参数需要是一个包含快递信息的 JSON 字符串,具体格式根据快递公司而定。

#### 返回值

返回 Promise 对象,resolve 时包含面单打印结果。

#### 基础示例

```javascript
const expressContent = JSON.stringify({
  company: 'SF',  // 快递公司代码: SF-顺丰, YTO-圆通, ZTO-中通等
  sender: {
    name: '张三',
    phone: '13800138000',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    address: 'xxx路xxx号'
  },
  recipient: {
    name: '李四',
    phone: '13900139000',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    address: 'yyy路yyy号'
  },
  cargo: {
    name: '文件',
    weight: 1,
    quantity: 1
  }
});

await expressPrint.index(
  '1234567890',
  expressContent,
  'EXPRESS20251104001',
  0
);
```

---

### 2. cancel - 取消电子面单

取消已打印的电子面单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| content | string | 是 | 取消内容(JSON字符串) |

#### 取消内容格式

```javascript
{
  "order_id": "订单号",
  "express_no": "快递单号"  // 可选
}
```

#### 基础示例

```javascript
const cancelContent = JSON.stringify({
  order_id: 'EXPRESS20251104001',
  express_no: 'SF1234567890'
});

await expressPrint.cancel('1234567890', cancelContent);
```

## 注意事项

1. **快递公司**: 使用前确认快递公司是否在易联云支持列表中
2. **面单格式**: 不同快递公司的面单格式可能不同,请参考易联云官方文档
3. **测试环境**: 生产环境前建议先在测试环境(sandbox=1)测试
4. **地址信息**: 确保收发件人地址信息完整准确
5. **订单号唯一**: originId 必须唯一,建议使用系统订单号
6. **网络要求**: 打印面单需要打印机联网
7. **取消时效**: 面单打印后可能有取消时效限制,具体以快递公司规定为准

## 常见问题

### Q: 如何选择合适的快递公司?

根据配送区域、时效要求和成本选择:
- 同城/省内: 优先顺丰、京东
- 跨省: 中通、圆通、韵达性价比高
- 重要文件: 建议顺丰

### Q: 打印失败如何处理?

1. 检查打印机是否在线
2. 确认快递公司代码是否正确
3. 验证地址信息是否完整
4. 查看错误信息,根据提示修正

### Q: 可以批量打印吗?

可以,但建议:
- 控制打印速度,间隔1秒以上
- 做好错误处理和重试机制
- 记录打印结果

### Q: 如何处理地址不规范的情况?

建议在打印前:
1. 使用地址解析API规范化地址
2. 验证省市区是否匹配
3. 提示用户补全详细地址