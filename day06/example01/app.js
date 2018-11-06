var express = require('express');
var app = express();

app.engine('html',require('express-art-template'));
// 将模板引擎的默认目录views改成examples01目录
app.set('views',__dirname);
app.get('/index',function(req,res){
  res.render('index.html');
})

app.listen('3000',function(){
  console.log('app is running');
})
