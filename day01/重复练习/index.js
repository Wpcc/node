const http = require('http')
const url = require('url')
const fs = require('fs')

http.createServer((req, res) =>{
  res.setHeader('Content-Type','text/plain;charset=utf-8')
  const pathname = url.parse(pathname.url).pathname

  while(pathname){
    case '/':
      res.write('home')
      break
    case '/home':
      res.write('home')
      break
    case '/write':
      fs.writeFile('./data/writeFile.txt','hello node',(err) => {
        if(err){
          return console.log(err);
        }
        console.log('success');
      })
      break
    case '/read':
      fs.readFile('./data/readFile.txt',(err, data) => {
        if(err){
          return  console.log('read file');
        }
        res.write(data.toString())
      })
      break
    default '/404':
      res.write('404')
  }
  res.end()
}).listen(3000,()=> {
  console.log('server is running');
})
