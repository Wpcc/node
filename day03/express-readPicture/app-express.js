const express = require('express')
const app = express()

app.use('/upload',function(req, res, next){
  res.set({
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'GET,POST'
  })
  next()
})

app.post('/upload',function(req, res){
  res.json({msg:'ok!'})
})

app.listen(3000,function(){
  console.log('server is running');
})
