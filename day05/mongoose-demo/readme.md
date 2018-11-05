### 1.0.demo1文件说明

利用moogoose建立数据库连接，主要是连接mongo数据库。

实例：

```javascript
var mongoose = require('mongoose');
//连接mongoDB数据库
mongoose.connect('mongodb://localhost/test',{userMongoClient:true});

//创建表模板也就是表的格式，值得注意地是数据库的表名会以小写复数的命名出现
var Cat = mongoose.model('Cat',{name:String});
var kitty = new Cat({name :'zildjian'});

kitty.save(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('meow');
    }
})
```
### 2.0.demo2文件说明

利用mongoose建立多个数据

### 3.0.demo3文件说明

- 数据库schema（模型架构）
- mongoose的增删改查
