var fs = require('fs');

exports.addStudent = function(obj,callback){
  fs.readFile('db.json',function(err,data){
    if(err){
      return callback(err);
    }
    data = data.toString();
    var students = JSON.parse(data).students;
    students.push(obj);
    // 将数据转换成字符串，存储到db.json
    var stuStr = JSON.stringify({"students":students});
    fs.writeFile('db.json',stuStr,function(err){
      if(err){
        return callback(err);
      }
      callback(null);
    })
  })
}
exports.modStudent = function(obj,callback){
  fs.readFile('db.json',function(err,data){
    if(err){
      return callback(err);
    }
    data = data.toString();
    var studentsArr = JSON.parse(data).students;
    /*
     1.通过id找出相同id的学生对象
     */
    var student = studentsArr.find(function(item,index){
      return item.id === obj.id;
    })
    console.log(student);
    for(var key in student){
      student[key] = obj[key];
    }
    console.log(student);
    console.log(studentsArr);
    // 将数组转成字符串
    var studentStr = JSON.stringify({"students":studentsArr});
    console.log(studentStr);
    fs.writeFile('db.json',studentStr,function(err){
      if(err){
        return callback(err);
      }
      callback(null);
    })
  })
}
exports.delStudent = function(id,callback){
  fs.readFile('db.json',function(err,data){
    if(err){
      return callback(err);
    }
    data = data.toString();
    var students = JSON.parse(data).students;
    // 通过传递过来的id来查找数组相同id的项
    var findInd = students.findIndex(function(item,index){
      return item.id === id;
    })
    students.splice(findInd,1);
    var stuStr = JSON.stringify({"students":students});
    fs.writeFile('db.json',stuStr,function(err){
      if(err){
        return callback(err);
      }
      callback(null);
    })
  })
}
