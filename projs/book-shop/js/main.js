'use strict';

$(document).ready(function() {
  console.log('onload');
  var localBooks = loadFromStorage('gBooks');
  // if (localBooks) books = localBooks;
  renderBooks(localBooks);
});

function renderBooks(books) {
  var strHTMLs = books.map(function(book) {
    return `<tr><th scope="row">${
      book.id
    }</th><td>${book.name}</td><td>${book.price}$</td><td>${book.rate}</td><td>${book.coverPhoto}</td>
    <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onclick="onReadClicked(${
                          book.id
                        })">Read</button>
                        <button type="button" class="btn btn-secondary" onclick="readAndUpdateBook(${
                          book.id
                        })">Update</button>
                        <button type="button" class="btn btn-secondary" onclick="onDeleteBook(${
                          book.id
                        })">Delete</button>
                    </div>
                </td>
    
    </tr>`;
  });

  document.querySelector('.books-contant').innerHTML = strHTMLs.join('');
}

function readAndAddNewBook() {
  var name = prompt('Please enter book Name', 'Still Me');
  var price = prompt('Please enter book price', '15.9');
  var books = addBook(name, price);
  renderBooks(books);
}

function onReadClicked(bookID) {
  console.log('read');
  var book = getBookDetails(bookID);
  document.querySelector('.modal-title').innerHTML = book.name;
  document.querySelector('.modal-body-img').innerHTML = book.coverPhoto;
  document.querySelector('.modal-body-img > img').style.height = '70%';
  document.querySelector('.modal-body-price').innerHTML =
    'Price :' + book.price;
  document.querySelector('.modal-body-rate').innerHTML = 'Rate :' + book.rate;
}

function readAndUpdateBook(bookID) {
  console.log('update');
  var price = prompt('Please enter NEW price', '15.9');
  var books = updateBook(bookID, price);
  renderBooks(books);
}

function onDeleteBook(bookID) {
  console.log('delete');
  var books = deleteBook(bookID);
  renderBooks(books);
}

function onRateCliked(ratePoint) {
  var updateRate = rateCliked(ratePoint);
  document.querySelector('.modal-body-rate').innerHTML = 'Rate :' + updateRate;
  renderBooks(gBooks);
}

function onSetSort(strSort) {
  var books = getUsersForDisplay(strSort);
  renderBooks(books);
}
