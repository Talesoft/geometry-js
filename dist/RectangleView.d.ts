import Rectangle from "./Rectangle.js";
export default class RectangleView extends Rectangle {
    readonly data: Array<number>;
    readonly offset: number;
    constructor(data: Array<number>, offset?: number);
    x: number;
    y: number;
    width: number;
    height: number;
}
