import Vector2, { Vector2Tuple } from './Vector2';

export default class Vector2View extends Vector2 {
    public static readonly LENGTH = 2;
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

    public copy(): Vector2View {
        return new Vector2View(this.data, this.offset);
    }

    public static fromTuple(tuple: Vector2Tuple): Vector2View {
        return new Vector2View(tuple);
    }
}
