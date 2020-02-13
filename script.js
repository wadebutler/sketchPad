const canvas = document.querySelector("#sketchpad");
const context = canvas.getContext("2d");
let painting = false; 
const clear = document.querySelector(".clear");

window.addEventListener("load", () => {
    responsive();
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startPosition);
    canvas.addEventListener("touchend", finishedPosition);
    canvas.addEventListener("touchmove", draw);
    clear.addEventListener("click", clearCanvas);
});

window.addEventListener("change", () => {
    context.strokeStyle = document.querySelector(".color").value;
})

window.addEventListener("resize", () => {
    responsive();
})

const startPosition = () => {
    painting = true;
    draw(event);
}

const finishedPosition = () => {
    painting = false;
    context.beginPath();
}

const draw = (event) => {
    if(!painting) return;
    context.lineWidth = document.querySelector(".size").value;
    context.lineCap = "round";

    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
}

const responsive = () => {
    canvas.height = window.innerHeight - 50;
    canvas.width = window.innerWidth - 50;
}

const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
}