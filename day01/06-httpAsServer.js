/*
作为服务器跨域获取其它服务器上的数据
*/
const http = require('http')

http.get('http://www.imooc.com/u/card', function(res){
  let data = ''
  res.on('data', function(chunk){
    data += chunk
  })
  res.on('end', function(){
    console.log(data);
  })
})
