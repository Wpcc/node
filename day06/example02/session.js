var express = require('express');
var path = require('path');
var app = express();

app.get('/',function(req,res){
  //给req添加cookies方法：该方法放置cookie解析后的对象
  req.cookies = parseCookie(req.headers.cookie);
  handle(req,res);
  // res.sendFile(path.join(__dirname,'index.html'));
})

app.listen('3000',function(){
  console.log('app is running');
})

// 新建一个session
var sessions = {};
var key = 'session_id';
var Expires = 20*60*1000;

// 生成session映射数据
var generate = function(){
  var session = {};
  session.id = (new Date()).getTime() + Math.random();
  session.cookie = {
    expire:(new Date()).getTime() + Expires;
  }
  sessions[session.id] = session;
  return session;
}


var check = function(req,res){
  // 通过cookie获取内容id
  var id = req.cookies[key];
  if(!id){
    req.session = generate();
    // 该方法返回一个session对象:包括id、cookie对象
  }else{
    var session = sessions[id];
    if(session){
      if(session.cookie.expire > (new Date()).getTime()){
        // 未超时：更新超时时间
        session.cookie.expire = (new Date()).getTime() + Expires;
      }else{
        // 超时：删除旧的数据，并重新生成
        delete sessions[id];
        req.session = generate();
      }
    }else{
      // 如果session过期或口令不对，重新生成session,并把session挂载在req上
      req.session = generate();
    }
  }
  handle(req,res);
}

// 解析cookie字符串
var parseCookie = function(){
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
  if(!req.session.isVisit){
    res.session.isVisit = true;
    res.writeHead(200);
    res.end('welcome to zoo');
  }else{
    // TODO
    res.writeHead(200);
    res.end('welcome next to zoo');
  }
}
