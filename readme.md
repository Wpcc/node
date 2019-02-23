## 开始学习

如果要执行一个 node 文件，通过命令行 `node <文件路径>`


### 一个基本的服务器

由于node.js并没有提供DOM和BOM，故node无法解析DOM。在node中创建一个基本的服务器一般需要依赖两个模块，一个是`http`模块另一个是`fs`模块。

- http

  - 引入http模块

  - 通过模块中的createServer方法创建服务器，然后添加请求事件处理客户端http请求。

  - 之后通过listen来监听端口号

- 读写文件
  - 需要引入fs（filesystem）模块
  - 读文件调用模块中的readFile方法，该方法包含`（path,function(err,data){}）`
  - 读取的数据会以二进制的方式呈现，需要转成字符串，也就是调用`toString()`函数
  - 写文件调用writeFile方法，该方法包含`（path，data，function(err){}）`

一个基本的服务器代码：

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

简写：

```javascript
const http = require('http')
http.createServer((req, res) => {
    res.writeHeader('Content-Type':'text/plain')
    res.write('hello world')
    res.end()
}).listen(3000,function(){
    console.log('server is running')
})
```



### linux中node的安装

由于windows下node的安装太过简单，故不做过多介绍，以下主要介绍linux操作系统下node的安装：

```shell
wget https://nodejs.org/dist/v10.9.0/node-v10.9.0-linux-x64.tar.xz    // 下载
tar xf  node-v10.9.0-linux-x64.tar.xz       // 解压
cd node-v10.9.0-linux-x64/                  // 进入解压目录
./bin/node -v                               // 执行node命令 查看版本
v10.9.0
```

解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接（感觉node的软连接没什么用）：

```shell
ln -s node-v10.9.0-linux-x64/bin/npm   /usr/local/bin/ 
ln -s node-v10.9.0-linux-x64/bin/node   /usr/local/bin/
```

配置node环境变量：

主要是在/etc/profile文件中添加以下环境变量配置，这是由于在linux中只能通过`./bin/node -v`执行指令，而不同进入到bin中通过`node -v`执行。

```shell
##set for nodejs
export NODE_HOME=<node文件夹>
export PATH=$NODE_HOME/bin:$PATH
```

