var express = require('express');
var fs = require('fs');
var student = require('./student.js');

var router = express.Router();
// 处理客户端请求
router.get('/',function(req,res){
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
// 展示修改页面
router.get('/mod',function(req,res){
  res.render('mod.html');
})
// 展示添加页面
router.get('/add',function(req,res){
  // 读取文件
  fs.readFile('db.json',function(err,data){
    if(err){
      res.status(500).send('服务器错误');
      return false;
    }
    data = data.toString();
  // 渲染内容
    res.render('add.html',{
      "students":JSON.parse(data).students
    })
  })
})
// 增删改
router.post('/addControl',function(req,res){
// 添加一个对象，返回是否添加成功/添加成功后的数据
  req.body.id = parseInt(req.body.id);
  req.body.gender = req.body.gender ==='男' ? 0 : 1;
  var stuObj = req.body;
  console.log(stuObj);
  student.addStudent(stuObj,function(err,data){

  })
})
router.post('/del',function(req,res){

})
router.post('/modControl',function(req,res){

})

// 404处理程序
router.use(function(req,res,next){
  res.status(404).send("404 not find");
})
module.exports = router;
