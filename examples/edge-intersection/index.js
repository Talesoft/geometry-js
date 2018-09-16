
import Edge from "../../dist/Edge.js";
import Vector2 from "../../dist/Vector2.js";

let canvas = document.getElementById('canvas');
let intersectText = document.getElementById('intersectText');
let inputs = document.querySelectorAll('input[data-for]');
let rayCheckbox = document.getElementById('rayCheckbox');
let context = canvas.getContext('2d');

let edgeAFrom = new Vector2(10, 10);
let edgeATo = new Vector2(canvas.width - 10, canvas.height - 10);
let edgeBFrom = new Vector2(10, canvas.height - 10);
let edgeBTo = new Vector2(canvas.width - 10, 10);

let edgeA = new Edge(edgeAFrom, edgeATo);
let edgeB = new Edge(edgeBFrom, edgeBTo);
let ray = false;

for (let input of inputs) {
    let edge = input.dataset.for === 'edgeA' ? edgeA : edgeB;
    input.value = edge[input.dataset.vec][input.dataset.prop].toString();
    input.addEventListener('input', () =>
    {
        edge[input.dataset.vec][input.dataset.prop] = parseInt(input.value);
    });
}

rayCheckbox.addEventListener('input', () => ray = rayCheckbox.checked);

function drawEdge(edge, color)
{
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(edge.from.x, edge.from.y);
    context.lineTo(edge.to.x, edge.to.y);
    context.stroke();
}

function update()
{
    requestAnimationFrame(update);

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    let vec2 = edgeA.intersectEdge(edgeB, ray);
    intersectText.innerText = vec2 === null ? 'None' : `At ${vec2}`;

    if (vec2) {
        context.fillStyle = 'orange';
        context.beginPath();
        context.arc(vec2.x, vec2.y, 10, 0, 2 * Math.PI, false);
        context.fill();
    }

    //Draw edgeA
    drawEdge(edgeA, 'red');
    drawEdge(edgeB, 'blue');
}
update();