[菜鸟教程案例](http://www.runoob.com/nodejs/nodejs-install-setup.html)，有部分错误。



## 模块

node 也就是运行在服务器中的 javascript 代码，相对于浏览器中的 javascript ，它剔除了其中的 DOM、BOM 操作，增加了模块这一概念划分，对不同功能的代码进行封装。

模块就是文件的意思，node 中存在三种不同的模块划分：

- 核心模块

- 第三方模块

- 用户自定义模块

  - **在引用自定义模块时，需要明确地使用相对地址，即加 ./；如果省略会被编辑器当成**

    **核心模块**

  - 可以省略路径名

```javascript
// 核心模块:通常以二进制的形式存储在node代码内部
const http = require('http')
// 第三方模块：通常用 npm 包安装在 node_modules 目录下的模块
const express = require('express')
// 自定义模块：用户自己定义的文件，当然需要用 commonjs 规范进行模块定义
const userModule = require('./userModule')
```

### 模块化

通过require方法可以加载执行模块，相当于js文件的引用，**不同于浏览器html页面**用script引用，**node引用的模块存在模块作用域**，即在a.js定义的变量或方法通过require引用b.js，但b.js文件并无法使用a.js定义的变量。

故require方法会有一个返回值，该值是加载执行文件中定义的exports对象，在引用文件中通过exports对象便对外提供了接口。

```javascript
//a.js
var b = require('./b.js');
console.log(b.name); //输入 b

//b.js
var name = b;
exports.name = name;

```
#### 什么是模块化

模块化一般具有两种特性：

 - 文件作用域
 - 通信规则
    - 加载（require）
    - 导出（exports）

说白了就是彼此文件可以相互引用，彼此的作用域又不产生影响。

### 加载

语法:

```javascript
var 自定义变量名称 = require('模块')；
```

两个作用：

 - 执行被加载模块中的代码
 - 得到被加载模块中的exports（模块导出对象）



#### 导出

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
module.exports = 123;

//modules.exports只能导出一个函数、对象或字符串
module.exports = 'hello';

```

简而言之：一种是导出exports对象，另一种是将exports替换进行导出。

```javascript
//假设引入的文件是a.js 而导出的文件是b.js，那么第一种方法
var b = require('./b.js');
console.log(b);  //输出的是exports对象

//假设引入的文件是b.js，而导出的文件是b.js,那么第二种方法
var b = require('./b.js');
console.log(b); //输出hello

```





#### exports解析

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



#### require.js加载规则

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
  - node中的核心模块被编译成二进制文件存储在运行文件中，故加载核心模块仅仅只需要引入模块名即可。
- 加载第三方模块
  - 第三方模块的加载不是通过路径，这点和加载我们自己定义的模块不同，任何第三方模块的名字和核心模块都不一样。
  - 第三方模块加载，会找到目录中的node-modules文件，如果没有会找上一级目录下的node-modules，直到根文件为止。
  - 在找到node-modules文件后，会进入到指定文件当中（如：art-template），在该指定目录中，通过main定位到引用文件，如果main错误，或者main中定义的文件不错在，会自动调用当前文件中的index.js文件，否则报错。

### 端口号和ip（补充）

所有联网的程序都需要进行网络通信，由于计算机**只有一个物理网卡**，而且同一个局域网中，网卡的地址必须是唯一的。

网卡是通过唯一的ip地址来进行定位的。

**简而言之：**

 - ip地址是用来定位计算机（服务器）的
 - 端口号是用来定位具体的应用程序（所有需要联网通信的软件都必须具有端口号）

## npm

npm 其实就是 node 中内置的一个包安装软件，各种关于 js 的插件放在 npm 平台上进行统一管理，这样通过 npm 就能安装各种插件而省去了寻找官方网站进行下载的麻烦。

### npm5.0之前版本

- package.json
  - 包描述文件，描述着node-modules中的包文件。这是因为我们下载的包文件（如art-template）本身有很多依赖文件，光看node-modules文件夹很难分清安装了那些文件，通过package.json便一目了然。
  - package.json充当着包文件说明书的作用（按照package.json下载的文件，在大版本固定会自动升级最新版本，如8.2.1------>8为大版本）。

```shell
npm install 包名
#文件不会出现在package.json当中

npm install 包名 --save
#文件才会出现在package.json当中
```



### npm5.0之后版本

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

- npm install 包名
  - 在5.0之前的版本只下载包名，不存储进package.json
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

### npm安装额外命令

```shell
# 安装模块到项目目录下
npm install moduleName

#安装特定版本
npm install moduleName@版本号

# -g 将模块安装到全局
npm install -g moduleName

# -save 的意思：安装模块的同时，在package文件的dependencies节点写入依赖
npm install --save moduleName

#--save-dev:安装模块的同时，在package文件的devDependecies节点写入依赖
npm install --save-dev moduleName

#npm的全局仓库路径前缀配置在prefix，查看prefix配置即可。
npm config get prefix
```

说明：

- 在5.0版本之后，--save 和没有 --save之间已经没有区别，所有npm安装的包都会安装在package文件中

### npm被墙问题

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




## node服务器

### 乱码

以一个基本的服务器为例，如果发送给客户端的是中文字符，会出现乱码：

```javascript
const http = require('http')
http.createServer((res, req) => {
    req.end('你好呀！世界')
}).listen(3000,() =>{
    console.log('server is running')
})
// 访问 127.0.0.1:30000 出现乱码
```



这是由于 node 服务器端默认发送的编码是utf-8，由于服务器并没有设置发送内容的编码，浏览器会根据操作系统的默认编码去执行解析，中文操作系统的默认编码为国标码---gbk，从而产生乱码。

```javascript
// 只需要在响应的时候给头部设置一个字符集编码
res.setHeader('Content-type','text/plain;charset=utf-8');
```



### url模块

在任何服务器中，都需要对客户端传送过来的url进行解析，从而以确定客服端的需求。node作为服务器运行的js语言同样也有相同的功能，通过引入url模块，并使用模块中提供的方法，就能轻松达到目的。

**需要注意地是原生 node 中 `req.url`只能获取到文件路径之后的字符串参数**

```javascript
const http = rquire('http')
const url = rquire('url')

http.createServer((req, res) => {
    console.log(req.url)
    res.end('hello world')
}).listen(3000,() => {
    console.log('server is running')
})
// 如果访问地址是 127.0.0.1 那么 req.url 打印的是 /
```

如果解析一个完整 url 路径，那么有如下打印：

```javascript
var url = require('url')
url.parse('http://www.baidu.com/baike?name=zhangsan&age=27')

/*
Url {
  protocol: 'http',
  slashes: true,
  auth: null,
  host: 'www.baidu.com',
  port: null,
  hostname:'www.baidu.com,
  hash: null,
  search: '?name=zhangsan&age=27',
  query: 'name=zhangsan&age=27',
  pathname: '/baike',
  path: '/baike?name=wpc&age=27',
  href: 'www.baidu.com/baike?name=zhangsan&age=27' }
*/
```

在这里主要介绍 url 中的 parse，该方法会将url字符串解析成一个数组。

 - 如果该方法添加 true,类似于这样 url.parse(url,true) ，会将 url 的查询字符串解析成对象

 - 如果不添加true，则不解析查询字符串。


### 一个完整的服务器

能给访问的客户端发点什么的服务器程序。

```javascript
// ES6语法
const http = require('http')
http.createServer((req, res) => {
    res.setHeader('Content-Type','text/plain;charset=utf-8')
    res.end('你好啊，世界！')
}).listen(3000,() => {
    console.log('server is running')
})
```

能读取文件并发送给客服端的服务器程序。

```javascript
const http = require('http')
const url = require('url')
const fs = require('fs')
http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname
    if(pathname === '/'){
        fs.readFile('./index.html',(err, data){
        	req.end(data)  //end本身对二进制数据做了一个字符串转码            
        })
    }
})
```



### 重定向

通过服务器让客户端重定向操作：

 - 状态码设置为302的时候为临时重定向（301为永久重定向）---->statusCode
    - 301永久重定向：浏览器会记住跳转，如访问a.com---->b.com。下次访问在浏览器中直接调用b.com
    - 302临时重定向：即无论多少次访问，浏览器都会先访问a.com，从a.com收到重定向信息，然后跳到b.com
 - 在响应头中通过Location告诉客户端往哪儿重定向----->setHeader

当客户端收到服务器的响应状态码是302的时候，就会自动去响应头中找Location，然后对该地址发送新的请求。给客户端发送数据后一定要end()，表明结束。

```javascript
const http = rquire('http')
const fs = require('fs')
http.createServer((req, res) =>{
    let url = req.url
    if(url === '/a'){
        res.statusCode = 302
        res.setHeader('Location','/b')
        res.end()
    }
    if(url === '/b'){
        fs.readFile('./b.html',(err, data){
        	res.end(data)            
        })
    }
})
```

### 请求其它服务器资源

node作为服务器的同时也能够作为客户端去请求其它服务器上的资源。

```javascript
const http = require('http')

