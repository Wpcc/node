var express = require('express');
var router = express.Router();
var User = require('./models/user');
var md5 = require('blueimp-md5')


router.get('/',function(req,res){
  console.log(req.session);
  console.log(req.session.user);
  res.render('index.html',{user:req.session.user});
})
router.get('/register',function(req,res){
  res.render('register.html');
})
router.post('/register',function(req,res){
  /**
   * 1.获取表单数据
   * 2.操作数据库
   * 3.返回页面
   */
   var body = req.body;
   // 判断数据库是否有该用户名或email
   User.findOne({
     email:body.email
   },function(err,data){
     if(err){
       return res.status(500).json({
         success:false,
         message:'服务器错误'
       })
     }
     if(data){
       return res.status(200).json({
         success:false,
         message:"email已存在"
       })
     }
     // 对用户密码进行加密
     body.password = md5(md5(body.password));
     // 将客户端提交的数据保存到服务器
     new User(body).save(function(err,ret){
       if(err){
         return res.status(500).json({
           success:false,
           message:'服务器错误'
         })
       }
       /*
        1.将数据保存在数据的同时将数据保存在session中
        2.当数据保存在session中的时候，该插件会自动生成一个id，并通过cookie发送给客户端
        */
       req.session.user = ret;
       res.status(200).json({
         success:true,
         message:'注册成功'
       });
     })
   })
   // User.findOne({
   //   nickname:body.nickname
   // }),function(err,data){
   //   if(err){
   //     return res.status(500).json({
   //       success:false,
   //       message:'服务器错误'
   //     })
   //   }
   //   return res.status(200).json({
   //     success:false,
   //     message:"nickname已存在"
   //   })
   // }

})
router.get('/login',function(req,res){
  res.render('login.html');
})
router.post('/login',function(req,res){
  /**
   * 1.获取表单数据
   * 2.操作数据库
   * 3.返回页面
   */
  var body = req.body;
  User.findOne({
    email:body.email,
    password:md5(md5(body.password))
  },function(err,result){
    if(err){
      return res.status(500).json({
        success:false,
        message:'服务器错误'
      })
    }
    if(!result){
      return res.status(200).json({
        success:false,
        message:'邮箱或密码错误'
      })
    }
    // 用户存在，设置session的值
    req.session.user = result;

    res.status(200).json({
      success:true,
      message:'登录成功'
    })
  })

})


module.exports = router;
