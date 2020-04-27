// 'use strict';
const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)
// {
//   tag: 'h1',
//   attr: {
//     class: 'title'
//   }
// }

const attrToString = (obj = {}) => {
  const keys = Object.keys(obj); // ["class"]
  const attrs = [] 
  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(` ${attr}="${obj[attr]}"`)
  }
  const string = attrs.join('');
  return string;
}

// console.log(attrToString({class: 'title', paceholder: 'input'}))


// 'tag="h1" class="title"'

const tagAttrs = obj => (content = "") => 
`<${obj.tag}${attrToString(obj.attrs)}>${content}</${obj.tag}>`

console.log(tagAttrs({tag:'h1', attrs: { class: 'title',algo: 'title',}})('Hola a todos') )

const tag = t => {
  if ( typeof t === 'string') {
    tagAttrs({tag: t})
  }else{
    tagAttrs(t)
  }
}
// console.log(tag({tag:'h1', attrs: { class: 'title'}}))


let description = document.getElementById('description');
let calories = document.getElementById('calories');
let carbs = document.getElementById('carbs');
let protein = document.getElementById('protein');
let list = [];

description.addEventListener('keydown', () => description.classList.remove('is-invalid'));
calories.addEventListener('keydown', () => calories.classList.remove('is-invalid'));
carbs.addEventListener('keydown', () => carbs.classList.remove('is-invalid'));
protein.addEventListener('keydown', () => protein.classList.remove('is-invalid'));


const validateInputs = () => {
  !description.value? description.classList.add('is-invalid'): '';
  !calories.value? calories.classList.add('is-invalid'):'';
  !carbs.value? carbs.classList.add('is-invalid'):'';
  !protein.value? protein.classList.add('is-invalid'):'';

  if (description.value && calories.value && carbs.value && protein.value ) {
    add();
    clear();
  }
};
const add = () => {
  const newItem = {
    description: description.value,
    calories: Number(calories.value),
    carbs: Number(carbs.value),
    protein: Number(protein.value)
  }
  list.push(newItem)
  console.log(list)
};

const clear = () => {
  description.value = '';
  calories.value = '';
  carbs.value = '';
  protein.value = '';
}