"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rectangle_1 = __importDefault(require("./Rectangle"));
class RectangleView extends Rectangle_1.default {
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
    copy() {
        return new RectangleView(this.data, this.offset);
    }
    static fromTuple(tuple) {
        return new RectangleView(tuple);
    }
}
RectangleView.LENGTH = 4;
exports.default = RectangleView;
