/* Calculator memory */
let opSelected = false;
let runningVal = 0;

/* User input handler */

function operate(op, a, b){
    let val;
    switch (op){
        case "+":
            val = add(a,b);
            break;
        case "-":
            val = subtract(a,b);
            break;
        case "x":
            val = multiply(a,b);
            break;
        case "÷":
            val = divide(a,b);
            break;
    }
    console.log(val);
    const output = document.querySelector('.output');
    output.innerText = val;
}


/* Calculator functions */

function add(a, b){
    return a + b;
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


// Set keypad button listeners

const btns = document.querySelectorAll(".btn");
btns.forEach((btn) => {
    btn.addEventListener('mouseover', changeColor);
    btn.addEventListener('mouseleave', changeColor);
    btn.addEventListener('click', updateOutput);
})


// Set equal key listener

const equal = document.querySelector('.equal.btn');
equal.addEventListener('click', operate);

// Set operator key listeners

const ops = document.querySelectorAll('.plus.btn, .subtract.btn, .multiply.btn, .divide.btn');
ops.forEach((op)=>{
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
clearBtn.addEventListener('click', clear);

// TODO: Add delete button functionality

// Update display output with key value

function updateOutput(){
    const output = document.querySelector('.output');
    const currentText = this.textContent;
    output.innerText += currentText;
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

// Clear field

function clear(){
    const output = document.querySelector('.output');
    output.innerText = "";
}

// Store memory

function parseInput(){

    const output = document.querySelector('.output');
    outputStr = output.textContent;

    // If it is the first time an operator button is pressed, allow second value to be inputted
    if (!opSelected){
        opSelected = true;
    } else{
        // When a second value is inputted, perform the calculation
        let op = this.textContent;
        let opPos = outputStr.indexOf(op);
        let a = outputStr.slice(0, opPos);
        let b = outputStr.slice(opPos + 1, outputStr.length - 1);
        // console.log(`opPos: ${opPos}, a: ${a}, b: ${b}`);
        operate(op, a, b);
    }


}