var express = require('express');
var fs = require('fs');
var url = require('url');
var Student = require('./student.js');

var router = express.Router();
// 处理客户端请求
router.get('/students',function(req,res){
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
  // 获取id
  var id = parseInt(url.parse(req.url,true).query.id);
  // 读取文件
  fs.readFile('db.json',function(err,data){
    if(err){
      res.status(500).send('服务器错误');
      return false;
    }
    data = data.toString();
    // 根据id查找对应的选项
    var studentsArr = JSON.parse(data).students;
    var student = studentsArr.find(function(item,index){
      return item.id === id;
    })
    res.render('mod.html',{
      "student":student
    })
  })
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
  Student.addStudent(stuObj,function(err){
    if(err){
      return res.render('服务器错误！');
    }
    res.redirect('/students');
  })
})
router.get('/del',function(req,res){
  // 给封装函数一个id，封装函数返回是否删除错误
  var idNum = parseInt(url.parse(req.url,true).query.id);
  Student.delStudent(idNum,function(err){
    if(err){
      return res.render('服务器错误！')
    }
    res.redirect('students');
  })
})
router.post('/modControl',function(req,res){
  req.body.id = parseInt(req.body.id);
  req.body.gender = req.body.gender ==='男' ? 0 : 1;
  var stuObj = req.body;
  console.log(stuObj);
  Student.modStudent(stuObj,function(err){
    if(err){
      res.render('服务器错误！');
    }
    res.redirect('students');
  })
})

// 404处理程序
router.use(function(req,res,next){
  res.status(404).send("404 not find");
})
module.exports = router;
