import Vector2, { Vector2Tuple } from './Vector2';
export default class Vector2View extends Vector2 {
    static readonly LENGTH = 2;
    readonly data: number[];
    readonly offset: number;
    constructor(data: number[], offset?: number);
    x: number;
    y: number;
    copy(): Vector2View;
    static fromTuple(tuple: Vector2Tuple): Vector2View;
}
