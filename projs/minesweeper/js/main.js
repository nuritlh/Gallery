'use strict'

//Global vars
var gBoard = [];

var gState = {
    isGameOn: false,
    markedCount: 0,
    isGameOver: false,
    secsPassed: 0
};

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var FLAG = '🚩';
var BOM = '💣';
var NORMAL_SMILEY = '😃';
var SAD_SMILEY = '😢';
var HAPPY_SMILEY = '😎';

var timer = null;
var totalSeconds = 0;
var bestTime = null;

//clear boad and global vars
function initGame() {
    clearInterval(timer);
    document.querySelector('.play-again').style.display = 'none';
    document.querySelector('.board').innerHTML = '<img src="img/MineSweeper.PNG" class="open-picture">';
    gBoard = [];
    gState.isGameOn = false;
    gState.shownCount = 0;
    gState.isGameOver = false;
    gState.secsPassed = 0;
    gState.markedCount = 0;
    timer = null;
    totalSeconds = 0
    document.querySelector('.seconds').innerHTML = pad(totalSeconds % 60);
    document.querySelector('.minutes').innerHTML = pad(parseInt(totalSeconds / 60));
    document.querySelector('.smiley').innerHTML = ' ' + NORMAL_SMILEY + ' ';
}

//build game data structure
function buildBoard(boardSize, numMines) {
    // CR: buildBoard should only build the board, not record storage or somthing alse.
    recordStorage(boardSize, numMines);
    if (gState.isGameOn) {
        gState.isGameOn = false;
        initGame();
    }
    var board = [];
    gLevel.SIZE = boardSize;
    gLevel.MINES = numMines;

    for (var i = 0; i < gLevel.SIZE; i++) {
        var row = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = createCell();
            row.push(cell);
        }
        board.push(row);
    }
    renderBoard();
    gBoard = board;
}

function createCell() {
    var cell = {
        bombsAroundCount: 0,
        isShown: false,
        isBomb: false,
        isMarked: false,
    }
    return cell;
}

//adding html board to the page
function renderBoard() {

    var strHtml = '<table>';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHtml += '<td class="cell-' + i + '-' + j + '" onmousedown="cellClicked(event,this, ' + i + ', ' + j + ')" ></td>';
        }
        strHtml += '</tr>';
    }
    strHtml += '</table>';
    document.querySelector('.board').innerHTML = strHtml;
}


//set mines after first click
function setMines(cordx, cordj) {
    // CR: coordx and coordj is kind of wired, try coordX,coordY or coordI,coordJ

    var coords = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            if (i !== cordx || j !== cordj) coords.push([i, j])
        }
    }
    shuffle(coords);

    for (var x = 0; x < gLevel.MINES; x++) {
        var row = coords[x][0];
        var col = coords[x][1];
        gBoard[row][col].isBomb = true
    }
    setMinesNegsCount()
}

//setting mines around for each cell
function setMinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var bomsNums = CountbombsAround(i, j);
            gBoard[i][j].bombsAroundCount = bomsNums
        }
    }
}

//count mines around each cell (max 9 cells)
function CountbombsAround(row, col) {
    var counter = 0;
    for (var i = row - 1; i < row + 2; i++) {
        for (var j = col - 1; j < col + 2; j++) {
            if (i === row && j === col) continue
            if (i < 0 || j < 0 || i >= gBoard.length || j >= gBoard.length) continue;
            if (gBoard[i][j].isBomb) counter++
        }
    }
    return counter;
}

//game algo when user click on cell
function cellClicked(ev, elCell, i, j) {
    if (!gState.isGameOver) {
        if (ev.which === 3) {
            cellMarked(ev, elCell, i, j);
            return
        } else {
            if (!gState.isGameOn) {
                timer = setInterval(setTime, 1000);
                gState.isGameOn = true;
                setMines(i, j);
            }

            expandShown(elCell, i, j);
            setTimeout(checkGameOver, 200);
        }
    }
}

//reveal chosen cell algo

//CR: expandShown should only be called when user clicked on a cell wirh 0 negs and the expend the cells.
//this func should be in cellClickd
function expandShown(elCell, i, j) {
    var cell = gBoard[i][j];
    // CR: if (cell.isMarked || cel.isShown) rutern Will be better
    if (cell.isMarked === true) return;
    if (cell.isShown === true) return;
    if (cell.isBomb === true) {
        gameOver();
        // CR: there is no need to return, "else if" is better then return
        return;
    }
    if (cell.bombsAroundCount !== 0) {
        document.querySelector('.' + elCell.className).innerHTML = cell.bombsAroundCount;
        cell.isShown = true;
        return;
    }
    document.querySelector('.' + elCell.className).style.backgroundColor = '#D4CDCD';
    cell.isShown = true;    
    revealNeighbors(i, j);
}

