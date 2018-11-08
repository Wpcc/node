var express = require('express');
var path = require('path');
var app = express();

app.get('/',function(req,res){
  //获取cookie值
  console.log(req.cookies[name]);
  req.cookies = parseCookie(req.headers.cookie);
  handle(req,res);
  // res.sendFile(path.join(__dirname,'index.html'));
})

app.listen('3000',function(){
  console.log('app is running');
})

// 将cookie字符串解析成cookie对象
function parseCookie(cookie){
  var cookies = {};
  if(!cookie){
    return cookies;
  }
  var list = cookie.split(';');
  for(var i=0;i<list.length;i++){
    var pair = list[i].split('=');
    cookies[pair[0].trim()]= pair[1];
  }
  return cookies;
}
// handle === 基于cookie的业务处理函数
function handle(req,res){
  if(!req.cookies.isVisit){
    res.setHeader('Set-Cookie',serialize('isVisit','1'));
    res.writeHead(200);
    res.end('welcome to zoo');
  }else{
    // TODO
    res.writeHead(200);
    res.end('welcome next to zoo');
  }
}
/**
 * serialize == 将原本设置字符串的cookie方法 封装起来
 * 该函数中option为一个对象
 */
function serialize(name,value,opt){
  var pairs = [name + '=' + value];

  opt = opt || {};
  if(opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
  if(opt.domain) pairs.push('Domain=' + opt.domain);
  if(opt.path) pairs.push('Path=' + opt.path);
  if(opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if(opt.httpOnly) pairs.push('HttpOnly');
  if(opt.secure) pairs.push('Secure');

  return pairs.join('; ');
}
