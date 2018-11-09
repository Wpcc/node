var mongoose = require('mongoose');

// 1.连接数据库
mongoose.connect('mongodb://localhost/test',{useNewUrlParser:true});

//2.建立数据结构
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  nickname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    default:'public/img/avatar-max-img.png'
  },
  bio:{
    type:String,
    default:''
  },
  gender:{
    type:Number,
    // -1:secret;0:male;1:female
    enum:[-1,0,1],
    default:-1
  },
  birthday:{
    type:Date
  },
  status:{
    type:Number,
    /*
    0 没有权限限制
    1 不可以评论
    2 不可以登录
     */
  },
  created_time:{
    type:Date,
    default:Date.now
  },
  last_modified_time:{
    type:Date,
    default:Date.now
  }
})
// users这个表格使用的规范（格式）就是userSchema这种风格
module.exports = mongoose.model('User',userSchema);
