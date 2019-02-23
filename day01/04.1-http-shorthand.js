/*
创建http服务器
1.引用http模块
2.调用模块中的createServer方法
3.绑定request事件
4.监听服务器端口号
 */
const http = require('http')
http.createServer((req, res) => {
  res.setHeader('Content-Type','text/plain,charset=utf-8')
  res.end('hell world')
}).listen(3000,function(){
  console.log('server is running')
})
