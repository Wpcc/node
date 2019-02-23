/*
  更加全面的服务器：
    包括路由处理
*/
const http = require('http');
const url = require('url');

http.createServer(function(request,response){
  response.setHeader('Content-Type','text/plain;charset=utf-8')
  const pathname = url.parse(request.url).pathname

  switch(pathname){
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
      response.write('404');
  }
  response.end();
}).listen(3000,function(){
    console.log("服务器已启动成功！");
})
