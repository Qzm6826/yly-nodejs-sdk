//使用前请npm install
var yly = require("../index");
var _ = require('lodash');
var redis = require("redis");
var repeat = require('repeat-string');
// const MRedis = redis.createClient(6379, 'localhost');
console.log("Hello World");
/*var config = new yly.Config({
    'cid' : '',         //应用id
    'secret' : ''       //应用秘钥
});
var oauthClient = new yly.OauthClinet(config);*/

/**
 * 获取调用凭证（仅调用一次后关闭此方法）
 */
/*oauthClient.getToken().then(function (res){
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
    if (_.isEmpty(res.body.machine_code)) {
        tokenData.machineCode = res.body.machine_code;
    }
    var expiresTime = parseInt(new Date().getTime()/1000) + res.body.expires_in - 86400;
    MRedis.set('tokenData', JSON.stringify(tokenData), 'EX', expiresTime);
    MRedis.quit();
});*/

/**
 * 文本打印
 */
/*MRedis.get('tokenData', function(err, reply){
    if(!_.isEmpty(err)) {
        throw new Error('failed:' + err);
    }
    var tokenData = JSON.parse(reply);
    var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    var Print = new yly.Print(RpcClient);
    var machineCode = '';                                     //自有应用请输入机器码
    if (_.isSet(tokenData.machineCode)){
        machineCode = tokenData.machineCode
    }
    var content = "<FS2><center>**#1 美团**</center></FS2>";
    content += repeat('.', 32);
    content += "<FS2><center>--在线支付--</center></FS2>";
    content += "<FS><center>张周兄弟烧烤</center></FS>";
    content += "订单时间:2018-12-27 16:23\n";
    content += "订单编号:40807050607030\n";
    content += repeat('*', 14) + "商品" + repeat("*", 14);
    content += "<table>";
    content += "<tr><td>烤土豆(超级辣)</td><td>x3</td><td>5.96</td></tr>";
    content += "<tr><td>烤豆干(超级辣)</td><td>x2</td><td>3.88</td></tr>";
    content += "<tr><td>烤鸡翅(超级辣)</td><td>x3</td><td>17.96</td></tr>";
    content += "<tr><td>烤排骨(香辣)</td><td>x3</td><td>12.44</td></tr>";
    content += "<tr><td>烤韭菜(超级辣)</td><td>x3</td><td>8.96</td></tr>";
    content += "</table>";
    content += repeat('.', 32);
    content += "<QR>这是二维码内容</QR>";
    content += "小计:￥82\n";
    content += "折扣:￥４ \n";
    content += repeat('*', 32);
    content += "订单总价:￥78 \n";
    content += "<FS2><center>**#1 完**</center></FS2>";
    Print.index(machineCode, 'orderNo23333', content).then(function(res){
        console.log(res);
    });
});*/

/**
 * 图像打印
 */
/*MRedis.get('tokenData', function(err, reply){
    if(!_.isEmpty(err)) {
        throw new Error('failed:' + err);
    }
    var tokenData = JSON.parse(reply);
    var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    var PicturePrint = new yly.PicturePrint(RpcClient);
    var machineCode = '';                     //自有应用请输入机器码
    if (_.isSet(tokenData.machineCode)){
        machineCode = tokenData.machineCode
    }
    var content = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497000905083&di=7c3cffef1dd40edffbd0a37c4eabb277&imgtype=0&src=http://img1.touxiang.cn/uploads/20131114/14-054929_462.jpg';
    PicturePrint.index(machineCode, content, 'orderNo23333').then(function(res){
        console.log(res);
    });
});*/

/**
 * 面单打印
 */
/*MRedis.get('tokenData', function(err, reply){
    if(!_.isEmpty(err)) {
        throw new Error('failed:' + err);
    }
    var tokenData = JSON.parse(reply);
    var RpcClient = new yly.RpcClient(tokenData.accessToken, config);
    var ExpressPrint = new yly.ExpressPrint(RpcClient);
    var machineCode = '';                               //自有应用请输入机器码
    if (_.isSet(tokenData.machineCode)){
        machineCode = tokenData.machineCode
    }
    var Sender = {
        'Company' : '5645645',
        'Name' : 'Taylor',
        'Mobile' : '15018442396',
        'ProvinceName' : '上海',
        'CityName' : '上海',
        'PostCode' : '61000',
        'ExpAreaName' : '青浦区',
        'Address' : '明珠路73号'
    };
    var Receiver = {
        'Company' : '789789',
        'Name' : 'Yann',
        'Mobile' : '15018442396',
        'ProvinceName' : '北京',
        'CityName' : '北京',
        'PostCode' : '61000',
        'ExpAreaName' : '朝阳区',
        'Address' : '三里屯街道雅秀大厦'
    };
    var Commodity = [
        {'GoodsName' : '鞋子'},
        {'GoodsName' : '衣服'}
    ];
    var AddService = [
        {
            'Name' : 'COD',
            'Value' : '1020',
            'CustomerID' : '44564'
        }
    ];
    var content = {
        'OrderCode' : '0126578665784971',
        'ShipperCode' : 'SF',  //SF YZPY  HTKY  YD
        'PayType' : 1,
        'ExpType' : 1,
        'Cost' : 6.0,
        'OtherCost' : 7.0,
        'CustomerName' : '1264546',
        'CustomerPwd' : '4545454',
        'MonthCode' : '',
        'Sender' : Sender,
        'Receiver' : Receiver,
        'Commodity' : Commodity,
        'AddService' : AddService,
        'StartDate' : parseInt(new Date().getTime()/1000) + 7200,
        'Weight' : 1.0,
        'Quantity' : 1,
        'Volume' : 0.0,
        'Remark' : '小心轻放'
    };
    var sandbox = 1;
    ExpressPrint.index(machineCode, content, 'orderNo23333', sandbox).then(function(res){
        console.log(res);
    });
});*/