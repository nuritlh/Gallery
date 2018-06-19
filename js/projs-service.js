'use strict';

var gProjID =
  loadFromStorage('gProjID') !== null ? loadFromStorage('gProjID') : 1;

var gProjs = createProjects();

function createProjects() {
  var localgProjs = loadFromStorage('gProjs');
  if (localgProjs !== null) return localgProjs;

  var projs = [];

  projs.push(
    createProj(
      'Ball-Board',
      'Collate all balls',
      'Hes back, and hes hungry! Help the our monster catch some balls and Christmas candy in this winter wonderland.',
      'projs/ball-baord',
      new Date('2018', '5', '28'),
      'Matrixes, keyboard & mouse events'
    )
  );
  projs.push(
    createProj(
      'book-shop',
      'Virtual Book Store',
      'Recomanded Books of 2018',
      'projs/book-shop',
      new Date('2018', '6', '12'),
      ['Matrixes', ' keyboard events']
    )
  );

  projs.push(
    createProj(
      'touch-nums',
      'touch-nums game',
      'Touch the numbers from 1 to 25 as fast as you can, and become a world record holder! Touch the Numbers" is a simple game for training your reflexes and peripheral vision. ',
      'projs/touch-nums',
      new Date('2018', '5', '28'),
      ['Matrixes', 'keyboard events']
    )
  );

  projs.push(
    createProj(
      'calculator',
      'calculator tool',
      'used to perform calculations, ranging from basic arithmetic to complex mathematics.',
      'projs/calculator',
      new Date('2018', '5', '29'),
      ['Matrixes', 'keyboard events']
    )
  );

  projs.push(
    createProj(
      'mister-chess',
      'mister-chess game',
      'Chess is a two-player strategy board game played on a chessboard, a checkered gameboard with 64 squares arranged in an 8×8 grid.[1] The game is played by millions of people worldwide. Chess is believed to have originated in India sometime before the 7th century.',
      'projs/mister-chess',
      new Date('2018', '5', '28'),
      ['Matrixes', 'keyboard events']
    )
  );
  projs.push(
    createProj(
      'minesweeper',
      'minesweeper title',
      'Minesweeper is a logic-based puzzle game which evolved from similar games developed in the 1980’s such as Relentless Logic and Mines. The player is presented with a grid consisting of a variable number of squares. A typical game may consist of a 16*16 grid with 40 mines which the player must find.',
      'projs/minesweeper',
      new Date('2018', '5', '30'),
      ['Matrixes', 'keyboard events']
    )
  );

  //   projs.push(
  //     createProj(
  //       'in-picture',
  //       'in-picture game',
  //       'in-picture description bla bla',
  //       'projs/in-picture',
  //       new Date('2018', '5', '28'),
  //       ['Matrixes', 'keyboard events']
  //     )
  //   );

  console.log(projs);
  saveToStorage('gProjs', projs);
  return projs;
}

function createProj(name, title, desc, url, publishedAt, labels) {
  var proj = {
    id: gProjID++,
    name: name,
    title: title,
    desc: desc,
    url: url,
    publishedAt: publishedAt,
    labels: labels
  };
  saveToStorage('gProjID', gProjID);
  return proj;
}

function getProjByID(projID) {
  return gProjs.find(function(proj) {
    return projID === proj.id;
  });
}
