var fs = require('fs');

fs.writeFile('./data/writeFile.txt','hello writeFile',function(err){
  if(err){
    console.log('写入文件内容失败！');
    return false;
  }
  console.log('写入文件内容成功！');
})
