
import Vector2 from "../../dist/Vector2.js";
import Polygon from "../../dist/Polygon.js";

let canvas = document.getElementById('canvas');
let inputs = document.querySelectorAll('input[data-prop]');
let context = canvas.getContext('2d');
let mousePosition = new Vector2();

let poly = new Polygon([
    new Vector2(40, 60),
    new Vector2(100, 20),
    new Vector2(350, 200),
    new Vector2(240, 340),
    new Vector2(140, 280)
]);

for (let input of inputs) {
    input.value = poly[input.dataset.prop].toString();
    input.addEventListener('input', () =>
    {
        poly[input.dataset.prop] = parseInt(input.value);
        for (let input of inputs) {
            input.value = poly[input.dataset.prop].toString();
        }
    });
}

canvas.addEventListener('pointermove', (event) => mousePosition.set({x: event.offsetX, y: event.offsetY}));

function update()
{
    requestAnimationFrame(update);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = poly.contains(mousePosition) ? 'blue' : 'cyan';
    context.strokeStyle = 'navy';
    context.beginPath();
    let last = null;
    for (let i = 0, len = poly.vertices.length; i < len; i++) {
        let vec2 = poly.vertices[i];
        if (last === null) {
            context.moveTo(vec2.x, vec2.y);
        } else {
            context.lineTo(vec2.x, vec2.y);
        }
        last = vec2;
    }
    context.closePath();
    context.fill();
    context.stroke();

    //Draw medians
    let medians = poly.edgeCenters;
    for (let i = 0, len = medians.length; i < len; i++) {
        context.fillStyle = 'orange';
        context.beginPath();
        context.arc(medians[i].x, medians[i].y, 5, 0, 2 * Math.PI, false);
        context.fill();

        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(medians[i].x, medians[i].y);
        let target = medians[i].copy().moveBy(30, poly.edgeNormals[i]);
        context.lineTo(target.x, target.y);
        context.stroke();
    }
}
update();