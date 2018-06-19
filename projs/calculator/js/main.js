'use strict'

//global vars
var gNum1 = null;
var gNum2 = null;
var gOp = null;
var gRes = 0;
var gMmemory = null;
var lastNum;
var gResHtml = document.querySelector('.res');


function addDigit(digit) {
    if (gOp == null) {
        if (gNum1 === null) gNum1 = digit
        else gNum1 += '' + digit;
        gNum1 = Number(gNum1);
        console.log(gNum1);
        print(gNum1)
    } else {
        if (gNum2 === null) gNum2 = digit
        else {
            gNum2 += '' + digit
            gNum2 = Number(gNum2);
            console.log(gNum2);
        }
        print(gNum2)
    }
}

function setOp(op) {
    if (op !== '=') gOp = op;
    else {
        gRes = calculate();
        gNum1 = null;
        gNum2 = null;
        gOp = null;
        print(gRes);
    }
    if (gOp === 'MC') gMmemory = null;
    if (gOp === 'C') cleanRes()
    if (gOp === 'MS') gMmemory = Number(gResHtml.innerHTML);
    if (gOp === 'MR') print(gMmemory);
    if (gOp === 'M+') gMmemory += Number(gResHtml.innerHTML);
}

function calculate() {
    var res = 0;
    switch (gOp) {
        case '+':
            res = gNum1 + gNum2;
            break;
        case '-':
            res = gNum1 - gNum2;
            break;
        case '*':
            res = gNum1 * gNum2;
            break;
        case '/':
            res = gNum1 / gNum2;
            break;
    }
    return res
}

function print(num) {
    gResHtml.innerHTML = num;
}

function cleanRes() {
    gResHtml.innerHTML = '';
    gNum1 = null;
    gNum2 = null;
    gRes = 0;
    gOp = null;
}


