'use strict';


//global vars
var gSequenceNum = 1;
var gNum = 0; //end of game get the length of the board
var gStartFlag = true;
var mytimer = 0
var gStartTime = 0;
var time = 0;

//init game
function onLevelClick(el) {
    clearGame();
    createBoard(el);
}

//game algo
function cellClicked(el) {
    var elNextNum = document.querySelector('#next-num');
    elNextNum.style.display = 'inline';

    if (gStartFlag) {
        startcounting();
        gStartFlag = false;
        document.querySelector('.play-again').style.display = 'block';
        document.querySelector('.timer').style.display = 'inline';
    }
    var currNum = Number(el.innerHTML);
    if (gSequenceNum === gNum) {
        setTimeout(endGame, 50)
    }
    if (currNum === gSequenceNum) {
        elNextNum.innerHTML = gSequenceNum + 1;
        gSequenceNum++;
        el.style.background = '#fb9e25';
    }
}

//build boad
function createBoard(el) {
    document.querySelector('#difficulty-Levels').style.display = 'none';
    gNum = Number(el.innerHTML);
    var size = Math.sqrt(Number(el.innerHTML));
    var nums = createNums(Number(el.innerHTML));
    var tbl = '<table>';
    for (var i = 0; i < size; i++) {
        tbl += '<tr>';
        for (var j = 0; j < size; j++) {
            tbl += '<td class="c1" onclick="cellClicked(this)">' + nums[j] + '</td>';
        }
        nums.splice(0, size);
        tbl += '</tr>';
    }
    tbl += '</table>';
    document.querySelector('#board').innerHTML = tbl;
}

//check win
function endGame() {
    document.querySelector('#next-num').style.display = 'none';
    niceBoxAlert('Game End');
    clearInterval(mytimer);
}

//build numbers array
function createNums(num) {
    var nums = []
    for (var i = 1; i < num + 1; i++) {
        nums.push(i);
    }
    shuffle(nums);

    return nums;
}
//shuffle numbers in array
function shuffle(nums) {
    var j, x, i;
    for (i = nums.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = nums[i];
        nums[i] = nums[j];
        nums[j] = x;
    }
    return nums;
}

//timwe and show timer
function startcounting() {
    gStartTime = Date.now();
    mytimer = setInterval(setTime, 200);
}
function setTime() {
    var time = (Date.now() - gStartTime) / 1000
    var elTime = document.querySelector('.timer');
    elTime.innerHTML = time;
}

//clear board and global vars
function clearGame() {
    document.querySelector('#difficulty-Levels').style.display = 'block';
    gSequenceNum = 1;
    gNum = 0;
    time = 0;
    gStartFlag = true;
    gStartTime = 0;
    clearInterval(mytimer);
    mytimer = 0;
    document.querySelector('#board').innerHTML = '';
    document.querySelector('.play-again').style.display = 'none';
    document.querySelector('.timer').style.display = 'none';
    document.querySelector('#next-num').style.display = 'none';
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

