import Circle from "./Circle.js";
export default class CircleView extends Circle {
    constructor(data, offset = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }
    get x() {
        return this.data[this.offset];
    }
    set x(value) {
        this.data[this.offset] = value;
    }
    get y() {
        return this.data[this.offset + 1];
    }
    set y(value) {
        this.data[this.offset + 1] = value;
    }
    get radius() {
        return this.data[this.offset + 2];
    }
    set radius(value) {
        this.data[this.offset + 2] = value;
    }
}
//# sourceMappingURL=CircleView.js.map