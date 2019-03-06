/*
当启动tcp服务器后，可以通过xshell中telnet去进行服务器访问
*/
const net = require('net')

const server = net.createServer(function (socket) {
  socket.setEncoding('utf-8')
  //新的连接
  socket.on('data', function(data){
    socket.write('你好')
  })

  socket.on('end', function(){
    console.log('连接断开')
  })

  socket.write('欢迎光临《深入浅出Node.js》示例：\n')
})

// server.listen(8124, function(){
//   console.log('server bound');
// })
server.listen(8124,function(){
  console.log('server is running')
})
