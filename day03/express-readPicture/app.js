const express = require('express')
const cors = require('cors')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './uploads')
  },
  filename: function(req, file, cb){
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

const upload = multer({storage: storage})

const app = express()

app.options('/profile',cors())
app.post('/profile', cors(), upload.single('avatar'), function(req, res) {
  console.log(req.file)
  res.json({msg:'ok!'})
})

app.listen(3000,function(){
  console.log('server is running');
})
