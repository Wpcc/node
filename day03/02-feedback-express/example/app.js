var express = require('express');
var app = express();
app.engine('html', require('express-art-template'));
app.set('views', './');


app.get('/', function (req, res) {
    res.render('demo.html');
});

app.listen(3000,()=>console.log('example app listening on port 3000!'));
