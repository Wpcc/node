const arr = [1,3,3,66,66,8,9,17,26]

// 10
function uniq(arr) {
  const temp =[]
  arr.forEach(item => {
    if(temp.indexOf(item) == -1){
      temp.push(item)
    }
  })
  console.log(temp);
}
uniq(arr)