http.get('http://www.imooc.com/u/card', function (res) {
    let data = ''
    res.on('data', function (chunk) {
        data += chunk;
    })
    res.on('end', function () {
        let result = JSON.parse(data)
        console.log('result:' + result.msg)
    })
})
/*
可以看出node作为客服端去请求资源，对资源有一种流的特性处理。
*/
```

[详细内容](https://nodejs.org/dist/latest-v10.x/docs/api/http.html#http_http_get_options_callback)



## 服务端渲染

#### 渲染逻辑

 - 服务器读取数据

 - 服务器读取模板

    - 字符串替换：使用string.replace(string,string)方法。

    - 模板引擎的使用，如art-template模板引擎：使用方法和浏览器中的使用方法类似


#### 前后端分离

 - 简单理解页面的生成（模板与数据结合）是发生在服务器还是浏览器。如果是在浏览器则表现为前后端分离，如果是在服务器则不是。
 - 前后端分离的优点
    - 减少服务器压力
    - 宏观角度来讲实现数据和视图的分离
- 前后端分离的缺点
  - 最大的缺点便是SEO问题 也就是搜索引擎优化
- 案例：
  - 比如电商网站的商品显示（淘宝、京东等）**一般为服务器渲染，而评论则为浏览器渲染**。我们通过右键查看网页源代码：如果为服务器渲染能够看到明确的html内容，如果是浏览器渲染则查看不到，原因在于浏览器渲染最开始得到的源代码只是一个大体框架并没有具体内容。

具体访问[前后端分离](https://www.zhihu.com/search?type=content&q=%E5%89%8D%E5%90%8E%E7%AB%AF%E5%88%86%E7%A6%BB)



#### 静态资源处理

在服务器中，通常用public目录来存放用户能够访问到的资源。用views来存放发送给用户的html展示页面。

 - public目录
    - 当浏览器拿到一个html页面开始解析执行，该页面通常会包含大量的静态资源链接，包括link中的href和script中的src以及img的src等。这些请求会发送给服务器，为了统一处理便可以建立一个目录用来存放所有的静态资源包括第三方包，目录用lib（library）。
- views目录
  - 通常用来存放显示给用户的html页面。
- 路径
  - /如果出现在html页面中则代表着根路径，即会自动的加载服务器ip和端口号，如127.0.0.1:3000
  - ./一般出现在服务器后台处理页面，相对路径，用来寻找后台资源文件




### path文件系统

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

```javascript
//需要注意地是path.join方法的路径拼接不允许前面使用/
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// throws 'TypeError: Path must be a string. Received {}'
```

- path.resolve
  - 功能和join类似，不同点在于语法的细微差别

```javascript
path.resolve('/foo/bar', './baz');
// Returns: '/foo/bar/baz'

