/*
重定向：
*/
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  if(req.url === '/a'){
    res.statusCode = '302'
    res.setHeader('Location','/b')
    res.end()
  }
  else if(req.url === '/b'){
    fs.readFile('./redirect/b.html',(err, data) => {
      if(err){
        return console.log(err);
      }
      res.end(data)
    })
  }
}).listen(3000,() => {
  console.log('server is running');
})
