import Rectangle, {RectangleTuple} from './Rectangle';

export default class RectangleView extends Rectangle {
    public static readonly LENGTH = 4;
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

    get width(): number {
        return this.data[this.offset + 2];
    }

    set width(value: number) {
        this.data[this.offset + 2] = value;
    }

    get height(): number {
        return this.data[this.offset + 3];
    }

    set height(value: number) {
        this.data[this.offset + 3] = value;
    }

    public copy(): RectangleView {
        return new RectangleView(this.data, this.offset);
    }

    public static fromTuple(tuple: RectangleTuple): RectangleView {
        return new RectangleView(tuple);
    }
}
