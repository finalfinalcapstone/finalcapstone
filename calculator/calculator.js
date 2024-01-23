"use strict"


window.onload = init; 

function init(){
    var addBtn = document.getElementById("addBtn");
    addBtn.onclick = onAddBtnClicked;

    var subBtn = document.getElementById("subBtn");
    subBtn.onclick = onSubBtnClicked;

    var multiplyBtn = document.getElementById("multiplyBtn");
    multiplyBtn.onclick = onMultiplyBtn;

    var divisionBtn = document.getElementById("divisionBtn");
    divisionBtn.onclick = onDivisionBtn;

}

// add button -- 
function onAddBtnClicked(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

   var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 + number2;
    answerField.value = sum;
}

// sub button -- 
function onSubBtnClicked(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 - number2;
    answerField.value = sum;
}

function onMultiplyBtn(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 * number2;

    answerField.value = sum;
}

function onDivisionBtn(){
    var num1Text = document.getElementById("number1Text");
    var num2Text = document.getElementById("number2Text");
    var answerField = document.getElementById("answerField");

    var number1 = Number(num1Text.value);
    var number2 = Number(num2Text.value);
    
    var sum = number1 / number2;
    
    answerField.value = sum;
}