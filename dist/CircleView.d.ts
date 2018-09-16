import Circle from "./Circle.js";
export default class CircleView extends Circle {
    readonly data: Array<number>;
    readonly offset: number;
    constructor(data: Array<number>, offset?: number);
    x: number;
    y: number;
    radius: number;
}
