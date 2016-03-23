//Arrow
var list = [1,2,3,4,5,6];

var odds = list.map(v => v + 1);
var nums = list.map((v , i)=> v + i );
var paris = list.map( v => ({even : v , odd : v + 1}));

console.log('1122334');


console.log(2);
console.log(odds , nums , paris);