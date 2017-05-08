/**
 * Created by gd on 2017/5/5.
 */


let checkWord = /[^\u4e00-\u9fa5、]/g;
let checkDot = /(([\u4e00-\u9fa5]+)、([\u4e00-\u9fa5]+))/g;
let str="dsds、、点三、是的是的"


str=str.replace(checkWord,'');
let result=''
str=str.replace(checkDot,function(word){
    result+=word
    return word
})


function replaceDot(str){
    var checkWord = /[^\u4e00-\u9fa5、]/g;
    var checkDot = /(([\u4e00-\u9fa5]+)、([\u4e00-\u9fa5]+))/g;
    var result=''
    str=str.replace(checkWord,'');
    str=str.replace(checkDot,function(word){
        result+=word
        return word
    })
    return result
}

console.log(replaceDot("dsds、、点三、是的是的"))