//reveal all 'clean' neighbors (numbers/empty)
// CR: this func should be expendShown
function revealNeighbors(i, j) {
    var row = i;
    var col = j;
    for (var x = row - 1; x < row + 2; x++) {
        for (var y = col - 1; y < col + 2; y++) {
            if (x === row && y === col) continue
            if (x < 0 || y < 0 || x >= gBoard.length || y >= gBoard.length) continue;
            if (gBoard[x][y].isShown) continue;
            if (gBoard[x][y].isMarked) continue;
            if (gBoard[x][y].bombsAroundCount !== 0) {
                var cellClassName = '.cell-' + x + '-' + y;
                document.querySelector(cellClassName).innerHTML = gBoard[x][y].bombsAroundCount;
                gBoard[x][y].isShown = true;
            }
            if (gBoard[x][y].bombsAroundCount === 0) {
                gBoard[x][y].isShown = true;
                var cellClassName = '.cell-' + x + '-' + y;
                document.querySelector(cellClassName).style.backgroundColor = '#D4CDCD';
                revealNeighbors(x, y);
            }
        }
    }
}

//add or remove flags
function cellMarked(el, elCell, i, j) {
    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true;
        document.querySelector('.' + elCell.className).innerHTML = FLAG;
        gState.markedCount++;
        document.querySelector('.marked-flags').innerHTML = gLevel.MINES - gState.markedCount;

    } else {
        gBoard[i][j].isMarked = false;
        document.querySelector('.' + elCell.className).innerHTML = '';
        gState.markedCount--;
        document.querySelector('.marked-flags').innerHTML = gLevel.MINES - gState.markedCount;
    }
}

//check win every click
function checkGameOver() {
    var count = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isShown)
                count++
        }
    }
    var endGame = gLevel.SIZE * gLevel.SIZE - gLevel.MINES;
    if (count === endGame) {
        clearInterval(timer);
        document.querySelector('.smiley').innerHTML = ' ' + HAPPY_SMILEY + ' ';
        document.querySelector('.play-again').style.display = 'block';
        niceBoxAlert('You won! Great game');
        gState.isGameOver = true;
        checkBestTime();
    }
}

//user click on bom - game over and reveal all boms
function gameOver() {
    clearInterval(timer);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isBomb) {
                var cellClassName = '.cell-' + i + '-' + j;
                document.querySelector(cellClassName).innerHTML = BOM;
            }
        }
    }
    document.querySelector('.smiley').innerHTML = ' ' + SAD_SMILEY + ' ';
    gState.isGameOver = true;
    document.querySelector('.play-again').style.display = 'block';
    setTimeout(function () { niceBoxAlert('Not bad, try again') }, 200);
}

// time counter and best score
function setTime() {
    var minutesLabel = document.querySelector('.minutes');
    var secondsLabel = document.querySelector('.seconds');
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

//convert sec to min
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

//check best score from the local storage
function checkBestTime() {
    if (totalSeconds < bestTime) {
        localStorage.setItem(gLevel.SIZE, totalSeconds);
        var recordTime = pad(parseInt(totalSeconds / 60)) + ':' + pad(totalSeconds % 60);
        document.querySelector('.record').innerHTML = 'Best Record :' + recordTime;
    }
}

//shuffle items in array to select random idx to set boms
function shuffle(coordsNums) {
    var j, x, i;
    for (i = coordsNums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = coordsNums[i];
        coordsNums[i] = coordsNums[j];
        coordsNums[j] = x;
    }
    return coordsNums;
}

// Nice alert box
function niceBoxAlert(Text) {
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
    var insideText = document.getElementById("alertText");
    insideText.innerHTML = Text;
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

//get best times from local storage
function recordStorage(boardSize, numMines) {

    if (localStorage.getItem(boardSize) === null || localStorage.getItem(boardSize) === 'no-record') {
        localStorage.setItem(boardSize, 'no-record');
        document.querySelector('.record').innerHTML = 'Set NEW record!';
        bestTime = Infinity;
    } else {
        bestTime = Number(localStorage.getItem(boardSize));
        var recordTime = pad(parseInt(bestTime / 60)) + ':' + pad(bestTime % 60);
        document.querySelector('.record').innerHTML = 'Best Record :' + recordTime;
    }
    document.querySelector('.record').style.display = 'block';
    document.querySelector('.marked-flags').innerHTML = numMines;
    document.querySelector('.marked-flags').style.display = 'block';
}