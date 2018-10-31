var express = require('express');
var fs = require('fs');

var app = express();
// 开放静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
// 运用art-template模板
app.engine('html',require('express-art-template'));

// 处理客户端请求
app.get('/',function(req,res){
  // 读取文件
  fs.readFile('db.json',function(err,data){
    if(err){
      res.status(500).send('服务器错误');
      return false;
    }
    data = data.toString();
  // 渲染内容
    res.render('index.html',{
      "students":JSON.parse(data).students
    })
  })
})

app.listen(3000,function(){
  console.log('app is running');
})
