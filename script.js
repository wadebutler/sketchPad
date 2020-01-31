const canvas = document.querySelector("#sketchpad");
const context = canvas.getContext("2d");

window.addEventListener("load", () => {
    responsive();
});

window.addEventListener("resize", () => {
    responsive();
})

const responsive = () => {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}