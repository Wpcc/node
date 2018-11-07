## 1.开始学习



- 执行文件，命令行node 文件路径

- 由于node.js并没有提供DOM和BOM，故node无法解析DOM

- 读写文件
  - 需要引入fs（filesystem）模块
  - 读文件调用模块中的readFile方法，该方法包含`（path,function(err,data){}）`
  - 读取的数据会以二进制的方式呈现，需要转成字符串toString（）
  - 写文件调用writeFile方法，该方法包含`（path，data，function(err){}）`

- http

  - 需要引入http模块

  - 通过模块中的createServer方法创建服务器，并通过listen监听端口号

  - 在这之前添加请求事件来处理客户端http请求，从而返回相应数据

  - 代码如下：

  ```js
  var http = require('http');
  var server = http.createServer();
  server.on('request',function(req,res){
      //req.url--->能够获取到请求的路径
      //res.end()---->添加响应内容，并结束发送给客户端。该方法接受两种数据格式：二进制、字符串
  })
  server.listen('3000',function(){
      console.log('服务器已经启动！')
  }) //启动服务器并监听端口。
  ```



## 2.node中的js

- ECMAScript

  - 没有DOM、BOM

- 核心模块

- 第三方模块

- 用户自定义模块

  - **在引用自定义模块时，需要明确地使用相对地址，即加./；如果省略会被编辑器当成**

    **核心模块**

  - 可以省略路径名


#### 2.1.核心模块

Node为js提供了很多服务器级别的API，这些API绝大多数都被包装到一个具名的核心模块中。

例如文件操作的`fs`核心模块，http服务构建的`http`模块，`path`路径操作、`os`操作系统信

息模块……



#### 2.2.模块化

通过require方法可以加载执行模块，相当于js文件彼此之间相互引用，**不同于浏览器html页面**用script引用，node引用的模块存在模块作用域**，即在a.js定义的变量或方法通过require引用b.js，但b.js文件并无法使用a.js定义的变量。

故require方法会有一个返回值，该值是加载执行文件中定义的exports对象，在引用文件中通过exports对象便对外提供了接口。

```javascript
//a.js
var b = require('./b.js');
console.log(b.name); //输入 b

//b.js
var name = b;
exports.name = name;

```



#### 2.3.端口号和ip（补充）

所有联网的程序都需要进行网络通信，由于计算机**只有一个物理网卡**，而且同一个局域网中，网卡的地址必须是唯一的。

网卡是通过唯一的ip地址来进行定位的。

**简而言之：**

 - ip地址是用来定位计算机（服务器）的

 - 端口号是用来定位具体的应用程序（所有需要联网通信的软件都必须具有端口号）



#### 2.4.乱码

node服务器端默认发送的编码是utf-8，由于服务器并没有设置发送内容的编码，浏览器会根据操作系统的默认编码去执行解析，中文操作系统的默认编码为国标码---gbk，从而产生乱码。

```
response.setHeader('Content-type','text/plain;charset=utf-8');
```



## 3.服务端渲染

#### 3.1.渲染逻辑

 - 服务器读取数据

 - 服务器读取模板

    - 字符串替换：使用string.replace(string,string)方法。

    - 模板引擎的使用，如art-template模板引擎：使用方法和浏览器中的使用方法类似


#### 3.2.前后端分离

 - 简单理解页面的生成（模板与数据结合）是发生在服务器还是浏览器。如果是在浏览器则表现为前后端分离，如果是在服务器则不是。
 - 前后端分离的优点
    - 减少服务器压力
    - 宏观角度来讲实现数据和视图的分离
- 前后端分离的缺点
  - 最大的缺点便是SEO问题 也就是搜索引擎优化
- 案例：
  - 比如电商网站的商品显示（淘宝、京东等）**一般为服务器渲染，而评论则为浏览器渲染**。我们通过右键查看网页源代码：如果为服务器渲染能够看到明确的html内容，如果是浏览器渲染则查看不到，原因在于浏览器渲染最开始得到的源代码只是一个大体框架并没有具体内容。

