var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function(req, res){
  console.log(req.cookies)
  res.send('hello cookie')
})

app.listen('3000',function(){
  console.log('app is running');
})
