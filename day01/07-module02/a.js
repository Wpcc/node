var b = 5;
var bFun = require('./b');
bFun.say();

function say(){
  console.log(b);
}

say(b);
