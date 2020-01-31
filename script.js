const canvas = document.querySelector("#sketchpad");
const context = canvas.getContext("2d");
let painting = false; 

window.addEventListener("load", () => {
    responsive();
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);
});

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
    context.lineWidth = 10;
    context.lineCap = "round";

    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
}

const responsive = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}