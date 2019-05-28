import Circle from './Circle';

export default class CircleView extends Circle {
    public readonly data: number[];
    public readonly offset: number;

    constructor(data: number[], offset: number = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }

    get x(): number {
        return this.data[this.offset];
    }

    set x(value: number) {
        this.data[this.offset] = value;
    }

    get y(): number {
        return this.data[this.offset + 1];
    }

    set y(value: number) {
        this.data[this.offset + 1] = value;
    }

    get radius(): number {
        return this.data[this.offset + 2];
    }

    set radius(value: number) {
        this.data[this.offset + 2] = value;
    }
}
