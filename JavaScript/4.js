
var id = undefined;

var test = function(){
    return new Promise((resolve, reject) => {
        setTimeout(function(){
            console.log('setTimeout')
            resolve("test");
        }, 2000)
    });
}





console.log('1 ', id)

test().then(function(data){
    console.log(data)
    id = data;
}).then(()=>{
    console.log('3 ', id)
})

console.log('2 ', id)

