const a = {
  value : 2
}

const addOne = () => a.value += 1

const timesTwo = () => a.value *= 2

addOne()
timesTwo()
console.log(a.value)

timesTwo()
addOne()
console.log(a.value)


// Evitando la mutacion de objetos
const b = {
  value : 2
}
const addOne = () => Object.assign({}, b, {value: b.value+1})
const addTwo = () => Object.assign({}, b, {value: b.value*2})

console.log(addOne(), addTwo())