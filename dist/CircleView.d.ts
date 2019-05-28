import Circle from './Circle';
export default class CircleView extends Circle {
    readonly data: number[];
    readonly offset: number;
    constructor(data: number[], offset?: number);
    x: number;
    y: number;
    radius: number;
}
