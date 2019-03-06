// 需要启动tcp服务器 即：node 01-tcp.js
const net =require('net')
const client = net.connect({port:8124}, function(){
  console.log('client connected')
  client.write('wrold!\r\n')
})
client.on('data', function(data){
  console.log(data.toString())
  client.end()
})
client.on('end',function(){
  console.log('client disconected')
})
