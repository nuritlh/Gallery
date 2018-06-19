var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png">';
var BALL_IMG = '<img src="img/ball.png">';

var gGamerPos = { i: 2, j: 9 };
var gBoard = buildBoard();

var gStartGame = false;
var gAddBallInterval = null;
var Collecting = 0;
var gGameEnd = false;

renderBoard(gBoard);

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if ((i === 0 && j !== 5) || (i === board.length - 1 && j !== 5) || (j === 0 && i !== 5) || (j === board[0].length - 1 && i !== 5)) {
				cell.type = WALL;

			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	board[3][8].gameElement = BALL;
	board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	console.log('strHTML is:');
	console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	if (!gGameEnd) {

		if (!gStartGame) {
			gStartGame = true;
			gAddBallInterval = setInterval(addBalls, 5000);
		}

		var targetCell = gBoard[i][j];
		if (targetCell.type === WALL) return;

		// Calculate distance to ake sure we are moving to a neighbor cell
		var iAbsDiff = Math.abs(i - gGamerPos.i);
		var jAbsDiff = Math.abs(j - gGamerPos.j);


		// If the clicked Cell is one of the four allowed
		if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0) || (iAbsDiff === 0 && jAbsDiff === gBoard[0].length - 1) || (jAbsDiff === 0 && iAbsDiff === gBoard.length - 1)) {

			if (targetCell.gameElement === BALL) {
				console.log('Collecting!');
				Collecting++
				document.querySelector('.BallsCollected').innerText = 'Balls Collected: ' + Collecting;
				setTimeout(checkEndOfGame, 500);
			}

			// MOVING
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
			renderCell(gGamerPos, '');
			gGamerPos.i = i;
			gGamerPos.j = j;
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
			renderCell(gGamerPos, GAMER_IMG);

		} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	}
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, (i === 5 && j === 0) ? 11 : j - 1)
			break;
		case 'ArrowRight':
			moveTo(i, (i === 5 && j === 11) ? 0 : j + 1)
			break;
		case 'ArrowUp':
			moveTo((i === 0 && j === 5) ? 9 : i - 1, j)
			break;
		case 'ArrowDown':
			moveTo((i === 9 && j === 5) ? 0 : i + 1, j)
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function addBalls() {
	var row = getRandomIntInclusive(1, 8);
	var col = getRandomIntInclusive(1, 10);
	if (gBoard[row][col].gameElement === null) {
		gBoard[row][col].gameElement = BALL;
		var cellClass = getClassName({ i: row, j: col })
		document.querySelector('.' + cellClass).innerHTML += BALL_IMG;
	} else addBalls();
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkEndOfGame() {
	for (var i = 1; i < gBoard.length - 1; i++) {
		for (var j = 1; j < gBoard[i].length - 1; j++) {
			if (gBoard[i][j].gameElement === BALL) return
		}
	}
	clearInterval(gAddBallInterval);
	document.querySelector('.myButton').style.display = 'inline-block';
	alert('end game');
	gGameEnd = true;
}

function restartGame() {
	gGamerPos = { i: 2, j: 9 };
	gStartGame = false;
	gAddBallInterval = null;
	gGameEnd = false;
	Collecting = 0;
	gBoard = buildBoard();
	renderBoard(gBoard)
}
