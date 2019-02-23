var express = require('express');
var bodyParser = require('body-parser');


var app = express();
app.engine('html', require('express-art-template'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
/*
1.读取文件原生的，
2.数据库原生定义在app.js中
3.模板渲染-template.js

渲染页面正常显示
 */
// 模拟数据库
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

app.get('/', function (req, res) {
     res.render('index.html', {
        contents:contents
     });
 });
app.get('/post', function (req, res) {
 res.render('post.html');
});
// 公开静态资源
app.use('/public/',express.static('./public'));

// 处理表单程序
app.post('/post', function (req, res) {
  req.body.time = '2017-10-10';
  contents.unshift(req.body);
  console.log(contents);
  res.redirect('/');
});

// 404页面设置
app.use(function(req,res){
  res.status(404).render('404.html');
})
app.listen(3000,()=>console.log('example app listening on port 3000!'));
