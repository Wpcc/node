/**
 * 回调函数的目的：在于拿到异步操作中的变量
 * 1.异步操作的问题，是该动作在未来某一刻才能完成，只能通过回调函数，进行变量的传参。
 */
function fn(callback){
  setTimeout(function(){
    var a = 15;
    callback(a);
  },1000);
}
fn(function(a){
  console.log(a);
});
