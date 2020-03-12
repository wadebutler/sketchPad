const canvas = document.querySelector("#sketchpad");
const context = canvas.getContext("2d");
let painting = false; 
const clear = document.querySelector(".clear");
const screenWidth = window.matchMedia("(max-width: 900px)");

// let erasing = false;

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

// canvas heigth and width
const setCanvasDimensions = () => {
    canvas.height = window.innerHeight - 185;
    canvas.width = window.innerWidth - 400;

    if (screenWidth.matches) {
        canvas.height = window.innerHeight - 210;
        canvas.width = window.innerWidth - 40;
    }
}

// drawing code
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
    } else {
        drawOnDesktop(event);
    }
}

// turn on eraser tool
const eraser = () => {
    context.globalCompositeOperation = 'destination-out';
}

// turn on pen tool
const pen = () => {
    context.globalCompositeOperation = "source-over";
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