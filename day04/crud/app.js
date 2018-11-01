var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser')

var app = express();
// 开放静态资源
app.use('/public',express.static('./public'));
app.use('/node_modules',express.static('./node_modules'));
// 运用art-template模板
app.engine('html',require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(router);

app.listen(3000,function(){
  console.log('app is running');
})
