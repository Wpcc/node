/*
创建http服务器
1.引用http模块
2.调用模块中的createServer方法
3.绑定request事件
4.监听服务器端口号
 */
var http = require('http');

var server = http.createServer();

server.on('request',function(){
  console.log('客户端请求成功');
})

server.listen(3000,function(){
  console.log('服务器启动成功，通过http://127.0.0.1:3000或者http://localhost:3000访问');
})
