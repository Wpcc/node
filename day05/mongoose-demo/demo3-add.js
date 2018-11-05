var mongoose = require('mongoose');
// 1.连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});

// 2.建立数据结构
var Schema = mongoose.Schema;
var mySchema = new Schema({
  name:{
    type:String,
    required: true  //必须有
  },
  password:{
    type:String,
    required:true
  },
  email:{
    type:String
  }
})

/*
3.将数据结构发布成模型
第一个参数：
  传入一个大写名词单数字符串用来表示集合名称
  mongoose 会自动将大写名词的字符串生成小写复数的集合名称
第二个参数：
  架构Schema
返回值：模型构造函数
 */
var User = mongoose.model('User',mySchema);

/**
 * 4.当有了模型构造函数之后，就可以使用该函数进行创建数据了
 */
// 增
for(var i = 0; i < 5; i++){
  var admin = new User({
    name : 'zs' + i,
    password : '123456',
    email : 'admin@admin.com'
  })
  admin.save(function(err,ret){
    if(err){
      console.log('保存失败');
    }
    else{
      console.log('保存成功');
    }
  })
}
