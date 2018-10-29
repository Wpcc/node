var http = require('http');
var fs = require('fs');

var server = http.createServer();

var wwwDir = 'C:/Users/Administrator/Desktop/nodejs/day02';
server.on('request',function(req,res){
  // 当用户访问list显示当前目录文件

  // 1.读取目录下文件
  if(req.url == '/list'){
    fs.readdir(wwwDir+'/www',function(err,files){
      if(err){
        return res.end('cannot find thid dir');
      }
      // 2.读取显示html内容，并将目录名动态拼接到html页面
      fs.readFile(wwwDir+'/03-template.html',function(err,data){
        if(err){
          return res.end('read failure');
        }
        var html = '';
        files.forEach(function(item){
          html += `
            <tr>
              <td>${item}</td>
            <tr>
          `;
        });
        data = data.toString();
        console.log(data);
        console.log(html);
        data = data.replace('TODO',html);

        res.end(data);
      })

    })
  }
})
server.listen(3000,function(){
  console.log('server is running');
})
