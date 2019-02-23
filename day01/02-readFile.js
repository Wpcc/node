/*
1.需要引入file system模块，并调用其中的readFile方法
2.将读取的二进制数据转码呈现
 */

const fs = require('fs')
fs.readFile('./data/hello.txt',(err, data)=> {
  if(err){
    console.log(err);
  }else{
    console.log(data.toString());
  }
})
