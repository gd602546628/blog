/**
 * Created by gd on 2017/5/5.
 */


let test = /[^#\d*]\d+/g;
let str="color='#5151BF'>'runoob'</font>, 786, 2.23,"
console.log(test.test(str))

str=str.replace(test,'!');
console.log(str)