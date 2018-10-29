var http = require('http');
var fs = require('fs');
// 引入第三方包
var template = require('art-template');

var server = http.createServer();
var wwwDir = 'C:/Users/Administrator/Desktop/nodejs/day02/www';

server.on('request',function(req,res){
  var url = req.url;//客户端输入/showListByTemplate
  if(url === '/showListByTemplate'){
    // 读取www目录下文件
      fs.readdir(wwwDir,function(err,files){
        if(err){
          res.end('no files!');
          return false;
        }
        // 将读取的文件名渲染到模板当中
        fs.readFile('./04-template.html',function(err,data){
          if(err){
            res.end('404 not found!');
            return false;
          }
          // 将二进制html文件转换成字符串
          data = data.toString();
          //值得注意的是artTemplate需要传入一个对象
          var html = template.render(data,{files:files});
          res.end(html);
        })
      })
  }
})
server.listen(3000,function(){
  console.log('server is running');
})
