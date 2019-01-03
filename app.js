const _ = require('underscore');


var result= _.contains([1,2,3], 3);

console.log("check", result);

var lion = require('lion-lib');

var add = lion.add(1,3);
var mult = lion.multiply(2,4);
console.log("add",add,mult);