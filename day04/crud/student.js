var fs = require('fs');

exports.addStudent = function(obj,callback){
  fs.readFile('db.json',function(err,data){
    if(err){
      return callback(err);
    }
    data = data.toString();
    var students = JSON.parse(data).students;
    students.push(obj);
    callback(null,students);
  })
}
exports.modStudent = function(){

}
exports.delStudent = function(){

}
