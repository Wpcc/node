var express = require('express');
var app = express();
var router = require('./router');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

// 开放静态服务
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use('/node_modules',express.static(path.join(__dirname,'node_modules')));
// 配置art-template
app.engine('html',require('express-art-template'));
//配置body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 配置session插件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(router);

app.listen('3000',function(){
  console.log('app is running');
})
