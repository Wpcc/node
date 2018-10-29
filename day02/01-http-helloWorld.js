var http = require('http');
var server = http.createServer();
server.on('request',function(req,res){
  if(req.url === '/'){
    res.setHeader('Content-Type','text/plain;charset=utf-8');
    res.end('hello world!');
  }else{
      res.setHeader('Content-Type','text/plain;charset=utf-8');
      res.end('404 not found!');
  }
})
server.listen(3000,function(){
  console.log('server is running');
})
