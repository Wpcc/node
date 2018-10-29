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

 - 如果该方法添加true,类似于这样url.prase(url,true);会将url的查询字符串解析成对象
 - 如果不添加true，则不解析查询字符串。



#### 3.5.重定向

通过服务器让客户端重定向操作：

 - 状态码设置为302的时候为临时重定向（301为永久重定向）---->statusCode
    - 301永久重定向：浏览器会记住跳转，如访问a.com---->b.com。下次访问在浏览器中直接调用b.com
    - 302临时重定向：即无论多少次访问，浏览器都会先访问a.com，从a.com收到重定向信息，然后跳到b.com
 - 在响应头中通过Location告诉客户端往哪儿重定向----->setHeader

当客户端收到服务器的响应状态码是302的时候，就会自动去响应头中找Location，然后对该地址发送新的请求。给客户端发送数据后一定要end()，表明结束。



## 4.模块系统和npm



## 5.express

- express对路由的封装
- express对静态资源文件访问的封装

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

#### 5.2.1.静态服务

其实说白了，就是服务器将url路径对应到文件路径。

```javascript
//1.url路径省略。2.文件路径的相对路径./可以省略
app.use(express.static('public'))

app.use('/public',express.static('public'))

//__dirname为文件执行位置的绝对路径，然后加上public文件夹
app.use('/static',express.static(path.join(__dirname,'public')))
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