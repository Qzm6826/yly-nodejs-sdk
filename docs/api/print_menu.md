# PrintMenu - 打印机菜单管理

## 概述

PrintMenu 类用于管理打印机的应用菜单。V2接口下已移除！

## 初始化

```javascript
const { PrintMenu, Config, RpcClient } = require('yly-nodejs-sdk');

const config = new Config('your_client_id', 'your_client_secret');
const rpcClient = new RpcClient(config);
const printMenu = new PrintMenu(rpcClient);
```

## API 方法

### addPrintMenu - 添加应用菜单

在打印机屏幕上添加自定义应用菜单。

#### 参数

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| machineCode | string | 是 | 机器码 |
| content | string | 是 | 菜单详情(JSON字符串) |

#### 菜单内容格式

content 参数需要是一个 JSON 字符串,包含以下字段:

```javascript
{
  "name": "菜单名称",           // 必填,显示在打印机屏幕上的菜单名称
  "url": "点击后跳转的URL"      // 必填,用户点击菜单后访问的地址
}
```

#### 返回值

返回 Promise 对象,resolve 时包含添加结果。

#### 基础示例

```javascript
// 添加外卖订单菜单
const menuContent = JSON.stringify({
  name: '外卖订单',
  url: 'http://example.com/orders'
});

await printMenu.addPrintMenu('1234567890', menuContent);
console.log('菜单添加成功');
```

## 菜单设计建议

### 菜单名称

- **长度**: 建议 2-6 个汉字
- **语义**: 清晰明确,易于理解
- **常用**: 订单、统计、库存、设置等

### URL设计

- **可访问**: 确保URL公网可访问
- **移动端**: 页面需要适配移动端显示
- **鉴权**: 建议在URL中携带商户标识,做好权限控制
- **HTTPS**: 推荐使用HTTPS协议

## 注意事项

1. **机型支持**: 确认打印机型号支持菜单功能(通常为带屏幕的机型)
2. **菜单数量**: 建议不超过6个菜单项,避免界面拥挤
3. **页面适配**: 跳转的页面需要适配打印机屏幕尺寸
4. **内容格式**: content 参数必须是有效的 JSON 字符串
5. **URL编码**: 如果URL包含特殊字符,需要进行URL编码
6. **网络要求**: 打印机需要联网才能访问菜单页
