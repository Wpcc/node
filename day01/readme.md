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