path.resolve('/foo/bar', '/tmp/file/'); //会直接返回根路径目录
// Returns: '/tmp/file'
```



- path.isAbsolute
  - 判断该路径是否为绝对路径

### Node中的非模块成员

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



## express

###  一个简单的服务器

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

### 自动重启服务器

使用第三方命令行工具：`nodemon`来帮我们解决频繁修改代码重启服务器问题。

- `nodemon`是一个基于Node.js开发的一个第三方命令行工具，我们使用的时候需要独立安装：

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

### 路由

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

#### 静态服务

其实说白了，就是服务器将 url 路径对应到文件路径。通过文件路径服务器会做一个读取操作并把读取的内容发送给客户端。

```javascript
//1.文件路径的相对路径./可以省略
app.use('/public',express.static('public'))

//2.url路径也可以省略
app.use(express.static('public'))

//3.同时有些情况下需要用到绝对路径，__dirname为文件执行位置的绝对路径，然后加上public文件夹
app.use('/static',express.static(path.join(__dirname,'public')))
```

#### 路由模块的提取

目的：将app.js中的专门处理路由的代码封装成模块。

问题：分离出来代码对原模块对象的依赖。

- **通过回调函数解决依赖**

```javascript
//app.js
var express = require('express');
var app = express();

/*
	提取出去的路由代码，该代码是建立在app上的方法，故需要引用app对象
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



### 跨域

主要以CORS解决，而CORS又分为两种情况，简单请求（simple request）和非简单请求（not-so-simple request）。

- 简单请求，浏览器会自动在请求头部信息增加一个Origin字段。故只需在服务器端增加如下设置即可：

```js
// 原生node
const http = require('http')
http.createServer((req, res) => {
    if(req.url == '/'){
        // 设置 * 或 跨域服务器地址
        req.setHeader('Access-Control-Allow-Origin','*')
    }
})
```



- 非简单请求，会在正式通信之前，增加一次HTTP查询请求，称为“预检”请求（preflight），方式为OPTION，浏览器会自动生成Origin和Access-Control-Allow-Method。

```javascript
// 原生node
const http = require('http')
http.createServer((req, res) => {
    if(req.url == '/'){
        // 设置 * 或 跨域服务器地址
        req.setHeader('Access-Control-Allow-Origin','*')
        req.setHeader('Access-Control-Allow-Methods','POST,GET')
    }
})
```

#### express

由于express对原生node进行了一定的封装，故在路由处理函数中添加的CORS头部是无法起到效果的。必须通过中间件的方式才能添加到response的head中。

- 不使用中间件插件

```javascript
const express = require('express')
const app = express()

app.use('*',function(req, res ,next){ // 可以配置不一样的url
    res.header({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'POST,GET'
    })
    next()
})
```

- 使用cors中间件

[官方文档](http://www.expressjs.com.cn/en/resources/middleware/cors.html)



### express中的art-template模板引擎

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

### art-template继承

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

### 重定向

原生：

```javascript
res.statusCode = 302;
res.setHeader('Location','/');
```

express：

```javascript
res.redirect('/');
```

### 获取post数据

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

### express-genarator

通过应用生成器工具 express-generator 可以快速地创建一个应用的骨架。

安装：

```javascript
npm install express-generator -g
```

创建：

```shell
#	-v 代表指定使用的模板引擎 <engine>支持的有（ejs|hbs|jade|pub|twig|vash） 
#	默认是很蛋疼的 jade 模板引擎
#	即，使用命令行 express myapp
#	ejs模板引擎的语法和art-template比较类似

express --view=ejs myapp  
```

运行：

```shell
# 如果在 npm 中配置，即："start":"node ./bin/www"
npm start
# 否则可直接通过 node 命令进行启动
node ./bin.www
# 请务必注意文件目录
```

更加详细步骤可通过[官方网站](http://www.expressjs.com.cn/starter/generator.html)进行查看

当安装后，通过`express --version`查看版本号从而判断是否安装，之所以特别说明是因为express生成器中的`-v`指令代表添模板引擎。



## 安装mongoDB



下载地址：https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-4.0.3-signed.msi/download

注意事项：

- 安装最后一步取消图形化界面界面安装（该步骤会耗费大量时间），取消 install MongoDB compass

- 当下载完mongoDB后，需要在磁盘文件根目录下创建data/db文件目录，否则mongoDB无法启动。
- 配置全局mongoDB全局变量，使其在任意目录下可运行
- 通过命令行`mongod --version`查看版本号确认安装成功

**通过npm安装：**

全局安装：

需要注意地是npm安装的mongodb只是nodejs程序和mongodb进行通讯的插件。

```shell
npm install mongodb -g

//查看安装目录
npm config get prefix
```



### 启动关系数据库

mongod为启动数据库命令，而mongo则为连接数据库的命令行窗口。

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

### 连接和退出数据库

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

### 基本命令

在使用mongoDB数据库默认处在的位置是在test中（如果数据库中没有数据，通过`show dbs`是无法查看的，但通过`db`可以查看当前操作的数据库）。

- show dbs
  - 查看显示所有数据库
  - 如果数据库没有数据，默认不显示该数据库
- db
  - 查看当前操作的数据库
- use 数据库名
  - 切换到指定的数据（如果没有则会新建该数据库）
- 创建表

```shell
db.students.insertOne({"name":"jack"})
```

- show collections
  - 显示所有表

```shell
db.students.find()
# 显示表中数据
```

数据导入：

需要注意地是导入的时候必须退出mongo命令行，否则会报错，关于文件路径只需要将文件拖入到命令行窗口即可。

```shell
mongoimport -d <数据库名> -c <表名> --file <文件路径>
```





### 在node中操作mongoDB

#### 使用官方的mongodb包来操作

https://www.npmjs.com/package/mongodb

#### 使用第三方包

官方文档：https://m

ongoosejs.com/

第三方包`mongoose`基于mongoDB官方的`mongodb`做的封装：

```javascript
var mongoose = require('mongoose');
//连接mongoDB数据库：需要注意地是5.3版本中需要加参数来说明使用新的url解析器，否则会报警告
mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });

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

#### mongoDB基本概念

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

#### mongoose的增删改查

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

### promise

该内容查看javascript中的promise章节。



## 服务端开发

### MD5加密

MD5通常用于用户密码等隐私安全加密，我们一般可以理解MD5只能用于正向加密而无法反向解密。

javascript用法： https://github.com/blueimp/JavaScript-MD5



### cookie

**cookie是为了解决http协议为无状态而出现的一种方式**。换言之，客户端与服务端基于http通信的过程就如同两个一岁儿童进行对话一般，他们并不知道对方上一句说的是什么，就好比《夏洛特烦恼》中老大爷和夏洛的对话一般，夏洛说：“我找马冬梅”，老大爷：“马什么梅？”。夏洛：“马冬梅”。“冬什么梅？”。夏洛：“马东梅啊！”。“哦！马什么梅？”。

cookie参数的说明：

- Name和Value
  - cookie中的内容是以键值对的形式出现
- Domain
  - cookie对于哪个域名是有效的。所有向该域发送的请求中都会包含这个cookie信息。
- Path
  - 对于指定域中的按个路径，应该向服务器发送cookie。（相对于Domain做进一步限制）
- Expires、Max-Age
  - cookie在浏览器中存储的过期时间。默认情况为会话结束。也可以自己设置，不过该时间日期为GMT格式：Wdy，DD-Mon-YYYY HH:MM:SS GMT 。
  - 两者的区别在于，前者是一个具体的值，如`Expires:new Data(Data.now()+60)`,而后者是以现在时间为值向后推迟的值，如`Max-Age:1000*60`，60秒过后失效。
- HTTP==httpOnly
  - 设置后服务器通过javascript无法更改session的值
- Secure
  - 当设置安全标志的时候，意味着cookie只能通过https协议才会发送。

需要注意地是 http 协议中的 cookie 有两种形式，一种是请求报文 header 里面的 Cookie，还有一种是响应报文 header 中的 Set-Cookie，以下便是响应报文Set-Cookie实例：

```http
HTTP/1.1 200 OK
Content-type:text/html
Set-Cookie:name=value;expire=Mon,22-Jan-07 07:10:24 GMT;domain = .wrox.com
```

该头部信息指定了一个叫name的cookie，它会在格林威治时间2007年1月22日7:10:24失效，同时对于www.wrox.com和wrox.com的任何子域（如p2p.wrox.com）都有效。

```http
HTTP/1.1 200 OK
Content-type:text/html
Set-Cookie:name=value; domain=.wrox.com; path=/; secure 
```

secure标志是cookie唯一一个非名值对儿的部分，直接包含一个secure单词。

这里，创建了一个对于所有wrox.com的子域和域名下（由path参数指定的）所有页面都有效的cookie。因为设置了secure标志，这个cookie只能通过SSL连接才能传输（https）。

域、路径、失效时间、secure标志都是服务器给浏览器的指示，以指定何时应该发送cookie。这些参数并不会作为发送到服务器的cookie信息的一部分，只有名值对儿才会被发送。

在node原生中，可以通过`setHeader`来设置cookie的值，也可以通过`req.headers.cookie`来获取cookie的值。

比如：

```javascript
// 设置cookie的值，原生情况
res.setHeader('Set-Cookie','name=value; domain=.wrox.com; path=/; secure')
```

```javascript
// 获取cookie的值
res.cookies = req.headers.cookie()
```

当然在真实项目中往往不这么做，原生cookie的获取和设置由于涉及到字符串显得异常麻烦，通常需要封装成对象以简化cookie的操作，具体实现可查看node/day06/cookie-theory.js

#### express中的cookie

在express中，如果仅仅需要对cookie进行设置的话，那么express本身就对cookie的设置进行过封装，通过给`res.cookie`传递参数对象的方法进行设置，其实内部会进行符合规范的字符串拼接。

具体使用：

```javascript
res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
```

但是对于获取cookie的值，express并没有提供原生的api，需要通过中间件让express具有处理请求cookie的功能，该插件为 cookie-parser。

具体使用：

```shell
# 安装
npm i cookie-parser
```

Example：

```javascript
var express      = require('express')
var cookieParser = require('cookie-parser')
 
var app = express()
app.use(cookieParser())
 
app.get('/', function(req, res) {
  console.log('Cookies: ', req.cookies)
})
 
app.listen(8080)
```

具体使用查看[官方文档](https://www.npmjs.com/package/cookie-parser)



#### JavaScript中的cookie

获取cookie：

- `document.cookie`

设置cookie：

- `document.cookie = 'name=wpc;'`
- 全部格式：
  - `name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure`

删除cookie：

- `document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT";`
- 当删除的时候不必指定cookie的值
- 删除 cookie 非常简单。您只需要设置 expires 参数为以前的时间即可

当设置cookie参数HTTP==httpOnly的时候，客服端的js是无法修改cookie的值。

#### session

cookie中的name和value一般都是服务器发送给客户端。由于js可以操作cookie从而达到伪造的效果，故一般重要信息都不会直接传给浏览器（客户端）。

node中session插件：express-session , [官方文档](https://www.npmjs.com/package/express-session)

具体使用配置如下：

但需要了解的是，该插件默认配置

```javascript
var express = require('express')
var session = require('express-session')
 
var app = express()
 
app.use(session({
  secret: 'keyboard cat', // 该值可更改，意味着在原本字符串的基础上增加该字符串再编译，增加安全性
  resave: false,
  saveUninitialized: true //如果设置true，意味着没有数据依旧会生成cookie id发送给前端
}))

// 使用：比如可以通过mongoose拿到后台数据，然后将后台数据赋值给session，在赋值的同时，会生成一个对应的cookie，该cookie会直接生成在根目录下
app.use('/', function(req, res){
    req.session.user = user
})
```



session的原理：

- 主要是将重要的内容保存在服务器，将数据的映射通过cookie发送给浏览器（客户端）。

```javascript
// 就比如用户名
var user = {
    nickname : wpc,
    age:17,
   	cardId:888888,
    password:123456
};
//这样通过映射：就解决了内容泄露给浏览器的安全问题了
var session = {
    1:user
}
```

