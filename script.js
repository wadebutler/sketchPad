const canvas = document.querySelector("#sketchpad");
const context = canvas.getContext("2d");
let painting = false; 
const clear = document.querySelector(".clear");

// run on load
window.addEventListener("load", () => {
    setCanvasDimensions();
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", finishedPosition);
    canvas.addEventListener("touchmove", draw);
    clear.addEventListener("click", clearCanvas);
});

window.addEventListener("resize", () => {
    setCanvasDimensions();
})

const startPosition = () => {
    painting = true;
    draw(event);
}

const finishedPosition = () => {
    painting = false;
    context.beginPath();
}

const drawOnDesktop = (event) => {
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
}

const drawOnMobile = (event) => {
    context.lineTo(event.touches[0].clientX, event.touches[0].clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(event.touches[0].clientX, event.touches[0].clientY);
}

const draw = (event) => {
    if(!painting) return;
    context.lineWidth = document.querySelector(".size").value;
    context.strokeStyle = document.querySelector(".color").value;
    context.lineCap = "round";

    if(event.touches) {
        drawOnMobile(event);
        console.log('mobile')
    } else {
        drawOnDesktop(event);
        console.log('desktop')
    }

}

// canvas heigth/width
const setCanvasDimensions = () => {
    canvas.height = window.innerHeight - 185;
    canvas.width = window.innerWidth - 20;
}
// canvas delete button
const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

//prevent scrolling/page refresh when drawing
window.addEventListener("touchstart", (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });
window.addEventListener("touchend", (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });

window.addEventListener("touchmove", (event) => {
    if (event.target === canvas) {
        event.preventDefault();
    }
}, { passive: false });