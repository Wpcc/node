const http = require('http')

http.createServer((req, res) => {
  console.log(req.url);
  if(req.url === '/profile'){
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','POST OPTIONS')
    res.end('ok!')
  }
}).listen(3000,function(){
  console.log('server is running');
})
