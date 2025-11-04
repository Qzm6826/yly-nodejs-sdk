# Printer - 打印机管理

## 概述

Printer 类提供完整的打印机管理功能,包括设备授权、配置管理、订单管理等。

## 初始化

```javascript
const { Printer, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
config.setUrl('https://open-api.10ss.net/v2');
const rpcClient = new RpcClient(config);
const printer = new Printer(rpcClient);
```

## API 方法

### 1. addPrinter - 添加打印机

自有型应用授权终端。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| msign | string | 是 | - | 机器密钥 |
| nickName | string | 否 | '' | 打印机昵称 |
| phone | string | 否 | '' | GPRS卡号 |

#### 示例

```javascript
// 添加打印机
await printer.addPrinter('1234567890', 'abcd1234', '前台打印机', '13800138000');

// 只传必填参数
await printer.addPrinter('1234567890', 'abcd1234');
```

---

### 2. deletePrinter - 删除打印机

删除终端授权接口。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
await printer.deletePrinter('1234567890');
```

---

### 3. setVoice - 设置内置语音

设置内置语音接口,仅支持 K4-WA、K4-GAD、K4-WGEAD 型号。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| content | string | 是 | - | 在线语音地址链接或自定义语音内容(JSON) |
| aid | string/number | 否 | '' | 语音编号 0~9,不传默认升序 |
| isFile | boolean | 是 | false | 是否为文件链接 |

#### 示例

```javascript
// 设置在线语音文件
await printer.setVoice(
  '1234567890',
  'http://example.com/voice.mp3',
  1,
  true
);

// 设置自定义语音内容
const voiceContent = JSON.stringify({
  text: '新订单到了,请及时处理'
});
await printer.setVoice('1234567890', voiceContent, 2, false);
```

---

### 4. deleteVoice - 删除内置语音

删除内置语音接口,仅支持 K4-WA、K4-GAD、K4-WGEAD 型号。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| aid | number | 是 | 语音编号 0~9 |

#### 示例

```javascript
await printer.deleteVoice('1234567890', 1);
```

---

### 5. shutdownRestart - 关机重启

打印机关机或重启接口。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| type | string | 是 | 操作类型: 'restart' 或 'shutdown' |

#### 示例

```javascript
// 重启打印机
await printer.shutdownRestart('1234567890', 'restart');

// 关机
await printer.shutdownRestart('1234567890', 'shutdown');
```

---

### 6. setsound - 声音调节

调节打印机蜂鸣器或喇叭音量。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| voice | number | 是 | 音量 0~3 |
| type | string | 是 | 类型: 'buzzer'(蜂鸣器) 或 'horn'(喇叭) |

#### 示例

```javascript
// 设置蜂鸣器音量为2
await printer.setsound('1234567890', 2, 'buzzer');

// 设置喇叭音量为3
await printer.setsound('1234567890', 3, 'horn');

// 静音
await printer.setsound('1234567890', 0, 'horn');
```

---

### 7. getPrintInfo - 获取打印宽度

获取机型打印宽度信息。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
const info = await printer.getPrintInfo('1234567890');
console.log('打印宽度:', info);
```

---

### 8. getVersion - 获取软硬件版本

获取机型软硬件版本信息。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
const version = await printer.getVersion('1234567890');
console.log('版本信息:', version);
```

---

### 9. cancelAll - 取消所有未打印订单

取消所有未打印订单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
await printer.cancelAll('1234567890');
console.log('所有未打印订单已取消');
```

---

### 10. cancelOne - 取消单条未打印订单

取消指定的未打印订单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| orderNo | number | 是 | 易联云订单ID |

#### 示例

```javascript
await printer.cancelOne('1234567890', 123456789);
```

---

### 11. setIcon - 设置Logo

设置打印机 Logo。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| logoUrl | string | 是 | Logo链接地址 |

#### 示例

```javascript
await printer.setIcon('1234567890', 'http://example.com/logo.png');
```

---

### 12. deleteIcon - 取消Logo

取消打印机 Logo。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
await printer.deleteIcon('1234567890');
```

---

### 13. btnPrint - 按键打印设置

设置是否允许按键打印。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| type | string | 是 | 'btnopen'(开启) 或 'btnclose'(关闭) |

#### 示例

```javascript
// 开启按键打印
await printer.btnPrint('1234567890', 'btnopen');

// 关闭按键打印
await printer.btnPrint('1234567890', 'btnclose');
```

---

### 14. getOrder - 接单拒单设置

设置打印机接单或拒单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| type | string | 是 | 'open'(接单) 或 'close'(拒单) |

#### 示例

```javascript
// 开启接单
await printer.getOrder('1234567890', 'open');

// 拒绝接单
await printer.getOrder('1234567890', 'close');
```

---

### 15. getOrderStatus - 获取订单状态

获取指定订单的打印状态。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| orderNo | number | 是 | 易联云订单ID |

#### 示例

```javascript
const status = await printer.getOrderStatus('1234567890', 123456789);
console.log('订单状态:', status);
```

---

### 16. getOrderPagingList - 获取订单列表

分页获取订单列表。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| pageIndex | number | 否 | 1 | 页码,最大100 |
| pageSize | number | 否 | 10 | 每页条数,最大100 |

#### 示例

```javascript
// 获取第1页,每页10条
const orders = await printer.getOrderPagingList('1234567890', 1, 10);

// 获取第2页,每页20条
const orders2 = await printer.getOrderPagingList('1234567890', 2, 20);

// 使用默认参数
const ordersDefault = await printer.getOrderPagingList('1234567890');
```

---

### 17. reprint - 订单重打

重新打印指定订单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| orderNo | number | 是 | 易联云订单ID |

#### 示例

```javascript
await printer.reprint('1234567890', 123456789);
```

---

### 18. getPrintStatus - 获取打印机状态

获取打印机当前状态。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |

#### 示例

```javascript
const status = await printer.getPrintStatus('1234567890');
console.log('打印机状态:', status);
// 可能返回: 在线/离线/缺纸等状态
```

---

### 19. pushSwitch - K8推送开关设置

K8 型号推送开关设置。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| status | string | 是 | - | 状态 |
| mode | number | 否 | 1 | 模式 |

#### 示例

```javascript
await printer.pushSwitch('1234567890', 'open', 1);
```

---

### 20. setKeyWords - K8关键词设置

K8 型号关键词设置接口。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| keys | string | 是 | 关键词 |
| type | string | 是 | 类型 |
| content | string | 是 | 内容 |

#### 示例

```javascript
await printer.setKeyWords('1234567890', 'order', 'text', '新订单提醒');
```

---

### 21. setting - K8高级设置

K8 型号高级设置接口。

#### 参数

| 参数名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| machineCode | string | 是 | - | 机器码 |
| usbPrintMode | number | 否 | null | USB打印模式 |
| usbInputMode | number | 否 | null | USB输入模式 |
| cameraDecodeTxMode | number | 否 | null | 摄像头解码传输模式 |

#### 示例

```javascript
// 设置所有参数
await printer.setting('1234567890', 1, 2, 0);

// 只设置部分参数
await printer.setting('1234567890', 1);
```

## 注意事项

1. **机型限制**: setVoice 和 deleteVoice 仅支持 K4-WA、K4-GAD、K4-WGEAD 型号
2. **参数类型**: orderNo 必须是数字类型,不能是字符串
3. **音量范围**: setsound 的 voice 参数必须在 0~3 范围内
4. **页码限制**: getOrderPagingList 的 pageIndex 和 pageSize 最大值为 100