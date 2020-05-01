const compose = (...fns) => x => fns.reduceRight((acc, curr) => curr(acc), x);

const mapToDouble = arr => arr.map(x => x * 2); //[4, 8, 4]
const mapToObj = arr => arr.map(value => ({ value })); //[ { value: 4 }, { value: 8 }, { value: 4 } 
const sumAll = arr => arr.reduce((acc, curr) => acc + curr.value, 0); //16 

// function compose(...fns){
//   console.log(fns)
//   return function(x){
//     console.log(x)
//     return fns.reduceRight((acc, curr) => curr(acc), x);
//   }
// }

const originalArr = [2, 4, 2];

// sin usar compose
const result1 = sumAll(mapToObj(mapToDouble(originalArr)));
// usando compose

const result2 = compose(
  sumAll,
  mapToObj,
  mapToDouble,
)(originalArr);


console.log(`result1: ${result1}`);
console.log(`result2: ${result2}`);
