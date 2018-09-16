import Vector2 from "./Vector2.js";
export default class Vector2View extends Vector2 {
    readonly data: Array<number>;
    readonly offset: number;
    constructor(data: Array<number>, offset?: number);
    x: number;
    y: number;
}
