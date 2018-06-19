'use strict';

function saveToStorage(key, value) {
  console.trace('save to storage');
  // console.log(JSON.stringify(value));
  localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//get random date btween range
function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}
