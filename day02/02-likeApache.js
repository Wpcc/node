var http = require('http');
var fs = require('fs');

var server = http.createServer();
// 创建www目录
var wwwDir = 'C:/Users/Administrator/Desktop/nodejs/day02/www';
server.on('request',function(req,res){
  // 对请求路径进行处理：从而使其满足本地路径
  var filePath = req.url;
  console.log(filePath);
  console.log(wwwDir + filePath);
  if(filePath === '/'){
    filePath = '/index.html';
  }
  fs.readFile(wwwDir+filePath,function(err,data){
    // 如果没有该文件，也就是读取内容失败
    if(err){
      return res.end('404 NOT FOUND!');
    }
    res.end(data)
  })
})
server.listen(3000,function(){
  console.log('server is running');
})
