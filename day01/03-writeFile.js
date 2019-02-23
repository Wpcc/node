/*
  写入文件：
*/

//10
const fs = require('fs')
fs.writeFile('./data/writeFile.txt','hello node',(err)=>{
  if(err){
    console.log('error');
  }
  console.log('success');
})
