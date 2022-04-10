/* Calculator memory */

let runningVal = "";
let a = "";
let b = "";
let firstOp = "";
let nextOp = "";
let storedOp = "";
let currentValActive = false;


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
    if (currentValActive === true) {
        clearNumDisplay();
        currentValActive = false;
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
    nextOp = "";
    currentValActive = false;

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
        a = numDisplayStr; // Grab inputted first value
        firstOp = this.textContent;
        updateFormulaDisplay(a, firstOp, b);
        currentValActive = true; // Allow the next value to override the first value shown in the display
    } else if (currentValActive === true) { // If user changes the operator without inputting a new value
        firstOp = this.textContent;
        updateFormulaDisplay(a, firstOp, "");
    } else { // For subsequent values where a following calculation is expected
        if (this.textContent === "="){ // Handle equals operator separately
            processEquals(numDisplayStr);
        } else { // Process all other operators
            b = numDisplayStr;
            operate(a, firstOp, b);
            nextOp = this.textContent; // Store the next operator
            numDisplay.textContent = runningVal;
            updateFormulaDisplay(runningVal, nextOp, ""); // Update display with the next operator

            // Prepare inputs for the next calculation
            a = runningVal;
            firstOp = nextOp;
            currentValActive = true; 
        }
    }
}

function processEquals(numDisplayStr){

    const numDisplay = document.querySelector('.numDisplay');
    if (firstOp !== "="){
        b = numDisplay.textContent;
        operate(a, firstOp, b);
        updateFormulaDisplay(a, firstOp, b);
        numDisplay.textContent = runningVal;
        a = runningVal;
        storedOp = firstOp;
        firstOp = "=";
    } else {
        updateFormulaDisplay(a, storedOp, b);
        operate(a, storedOp, b);
        numDisplay.textContent = runningVal;
        a = runningVal;
    }

}

function test(){

    // Unit test
    // Clickc buttons in order of:  5 x 5 - 1 = = = = = - x 10

    const numDisplay = document.querySelector('.numDisplay');

    const fiveBtn = document.querySelector('.five.btn');
    fiveBtn.click();

    const multiplyOp = document.querySelector('.multiply.op');
    multiplyOp.click();

    fiveBtn.click();

    const subtractOp = document.querySelector('.subtract.op');
    subtractOp.click();

    const oneBtn = document.querySelector('.one.btn');
    oneBtn.click();

    const equalOp = document.querySelector('.equal.op');
    equalOp.click();
    equalOp.click();
    equalOp.click();
    equalOp.click();
    equalOp.click();

    subtractOp.click();
    multiplyOp.click();

    const zeroBtn = document.querySelector('.zero.btn');
    oneBtn.click();
    zeroBtn.click();

    equalOp.click();

    console.log(`Expected: 200, actual: ${numDisplay.textContent}`);
}


