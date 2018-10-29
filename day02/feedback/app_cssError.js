var http = require('http');
var fs = require('fs');
var template = require('art-template');//引入atr-template模块引擎

var contents = [
  {
    name:'张一',
    message:'今天天气不错！',
    time:'2017-10-25'
  },
  {
    name:'张二',
    message:'今天天气不错！',
    time:'2017-10-25'
  },
  {
    name:'张三',
    message:'今天天气不错！',
    time:'2017-10-25'
  },
];

http.createServer(function(req,res){
  // 处理客户端请求
  var pathname = req.url;
  if(pathname === '/'){
    // 读取index页面并响应
    fs.readFile('./views/index.html',function(err,data){
      if(err){
        error(res);
      }
      data = data.toString();
      console.log(data);
      var html = template.render(data,{contents:contents});
      res.end(html);
    })
  }
  // 2.处理public下的所有静态资源:也就是url是以/public/开头的
  else if(pathname.indexOf('/public/') === 0){
    fs.readFile('.' + pathname,function(err,data){
      if(err){
        error(res);
      }
      res.end(data);
    })
  }
  else if(pathname === '/post'){
    // 读取post.html页面并响应
    fs.readFile('./views/post.html',function(err,data){
      if(err){
        error(res);
      }
      res.end(data);
    })
  }
  //访问的地址并没做处理
  else{
    error(res);
  }
}).listen(3000,function(){
  console.log('server is running');
});
// 访问错误处理
var error = function(res){
  fs.readFile('./views/404.html',function(err,data){
    if(err){
      return res.end('404 not found!');
    }
    res.end(data);
  })
}
