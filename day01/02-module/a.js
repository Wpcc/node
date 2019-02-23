/*
报错：证明不同模块存在不同的作用域
*/
const b = 5;
const {bSay} = require('./b');


function say(){
  console.log(b);
}

say(b);
