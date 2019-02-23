/*
让服务器能够自动响应并返回对应路径页面:
  并不完善。
  在现实使用中，如输入login往往会自动查找login/index.html
  输入index也会对应index.html
*/
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

function resolve(dirname, filename = ''){
  return path.resolve(__dirname, dirname, filename)
}

http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  // 读取www目录下的文件
  fs.readFile(resolve('./www', `./${pathname}`),(err, data) => { //resolve拼接不允许出现第二个绝对路径
    // 如果没有该文件，读取内容失败
    if(err){
      return res.end('404 NOT FOUND')
    }
    res.end(data)
  })
}).listen(3000,() => {
  console.log('server is running');
})
