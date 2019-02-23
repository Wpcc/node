var express = require('express')
var session = require('express-session')

var app = express()
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/', function(req, res){
  res.send('hello app')
})
app.get('/login', function(req, res){
  //设置session的值
  req.session.islogin = true
})

app.listen('3000', function(){
  console.log('app is running');
})
