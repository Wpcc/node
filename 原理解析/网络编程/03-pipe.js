const net = require('net')

const server = net.createServer(function(socket){
  socket.write('Echo server \r\n')
  socket.pipe(socket)
})
server.listen(1337,function(){
  console.log('server is running');
})