具体访问[前后端分离](https://www.zhihu.com/search?type=content&q=%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB)



#### 3.3.静态资源处理

在服务器中，通常用public目录来存放用户能够访问到的资源。用views来存放发送给用户的html展示页面。

 - public目录
    - 当浏览器拿到一个html页面开始解析执行，该页面通常会包含大量的静态资源链接，包括link中的href和script中的src以及img的src等。这些请求会发送给服务器，为了统一处理便可以建立一个目录用来存放所有的静态资源包括第三方包，目录用lib（library）。
- views目录
  - 通常用来存放显示给用户的html页面。
- 路径
  - /如果出现在html页面中则代表着根路径，即会自动的加载服务器ip和端口号，如127.0.0.1:3000
  - ./一般出现在服务器后台处理页面，相对路径，用来寻找后台资源文件



#### 3.4.url解析

主要是node提供的url模块中的parse方法，该方法会将url字符串解析成一个数组。

 - 如果该方法添加true,类似于这样url.parse(url,true);会将url的查询字符串解析成对象
 - 如果不添加true，则不解析查询字符串。



#### 3.5.重定向

通过服务器让客户端重定向操作：

 - 状态码设置为302的时候为临时重定向（301为永久重定向）---->statusCode
    - 301永久重定向：浏览器会记住跳转，如访问a.com---->b.com。下次访问在浏览器中直接调用b.com
    - 302临时重定向：即无论多少次访问，浏览器都会先访问a.com，从a.com收到重定向信息，然后跳到b.com
 - 在响应头中通过Location告诉客户端往哪儿重定向----->setHeader

当客户端收到服务器的响应状态码是302的时候，就会自动去响应头中找Location，然后对该地址发送新的请求。给客户端发送数据后一定要end()，表明结束。



## 4.模块系统和npm

使用Node编写应用程序主要是在使用：

 - ECMAScript语言
    - 和浏览器不一样在与Node中没有DOM、BOM
- 核心模块
  - 文件操作的fs
  - http服务的http
  - url路径操作模块
  - path路径处理模块
- 第三方模块
  - art-template
- 自定义模块
  - 自己编写的模块（文件）



#### 4.1.什么是模块化

模块化一般具有两种特性：

 - 文件作用域
 - 通信规则
    - 加载（require）
    - 导出（exports）

说白了就是彼此文件可以相互引用，彼此的作用域又不产生影响。



#### 4.1.1.加载

语法:

```javas
var 自定义变量名称 = require('模块')；
```

两个作用：

 - 执行被加载模块中的代码
 - 得到被加载模块中的exports（模块导出对象）



#### 4.1.2.导出

- node中有模块作用域，默认文件中的所有成员只在当前文件模块有效

- 对于希望可以被其它模块访问的成员，往往需要将其挂载到exports对象上。


exports挂载：

```javas
exports.a = 123;
exports.b = 'hello';
exports.c = function(){
    console.log('hello world');
}
```

exports替换：

```javascript
modules.exports = 123;

//modules.exports只能导出一个函数、对象或字符串
modules.exports = 'hello';

```

简而言之：一种是导出exports对象，另一种是将exports替换进行导出。



#### 4.1.3.原理解析

为什么替换exports对象是module.exports = XX 而不是 exports = XX ？

准确来讲exports是module.exports的一个引用（感觉在js中引用便是指针的意思，这和C++的引用不是一个类型）。

在模块中其实隐藏封装了如下代码：

```js
var module = {
    var exports = {};
}
/*
	module.exports.a = 123;(点操作符太麻烦)
	为了方便给导出对象添加属性、方法做了一个赋值操作
*/
var exports = module.exports;
return module.exports;
```

故：

​	如果我们对exports变量赋值，实际上只是改变exports的内容或指向，并没有改变最后返回的module.exports的指向。



#### 4.1.4.require.js加载规则

模块种类：

- 核心模块
  - 模块名
- 第三方模块
  - 模块名
- 用户自己写的模块
  - 模块名

规则：

- 优先加载缓存，并且不重复加载：
  - 比如，有main.js/a.js/b.js三个文件，a.js引入了b.js，mian.js引入了a.js和b.js，在引入a.js的时候，main已经引入了b，故再次引入并不去加载b中的内容。

```javascript
//main.js
require('./a');
require('./b');

//a.js
require('./b');
console.log('this is a.js');

//b.js
console.log('this is b.js');

/*
	执行main.js，仅仅只打印一次b.js，这是因为为了模块加载效率考虑，require并不重复的引用包。但是引用会得到模块导出的内容：即赋给module.exports的值。
*/
```

- 加载核心模块
  - node中的核心模块被编译成二进制了文件存储在运行文件中，故加载核心模块仅仅只需要引入模块名即可。
- 加载第三方模块
  - 第三方模块的加载不是通过路径，这点和加载我们自己定义的模块不同，任何第三方模块的名字和核心模块都不一样。
  - 第三方模块加载，会找到目录中的node-modules文件，如果没有会找上一级目录下的node-modules，直到根文件为止。
  - 在找到node-modules文件后，会进入到指定文件当中（如：art-template），在该指定目录中，通过main定位到引用文件，如果main错误，或者main中定义的文件不错在，会自动调用当前文件中的index.js文件，否则报错。



#### 4.1.5.npm

##### ---npm5.0之前版本

- package.json
  - 包描述文件，描述着node-modules中的包文件。这是因为我们下载的包文件（如art-template）本身有很多依赖文件，光看node-modules文件夹很难分清安装了那些文件，通过package.json便一目了然。
  - package.json充当着包文件说明书的作用（按照package.json下载的文件，在大版本固定会自动升级最新版本，如8.2.1------>8为大版本）。

```shell
npm install 包名
#文件不会出现在package.json当中

npm install 包名 --save
#文件才会出现在package.json当中
```



##### ---npm5.0之后版本

在package.json的基础上又补充了package-lock.json文件：

- package-lock.json
  - 补充package.json无法固定版本的缺陷出现。
  - 加快了npm install 的速度，因为 package-lock.json 文件中已经记录了整个 node_modules 文件夹的树状结构，甚至连模块的下载地址都记录了，再重新安装的时候只需要直接下载文件即可
  - 安装之后锁定包的版本，手动更改package.json文件安装将不会更新包，想要更新只能使用 npm install xxx@1.0.0 --save 这种方式来进行版本更新package-lock.json 文件才可以

故在安装包文件的时候，最好调用初始化命令，从而自动生成package.json和package-lock.json文件。

```shell
npm install
//文件会自动出现在package.json和package-lock.json当中

npm init
//建议的命令行操作
```

常用命令：

 - npm init
    - npm init -y 可以跳过向导，快速生成

- npm install
  - 安装dependencies选项中的依赖项

- npm install 报名
  - 在5.0之前的版本只下载包名，不存储进package.josn
  - 简写：npm i 包名

- npm install --save 包名
  - 在5.0之前的版本，下载并且保存依赖项（package.json）
  - 简写：npm install -S

- npm uninstall 包名
  - 在5.0版本之前只删除，如果有依赖项会依然保存
  - 在5.0版本之后，会删除依赖项
  - 简写：npm un 包名

- npm uninstall --save 包名
  - 在5.0版本之前删除的同时会删除依赖信息
  - 简写：npm un -S 包名

- npm --help
  - 查看使用帮助
  - npm 特定命令 --help：查看特定命令的使用帮助



#### 4.1.6.npm被墙问题

http://npm.taobao.org/淘宝的开发团队把npm在国内做了一个备份。

安装淘宝的cnpm：

```javascript
npm intall --global cnpm
```

如果不想安装cnpm又想使用淘宝的服务器来下载：

``` shell
npm install jquery --registry=https://registry.npm.taobao.org
```

但是每一次手动这样加参数很麻烦，所以我们可以把这个选项加入到配置文件中：

```shell
npm config set registry https://registry.npm.taobao.org

#检验是否配置成功
npm config list
```

只要经过上面命令的配置，则以后所有的`npm install`都会默认通过淘宝的服务器来下载。

#### 4.1.7.path文件系统

参考文档：http://nodejs.cn/api/path.html

- path.basename
  - 获取一个路径的文件名（默认包含扩展名）
- path.dirname
  - 获取一个路径中的目录部分
- path.extname
  - 获取一个路径中的扩展名
- path.parse
  - 将路径解析成对象
- path.join
  - 将两个路径拼接在一起
  - 需要说明地是：windows操作系统路径分隔符为反斜杠，而linux和mac操作系统为斜杠。
- path.isAbsolute
  - 判断该路径是否为绝对路径

#### 4.1.8.Node中的非模块成员

在每个模块中，除了require、exports等模块相关API之外，还有两个特殊的成员：

- `__dirname` 可以用来获取当前文件模块所属目录的绝对路径
- `__filename` 可以用来获取当前文件的绝对路径

应用场景：

在Node中，文件中的相对路径是相对于执行文件，而不是相对于文件。

如以下代码目录：

- example
  - example.txt
  - file.js
- file1.js

如果在file写入example的相对路径，但是在file1中引入file，那么当执行file1的时候，是无法找到example文件，故此时需要用到example的绝对路径，也就是上面的两个变量。



## 5.express

- express对路由的封装
- express对静态资源文件访问的封装
- [官网](http://www.expressjs.com.cn/)

```javascript
//实例
var express = require('express');
var app = express();

app.get('/',function(req,res){
    res.send('hellow world');
})
app.use('/public',express.static('./public'));
app.listen(3000,function(){
    console.log('example app listening on port 3000');
})
```

#### 5.1.自动重启服务器

使用第三方命令行工具：`nodemon`来帮我们解决频繁修改代码重启服务器问题。

- `nodeman`是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候需要独立安装：

```shell
npm install --global nodemon
```

安装完毕之后，使用：

```shell
node app.js

# 使用 nodemon
nodemon app.js
```

只要通过`nodemon app.js`启动的服务，则它会监视你的文件变化，当文件发生变化的时候，自动帮你重启服务器。



#### 5.2.路由

路由其实就是一张表，映射着路径与处理的关系。准确来讲，就是给不同路径绑定不同的处理程序。

get：

```javascript
//当你以GET方法请求/的时候，执行对应的处理函数
app.get('/',function(req,res){
    res.send('Hello World!')
})
```

post：

```javascript
//当你以POST方法请求/的时候，执行对应的处理函数
app.post('/',function(req,res){
    res.send('Got a Post request')
})
```

##### 5.2.1.静态服务

其实说白了，就是服务器将url路径对应到文件路径。

```javascript
//1.url路径省略。2.文件路径的相对路径./可以省略
app.use(express.static('public'))

app.use('/public',express.static('public'))

//__dirname为文件执行位置的绝对路径，然后加上public文件夹
app.use('/static',express.static(path.join(__dirname,'public')))
```

##### 5.2.2.路由模块的提取

目的：将app.js中的专门处理路由的代码封装成模块。

问题：分离出来代码对原模块对象的依赖。

- **通过回调函数解决依赖**

```javascript
//app.js
var express = require('express');
var app = express();

/*
	提取出去的路由代码，该模块中的app对该模块有依赖
	app.get('/',function(err,data){})
*/
var router = require('./router');
router(app);
```

```javascript
//router.js
//通过回调函数，解决依赖问题
var router = function(app){
    app.get('/',function(err,data){});
}
exports = router;
```

- 通过express中提供的api解决依赖
  - **API的主要方法就是生成一个对象，将所有对象导出。**

```javascript
//app.js
var express = require('express');
var app = express();

/*
	提取出去的路由代码，该模块中的app对该模块有依赖
	app.get('/',function(err,data){})
*/
var router = require('./router');
app.use(router);
```

```javascript
//router.js
//通过express中的API解决：本质是通过对象
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){});

module.exports = router;
```



#### 5.3.express中的art-template模板引擎

安装：

```shell
npm install --save art-template
npm install --save express-art-template

# express-art-template是将art-template整合到express中，当然express-art-template本身也依赖于 art-template
```



初步使用：

```javascript
var express = require('express');
var app = express();
//art为模板引擎的后缀名，也可定义为html
app.engine('art', require('express-art-template'));
//设置项，可以设置模板所在目录，不设置默认为views：app.set('views','./');
app.set('views', {
    debug: process.env.NODE_ENV !== 'production'
});

app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});

```

#### 5.3.1.art-template继承

- art-template拼接：将公用部分的内容引入到展示的页面当中。

```html
<!-- index.js -->
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

```javascript
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>My Site</title>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <!--block中的内容为默认内容，如果继承页面没有填写内容，即填写默认内容-->
    <% block('head',function(){%> hello world <%})%> 
</body>
</html>
```



- art-template继承：定义一个模板，该模板自定义的部分用block包裹起来。

```html
<% include('./header.art') %>
```



#### 5.4.重定向

原生：

```javascript
res.statusCode = 302;
res.setHeader('Location','/');
```

express：

```javascript
res.redirect('/');
```

#### 5.5.获取post数据

在express中没有获取post请求体内容的api，需要借助第三方插件，即中间件（middleware）body-parser。

安装：

```shell
npm install body-parser
```

使用：

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//body-parser 将内容解析到req中的body当中，即通过req.body可以获取浏览器post发送的内容
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
```

## 6.安装mongoDB



下载地址：https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.3-signed.msi/download

注意事项：

- 当下载完mongoDB后，需要在磁盘文件根目录下创建data/db文件目录，否则mongoDB无法启动。
- 配置全局mongoDB全局变量，使其在任意目录下可运行
- 通过命令行`mongod --version`查看版本号确认安装成功

### 6.1.启动关系数据库

启动：

```shell
# mongondb 默认使用执行 mongod 命令所处盘符根目录下的 /data/db 作为自己的数据存储目录
# 所有在第一次执行该命令之前需要新建一个 /data/db
mongod
```

如果要修改默认的数据存储目录，则需要：

```shell
mongod --dbpath=数据存储目录路径
```

停止：

```shell
ctrl+c
```

### 6.2.连接和退出数据库

连接：

```shell
# 在通过mongod启动服务器程序下，另开一个命令窗口输入：
mongo
```

退出：

```shell
# 在连接状态下输入exit退出连接
exit
```

### 6.3.基本命令

在使用mongoDB数据库默认处在的位置是在test中（如果数据库中没有数据，通过`show dbs`是无法查看的，但通过`db`可以查看当前操作的数据库）。

- show dbs
  - 查看显示所有数据库
  - 如果数据库没有数据，默认不显示该数据库
- db
  - 查看当前操作的数据库
- use 数据库名
  - 切换到指定的数据（如果没有则会新建该数据库
- 创建表

```shell
db.students.insertOne({"name":"jack"})
```

- 查看表

```shell
db.students.find()
# 或在数据库中
show collecitons
```

### 6.4.在node中操作mongoDB

#### 6.4.1.使用官方的mongodb包来操作

https://www.npmjs.com/package/mongodb

#### 6.4.2.使用第三方包

官方文档：https://mongoosejs.com/

第三方包`mongoose`基于mongoDB官方的`mongodb`做的封装：

```javascript
var mongoose = require('mongoose');
//连接mongoDB数据库
mongoose.connect('mongodb://localhost/test',{userMongoClient:true});

mongoose.Promise = global.Promise;

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

#### 6.4.3.mongoDB基本概念

mongoDB中的数据库相当于mysql中的数据库，集合相当于表，文档就是表记录。

- 数据库---->对象
- 集合---->数组
- 文档---->对象

例如：

```javascript
{
    qq:{
        users:[
            {},
            {},
            {}
        ]
        producits:[
            {},
            {}
        ]
    },
        weixin:{
            
        }
}
```

#### 6.4.4.mongoose的增删改查

具体文档：https://mongoosejs.com/docs/queries.html

增删改查的四个方法都是建立在model上，所有在这之前必须建立到数据库模型这一步。

```javascript
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
```



增：

```javascript
var admin = new User({
  username: 'zs',
  password: '123456',
  email: 'admin@admin.com'
})

admin.save(function (err, ret) {
  if (err) {
    console.log('保存失败')
  } else {
    console.log('保存成功')
    console.log(ret)
  }
})
```

查：

find(conditions,projection,skip,callback) find的四个参数分别是条件，显示的项目，跳过的数据，回调函数。

```javascript
//查询所有
User.find(function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
//查询姓名是张三的所有数据
User.find({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
//查询姓名为张三的第一个数据
User.findOne({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('查询失败')
  } else {
    console.log(ret)
  }
})
```

删：

```javascript
User.deleteMany({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功')
    console.log(ret)
  }
})
User.deleteOne({
  username: 'zs'
}, function (err, ret) {
  if (err) {
    console.log('删除失败')
  } else {
    console.log('删除成功')
    console.log(ret)
  }
})
```

改：

感觉mongoose函数封装的有问题，很多api无法更新没存在的数据。即该数据必须原本就存在于数据库当中。

```javascript
//updateOne中选择的项和修改的项必须一致
User.updataOne({password:'123456'}, {
  password: '123'
}, function (err, ret) {
  if (err) {
    console.log('更新失败')
  } else {
    console.log('更新成功')
  }
})
```

## 7.0.服务端开发

### 7.1.MD5加密

MD5通常用于用户密码等隐私安全加密，我们一般可以理解MD5只能用于正向加密而无法反向解密。

javascript用法： https://github.com/blueimp/JavaScript-MD5





