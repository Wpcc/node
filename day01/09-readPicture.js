const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  res.setHeader('Content-Type','text/plain;charset=utf-8')

  //读取图片
  fs.readFile('./data/lufei.jpg',(err, data) => {
    if(err){
      console.log(err);
    }else{
      res.end(data)
    }
  })
}).listen(3000,()=>{
  console.log('server is running');
})
