// 'use strict';
const compose = (...functions) => data => functions.reduceRight((value, func) => func(value), data)
// {
//   tag: 'h1',
//   attr: {
//     class: 'title'
//   }
// }

// const attrToString = (obj = {}) => {
//   const keys = Object.keys(obj); // ["class"]
//   const attrs = [] 
//   for (let i = 0; i < keys.length; i++) {
//     let attr = keys[i];
//     attrs.push(` ${attr}="${obj[attr]}"`)
//   }
//   const string = attrs.join('');
//   return string;
// }

//Forma de programacion funcional
const attrToString = (obj = {}) => Object.keys(obj).map(attr => ` ${attr}="${obj[attr]}"`).join('')


// console.log(attrToString({class: 'title', paceholder: 'input'}))

// 'tag="h1" class="title"'

const tagAttrs = obj => (content = "") => 
`<${obj.tag}${attrToString(obj.attrs)}>${content}</${obj.tag}>`

console.log(tagAttrs({tag:'h1', attrs: { class: 'title',algo: 'title',}})('Hola a todos') )

// const tag = t => {
//   if ( typeof t === 'string') {
//     return tagAttrs({tag: t})
//   }
//   return tagAttrs(t)
// }

const tag = t => typeof t === 'string' ? tagAttrs({tag: t}) : tagAttrs(t)

// console.log(tag({tag:'h1', attrs: { class: 'title'}}))

const tableRowTag = tag('tr')
// const tableRow = items => tableRowTag(tableCells(items))
const tableRow = items => compose(tableRowTag, tableCells)(items)

const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')

//Generando el trash icon
const trashIcon = tag({tag: 'id', attrs:{class: 'fas fa-trash-alt'}})('')

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
    updateTotals();
    renderItems();
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

const updateTotals  = () => {
  let calories = 0, carbs = 0, protein = 0
  list.map(item => {
    calories += item.calories,
    carbs += item.carbs,
    protein += item.protein
  })
  document.getElementById('totalCalories').textContent= calories;
  document.getElementById('totalCarbs').textContent= carbs;
  document.getElementById('totalProtein').textContent= protein;
}


const clear = () => {
  description.value = '';
  calories.value = '';
  carbs.value = '';
  protein.value = '';
}

const renderItems = () => {
  const content = document.getElementsByTagName('tbody')[0];
  

  content.innerHTML = "";
    const rows = list.map((item, index) => {
      const removeButton = tag({
        tag: 'button',
        attrs: {
          class: 'btn btn-outline-danger',
          onclick: `removeItem(${index})`
        }
      })(trashIcon)
        const {
            calories, description,
            carbs, protein,
        } = item;
        return tableRow([description, calories, carbs, protein, removeButton]);
    });
    content.innerHTML = rows.join("");
}

const removeItem = ( index ) => {
  list.splice( index,1 );
  updateTotals();
  renderItems();
}