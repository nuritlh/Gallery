'use strict';

var gBooksID =
  loadFromStorage('gBooksID') !== null ? loadFromStorage('gBooksID') : 1;
var gBooks = createBooks();
var gOnClickBook = 0;

function createBooks() {
  var localBooks = loadFromStorage('gBooks');
  if (localBooks !== null) return localBooks;

  var books = [];

  books.push(
    createBook(
      'An American Marriage',
      '14',
      0,
      '<img class="table-img" src="img/An American Marriag.PNG" />'
    )
  );
  books.push(
    createBook(
      'Educated: A Memoir',
      '14',
      0,
      '<img class="table-img" src="img/Educated A Memoir.PNG" />'
    )
  );
  books.push(
    createBook(
      'Circe',
      '11',
      0,
      '<img class="table-img" src="img/Circe.PNG" />'
    )
  );
  books.push(
    createBook(
      'The Woman in the Window',
      '19',
      0,
      '<img class="table-img" src="img/The Woman in the Window.PNG" />'
    )
  );
  books.push(
    createBook(
      'Everything Here Is Beautiful',
      '21',
      0,
      '<img class="table-img" src="img/Everything Here Is Beautiful.PNG" />'
    )
  );
  books.push(
    createBook(
      'You Think It, Ill Say It: Stories',
      '13',
      0,
      '<img class="table-img" src="img/You Think It, Ill Say It Stories.PNG" />'
    )
  );
  books.push(
    createBook(
      'Look Alive Out There: Essays',
      '11',
      0,
      '<img class="table-img" src="img/Look Alive Out There Essays.PNG" />'
    )
  );
  console.log(books);
  saveToStorage('gBooks', books);
  return books;
}

function createBook(name, price, rate, coverPhoto) {
  var book = {
    id: gBooksID++,
    name: name,
    price: price,
    rate: rate,
    coverPhoto: coverPhoto
  };
  saveToStorage('gBooksID', gBooksID);
  return book;
}

function deleteBook(bookID) {
  for (var i = 0; i < gBooks.length; i++) {
    if (gBooks[i].id === bookID) {
      gBooks.splice(i, 1);
      break;
    }
  }
  saveToStorage('gBooks', gBooks);
  return gBooks;
}

function addBook(name, price) {
  gBooks.unshift(
    createBook(
      name,
      price,
      0,
      '<img class="table-img" src="img/for sale.PNG" />'
    )
  );
  saveToStorage('gBooks', gBooks);
  return gBooks;
}

function updateBook(bookId, bookPrice) {
  for (var i = 0; i < gBooks.length; i++) {
    if (gBooks[i].id === bookId) {
      gBooks[i].price = bookPrice;
      break;
    }
  }
  saveToStorage('gBooks', gBooks);
  return gBooks;
}

function getBookDetails(bookId) {
  var currbook = gBooks.filter(function(book) {
    return book.id === bookId;
  });
  gOnClickBook = currbook[0].id;
  return currbook[0];
}

function rateCliked(ratePoint) {
  for (var i = 0; i < gBooks.length; i++) {
    if (gBooks[i].id === gOnClickBook) {
      gBooks[i].rate += ratePoint;
      if (gBooks[i].rate > 10) gBooks[i].rate = 10;
      if (gBooks[i].rate < 0) gBooks[i].rate = 0;
      break;
    }
  }
  saveToStorage('gBooks', gBooks);
  return gBooks[i].rate;
}

function getUsersForDisplay(strSort) {
  var books = gBooks.slice();
  if (strSort === 'ID') books = setSortbyID(books);
  if (strSort === 'Book Name') books = setSortbyName(books);
  if (strSort === 'Price') books = setSortbyPrice(books);
  if (strSort === 'Rate') books = setSortbyRate(books);
  saveToStorage('gBooks', books);

  return books;
}

function setSortbyID(books) {
  books.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    return obj1.id - obj2.id;
  });

  return books;
}

function setSortbyName(books) {
  books.sort(function(obj1, obj2) {
    return obj1.name.toUpperCase() > obj2.name.toUpperCase();
  });

  return books;
}
function setSortbyPrice(books) {
  books.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    return obj1.price - obj2.price;
  });

  return books;
}
function setSortbyRate(books) {
  books.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
    return obj2.rate - obj1.rate;
  });

  return books;
}
