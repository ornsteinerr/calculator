/* Calculator memory */

let runningVal = "";
let a = "";
let b = "";
let currentOp = "";

/* Perform a calculation */

function operate(op, a, b){
    switch (op){
        case "+":
            runningVal = add(a,b);
            break;
        case "-":
            runningVal = subtract(a,b);
            break;
        case "x":
            runningVal = multiply(a,b);
            break;
        case "÷":
            runningVal = divide(a,b);
            break;
    }
    // TODO: Clean up flags and reset numDisplay field
}


/* Calculator functions */

function add(a, b){
    return parseInt(a) + parseInt(b);
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

// TODO: Add button click change color effect

/* Listeners */ 

// Set keypad button listeners

const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener('mouseover', changeColor);
    btn.addEventListener('mouseleave', changeColor);
    btn.addEventListener('click', updateNumDisplay);
})


// Set operator key listeners

const ops = document.querySelectorAll('.op');
ops.forEach((op)=>{
    op.addEventListener('mouseover', changeColor);
    op.addEventListener('mouseleave', changeColor);
    op.addEventListener('click', parseInput);
})

// Set extra key listeners

const eBtns = document.querySelectorAll('.eBtn');
eBtns.forEach((eBtn) => {
    eBtn.addEventListener('mouseover', changeColor);
    eBtn.addEventListener('mouseleave', changeColor);
})

// Set clear key listener

const clearBtn = document.querySelector('.clear.eBtn');
clearBtn.addEventListener('click', clearAll);

// TODO: Add delete button functionality

// Update display numDisplay with key value

function updateNumDisplay(){
    const numDisplay = document.querySelector('.numDisplay');
    const currentText = this.textContent;
    numDisplay.innerText += currentText;

}
// Update formula display

function updateFormulaDisplay(a, op, b) {
    const formulaDisplay = document.querySelector('.formulaDisplay');
    formulaDisplay.textContent = `${a} ${op} ${b}`;
}

// Change button color on hover and leave 

function changeColor(e){
    if (e.type === 'mouseover'){
        this.style.backgroundColor = "rgb(71, 185, 179)";
    } else if (e.type === 'mouseleave'){
        const bodyColor = document.querySelector('body').style.backgroundColor;
        this.style.backgroundColor = bodyColor;
    }
}

// Clear the input display

function clearNumDisplay(){
    const numDisplay = document.querySelector('.numDisplay');
    numDisplay.innerText = "";
}

// Restart from clean slate

function clearAll(){

    // Wipe variables
    a = "";
    b = "";
    runningVal = 0;

    // Wipe display
    clearNumDisplay();
    updateFormulaDisplay("","","");
}


// Parse inputted values when an operator is pressed

function parseInput(){

    // Grab user inputted text displayed in the numDisplay field
    const numDisplay = document.querySelector('.numDisplay');
    numDisplayStr = numDisplay.textContent;

    if (numDisplayStr === "" && a === ""){ 
        // Exit if user clicks on an operator without first inputting a value
        return;
    } else if (a === ""){ // Take first value on clean slate
        a = numDisplayStr;
        runningVal = 0;
        currentOp = this.textContent;
        updateFormulaDisplay(a, currentOp, b);
        clearNumDisplay();
    } else { // On subsequent calculations, perform calculation on running total

        if (b === ""){
            currentOp = this.textContent;
            updateFormulaDisplay(a, currentOp, b);
        } else {
            operate(currentOp, a, b);
            currentOp = this.textContent;
            b = "";
            a = runningVal;
            updateFormulaDisplay(runningVal, currentOp, b);
            clearNumDisplay();
        }
        // TODO: Figure out how to handle equals sign operator
    }
}