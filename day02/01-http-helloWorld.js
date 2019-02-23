/*
以下代码存在bug：
  原因在于并未对req.url解析，以致于当输出查询字符串比如login?name=zhangsan时
*/
const http = require('http')
http.createServer((req, res) => {
  res.setHeader('Content-Type','text/plain;charset=utf-8')

  if(req.url === '/'){
    res.end('hello node')
  }else{
    res.end('404 NOT FOUND')
  }
}).listen(3000,() => {
  console.log('server is running')
})
