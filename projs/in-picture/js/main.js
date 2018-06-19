'use strict'

//global vars
var gQuests = [
    { id: 1, opts: ['the cat is blue', 'the cat is white'], correctOptIndex: 0 },
    { id: 2, opts: ['the cat is green', 'the cat is red'], correctOptIndex: 1 },
    { id: 3, opts: ['the cat is black', 'the cat is yellow'], correctOptIndex: 1 },
];

var gCurrQuestIdx = 0

function init() {
    renderQuest();
    
}

function renderQuest() {
    var elPicture = document.querySelector('.quest-picture');
    elPicture.src = 'img/' + gQuests[gCurrQuestIdx].id + '.PNG';
    var strHtml = '';
    for (var i = 0; i < gQuests[gCurrQuestIdx].opts.length; i++) {
        strHtml += '<button id="ans' + i + '" class="myButton" onclick="checkAnswer(' + i + ') ">';
        strHtml += gQuests[gCurrQuestIdx].opts[i];
        strHtml += '</button>';
    }
    document.querySelector('.answers').innerHTML = strHtml;
    document.querySelector('.playAgainbtn').style.display = 'none';
    
}

function checkAnswer(optIdx) {
    if (optIdx === gQuests[gCurrQuestIdx].correctOptIndex) {
        gCurrQuestIdx++;
        if (gCurrQuestIdx === gQuests.length) {
            niceBoxAlert('End Game');
            document.querySelector('.playAgainbtn').style.display = 'inline-block';
            return
        }
        renderQuest();
    }
}

function playAgain() {
    gCurrQuestIdx = 0;
    renderQuest();
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