
// Calculator buttons

const acBtn = document.getElementById('clr');
const deleteBtn = document.getElementById('del');
const percentageBtn = document.getElementById('percnt');
const equalstoBtn = document.getElementById('equals');
const operators = document.querySelectorAll('.operator');
const allInt = document.querySelectorAll('.numDigit');
const decimalBtn = document.getElementById('dot');
// Display Screen

//const finalResult = document.getElementById('rcontainer');
const displayResult = document.getElementById('result');
const aggResult = document.getElementById('aggregate');



// Calculator functions

let inputObj = {};
let clearDisp = false;
let repeat = false;


// anyBtn.forEach(elem => {
//    elem.addEventListener('click', () => {

//         const action = elem.dataset.action;
//         const name = elem.dataset.name;

//         if(!action){
//             displayResult.innerText += elem.textContent;
//             aggResult.innerText += elem.innerText;
//         }  else if(action == 'clear') {
//                 acBtn.addEventListener('click', () => {
//                 displayResult.innerText = '';
//                 aggResult.innerText = '';
//         })} else if (action == 'delete') {
//                 let str = displayResult.innerText.split('');
//                 displayResult.innerText = str.slice(0, -1).join('');
//         } else if (name) {
//                 bool = true;
//                 aggResult.textContent += elem.innerText;
//                 inputObj['firstValue'] = displayResult.innerText;
//                 inputObj['operation'] = action;
//         }
//     })
// });

allInt.forEach(elem => {
    elem.addEventListener('click', () => {

        if( displayResult.textContent === '0' || clearDisp){
            displayResult.textContent = '';
            displayResult.textContent += elem.textContent;
            clearDisp = false;
        } else {
            displayResult.textContent += elem.textContent;
        }

        if(inputObj.chosenoperation && !clearDisp) inputObj.secondOperand = displayResult.textContent;
 
    })

 });

 operators.forEach(elem => {
    
    elem.addEventListener('click', () => {
        
        const action = elem.dataset.action;
        if(repeat) aggResult.textContent = '';
        repeat = false;
        if(inputObj.chosenoperation && !inputObj.secondOperand) return;
        if(inputObj.chosenoperation){
             aggResult.textContent += displayResult.textContent;
             aggResult.textContent += ' ' + elem.textContent + ' ';
            let result = calculate(inputObj['firstOperand'], inputObj['chosenoperation'], inputObj['secondOperand']);
            displayResult.innerText = result;
            clearDisp = true;
        } else {
       aggResult.textContent += displayResult.textContent ;
       aggResult.textContent += ' ' + elem.textContent + ' ';
       clearDisp = true; 
     }

       inputObj.chosenoperation = action; 
       inputObj.firstOperand = displayResult.textContent; 
    })
 });
 
decimalBtn.addEventListener('click', () => {

    if( displayResult.innerText.includes(".") || displayResult.innerText === '') return;
        displayResult.innerText += decimalBtn.innerText;
});

percentageBtn.addEventListener('click',  () => {

    const percnt = (int) => {
        return parseFloat(int) / 100;
    }

   if(displayResult.innerText != '') {
        displayResult.innerText = percnt(displayResult.innerText);
        clearDisp = true;
    } 
    if(inputObj.chosenoperation) inputObj.secondOperand = displayResult.innerText;
})

acBtn.addEventListener('click', () => {
    displayResult.textContent = '0';
    aggResult.innerText = '';
    inputObj = {};
    clearDisp = false;
    repeat = false;
});

deleteBtn.addEventListener('click', () => {

    let str = displayResult.innerText.split('');
    displayResult.innerText = str.slice(0, -1).join('');
    if(inputObj['secondOperand']) inputObj['secondOperand'] = displayResult.innerText;

});

// Arithmetic functions

const calculate = (int1, operation, int2) => {
    let firstInt = parseFloat(int1);
    let secondInt = parseFloat(int2);
    let result;
    switch (operation) {
        case 'add': result = firstInt + secondInt;
        break;
        case 'subtract': result = firstInt - secondInt;
        break;
        case 'multiply': result = firstInt * secondInt;
        break;
        case 'divide': result = firstInt / secondInt;
        break;
        default: result = 'Error!';
    } 
    if(isNaN(result) || typeof(result) == undefined) return 'Error!';

    return result;
}

equalstoBtn.addEventListener('click', () => {


  let action = inputObj.chosenoperation;
  let operate;

    switch (action) {
        case 'add': operate = '+'
        break;
        case 'subtract': operate = '-'
        break;
        case 'divide': operate = '÷'
        break;
        case 'multiply': operate = 'x'
        break;
        default: operate;
    }

    if(repeat) {
        inputObj.firstOperand = displayResult.innerText;
        let result = calculate(inputObj['firstOperand'], inputObj['chosenoperation'], inputObj['secondOperand']);
        aggResult.textContent = displayResult.textContent + ' ' + operate + ' ' + inputObj.secondOperand + ' ' + equalstoBtn.textContent ;
        displayResult.innerText = result;
        clearDisp = true;
    }  else {  let result = calculate(inputObj['firstOperand'], inputObj['chosenoperation'], inputObj['secondOperand']);
                aggResult.textContent += `${displayResult.textContent} =  `;
                displayResult.innerText = result;
                clearDisp = true;
                repeat = true; }

})
