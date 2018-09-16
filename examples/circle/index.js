
import Vector2 from "../../dist/Vector2.js";
import Circle from "../../dist/Circle.js";

let canvas = document.getElementById('canvas');
let inputs = document.querySelectorAll('input[data-prop]');
let context = canvas.getContext('2d');
let mousePosition = new Vector2();

let circle = new Circle(canvas.width / 2, canvas.height / 2, canvas.height / 2 - 30);

for (let input of inputs) {
    input.value = circle[input.dataset.prop].toString();
    input.addEventListener('input', () =>
    {
        circle[input.dataset.prop] = parseInt(input.value);
        for (let input of inputs) {
            input.value = circle[input.dataset.prop].toString();
        }
    });
}

canvas.addEventListener('pointermove', (event) => mousePosition.set({x: event.offsetX, y: event.offsetY}));

function update()
{
    requestAnimationFrame(update);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = circle.contains(mousePosition) ? 'blue' : 'cyan';
    context.strokeStyle = 'navy';
    context.beginPath();
    context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
    context.fill();
    context.stroke();
}
update();