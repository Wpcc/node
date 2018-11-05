const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

// 构造数据模型，通俗而言就是规范数据的格式  ===>表格式，数据库的存储命名是以小写的复数形式进行命名
const Cat = mongoose.model('Cat',{name:String});

// 实例化数据表格
for(var i=0;i<4;i++){
  const kitty = new Cat({name:'Zildjian'+ i});
  kitty.save().then(() => console.log('meow'));
}
