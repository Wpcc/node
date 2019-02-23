const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')

function resolve(filename){
  return path.resovle(__dirname,filename)
}

http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname
  fs.readFile(resovle(filename),(err, data) => {
    // 如果没有该文件，读取内容失败
    if(err){
      return res.end('404 NOT FOUND')
    }
    res.end(data)
  })
}).listen(3000,() => {
  console.log('server is running');
})
