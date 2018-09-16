import Rectangle from "./Rectangle.js";
export default class RectangleView extends Rectangle {
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
    get width() {
        return this.data[this.offset + 2];
    }
    set width(value) {
        this.data[this.offset + 2] = value;
    }
    get height() {
        return this.data[this.offset + 3];
    }
    set height(value) {
        this.data[this.offset + 3] = value;
    }
}
//# sourceMappingURL=RectangleView.js.map