
import Rectangle from "../../dist/Rectangle.js";
import Vector2 from "../../dist/Vector2.js";

let canvas = document.getElementById('canvas');
let inputs = document.querySelectorAll('input[data-prop]');
let context = canvas.getContext('2d');
let mousePosition = new Vector2();

let rect = new Rectangle(30, 30, canvas.width - 60, canvas.height - 60);

for (let input of inputs) {
    input.value = rect[input.dataset.prop].toString();
    input.addEventListener('input', () =>
    {
        rect[input.dataset.prop] = parseInt(input.value);
        for (let input of inputs) {
            input.value = rect[input.dataset.prop].toString();
        }
    });
}

canvas.addEventListener('pointermove', (event) => mousePosition.set({x: event.offsetX, y: event.offsetY}));

function update()
{
    requestAnimationFrame(update);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = rect.contains(mousePosition) ? 'blue' : 'cyan';
    context.strokeStyle = 'navy';
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}
update();