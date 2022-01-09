import '../scss/style.scss';
import { searchReps } from "./search";
import { debounce } from './debounce';
import { async } from "regenerator-runtime";

const savedList = document.querySelector('.saved-list')
const input = document.querySelector('input');
let autocompliteList = document.querySelector('ul');
let reps = new Map();

let crElem = function(elem, klass=null, id=null) {
 let el=  document.createElement(elem);
 el.classList.add(klass);
 el.id = id;
 return el;
}

function render(data) {
  let fragment = document.createDocumentFragment();
  for(let item of data.keys()){
    let listItem = crElem('li','autocomplite-list__item',item);
    listItem.textContent = data.get(item).name;
    fragment.appendChild(listItem);
  }
  autocompliteList.appendChild(fragment);
}

function clear () {
  let listItems = document.querySelectorAll('.autocomplite-list__item');
  listItems.forEach(element => {
    element.remove();
  });
}

const del = (e) => {
  e.stopPropagation();
  e.target.parentNode.remove();
}

const saveRep = (e) => {
  let key = Number(e.target.id);
  let data = reps.get(key);
  let listItem = crElem('li','saved-list__item');
  let div = crElem('div', 'saved-list__info');
  let btn = crElem('button','close-btn');
  btn.textContent= "X";
  btn.addEventListener('click',del);
  for(let item in data) {
    let span = crElem('span');
    span.textContent= `${item}: ${data[item]}`;
    div.appendChild(span);
  }
  listItem.appendChild(div);
  listItem.appendChild(btn);
  savedList.appendChild(listItem);
  while (autocompliteList.firstChild) {
    autocompliteList.removeChild(autocompliteList.firstChild);
  }
  input.value= "";
}

async function updateValue(e) {
  clear();
  let search = await searchReps(e.target.value);
  await search.items.forEach((element,index) => {
    reps.set(index,{name: element.name, owner:element.owner.login, stars:element.stargazers_count})
  });
  render(reps);
}

autocompliteList.addEventListener('click', saveRep);


updateValue = debounce(updateValue, 400);
input.addEventListener('keyup', updateValue);

