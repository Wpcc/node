/*
根据不同的请求发送不同的数据：
  包括img
  文本
  html
  不管什么数据，服务器响应给浏览器的数据只有字符串。
 */
var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request',function(req,res){
  var url = req.url;
  if(url === '/'){
    fs.readFile('./resource/index.html',function(err,data){
      if(err){
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('请求数据不存在！');
      }else{
        res.setHeader('Content-Type','text/html;charset=utf-8');
        res.end(data);
      }
    })
  }
})
server.listen(3000,function(){
  console.log('server is running');
})
