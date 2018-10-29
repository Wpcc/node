// 给客户端传数据
var http = require('http');
var server = http.createServer();
server.on('request',function(request,response){
  response.setHeader('Content-Type','text/plain;charset=utf-8')
  switch(request.url){
    case '/':
      response.write('index');
      break;
    case '/login':
      response.write('登录');
      break;
    case '/register':
      response.write('注册');
      break;
      default:
      response.write('index');
  }
  response.end();
  response.end();
})
server.listen('3000',function(){
    console.log("服务器已启动成功！");
})
