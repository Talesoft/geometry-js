import Rectangle, { RectangleTuple } from './Rectangle';
export default class RectangleView extends Rectangle {
    static readonly LENGTH = 4;
    readonly data: number[];
    readonly offset: number;
    constructor(data: number[], offset?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    copy(): RectangleView;
    static fromTuple(tuple: RectangleTuple): RectangleView;
}
