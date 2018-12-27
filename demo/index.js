var yly = require("../index");
var config = new yly.Config({
    'cid' : 1037857001,
    'secret' : '7650ce4a2e0b4e5aa65b5e8e9348fb56'
});

var oauthClient = new yly.OauthClinet(config);
oauthClient.getToken().then(function (callback){
    // var atoken = callback.body.access_token;
    var client = new yly.RpcClient('322f62da92e741ada7fa23f5313aaad2', config);
    var print = new yly.Print(client);
    print.index(4004517585,23232,4545);
});



