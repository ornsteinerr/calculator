const btns = document.querySelectorAll(".divide.btn");

btns.forEach((btn) => {
    addEventListener('mouseover', changeColor());
})

function changeColor(){
    this.style.backgroundColor = "rgb(255, 255, 255)";
    console.log('triggered');
}

