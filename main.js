
// TODO: Add button click change color effect

// Change button color on hover and leave

const btns = document.querySelectorAll('.btn');

btns.forEach((btn) => {
    btn.addEventListener('mouseover', changeColor);
    btn.addEventListener('mouseleave', changeColor);
})

function changeColor(e){
    if (e.type === "mouseover"){
        this.style.backgroundColor = "rgb(71, 185, 179)";
    } else if (e.type === "mouseleave"){
        const bodyColor = document.querySelector('body').style.backgroundColor;
        this.style.backgroundColor = bodyColor;
    }


}

