/* Calculator memory */

let runningVal = "";
let a = "";
let b = "";
let firstOp = "";
let secondOp = "";
let needsCleaning = false;

/* Perform a calculation */

function operate(a, op, b){
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
    op.addEventListener('click', parseCalculation);
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
    if (needsCleaning === true) {
        clearNumDisplay();
        needsCleaning = false;
        numDisplay.innerText += currentText;
    } else {
        numDisplay.innerText += currentText;
    }

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
    runningVal = "";
    a = "";
    b = "";
    firstOp = "";
    secondOp = "";
    needsCleaning = false;

    // Wipe display
    clearNumDisplay();
    updateFormulaDisplay("","","");
}


// Parse inputted values when an operator is pressed

function parseCalculation(){

    const numDisplay = document.querySelector('.numDisplay');
    const numDisplayStr = numDisplay.textContent;
    
    if (numDisplayStr === "" && a === ""){ // If user presses an operator without inputting a value
        return;
    } else if (firstOp === ""){ // If the very first value is being inputted and an operator is pressed
        a = numDisplayStr;
        firstOp = this.textContent;
        console.log("triggered");
        updateFormulaDisplay(a, firstOp, b);
        needsCleaning = true; // Allow the next value to override the first value shown in the display
    } else { // For subsequent values where a following calculation is expected
        b = numDisplayStr;
        operate(a, firstOp, b);
        nextOp = this.textContent; // Store the next operator
        numDisplay.textContent = runningVal;
        if (this.textContent === "="){ // If equals operator is pressed
            if (firstOp === "="){
                return;
            }
            // Update formula display with full formula
            updateFormulaDisplay(a, firstOp, b); // Update display with the next operator
            a = runningVal;
            firstOp = "";
            b = "";
        } else {
            updateFormulaDisplay(runningVal, nextOp, ""); // Update display with the next operator
            needsCleaning = true;
            a = runningVal; // Prepare inputs for the next calculation
            firstOp = nextOp;
        }
    }

}
