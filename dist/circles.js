"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const vectors_1 = require("./vectors");
const { PI, sqrt } = Math;
class Circle {
    constructor(cx, cy, radius) {
        this.cx = 0;
        this.cy = 0;
        this.radius = 0;
        if (typeof cx !== 'undefined') {
            this.cx = cx;
        }
        if (typeof cy !== 'undefined') {
            this.cy = cy;
        }
        if (typeof radius !== 'undefined') {
            this.radius = radius;
        }
    }
    get area() {
        return this.radius * this.radius * PI;
    }
    get center() {
        return new vectors_1.Vector2(this.cx, this.cy);
    }
    set center(vec2) {
        this.cx = vec2.x;
        this.cy = vec2.y;
    }
    set(rect) {
        if (typeof rect.cx !== 'undefined') {
            this.cx = rect.cx;
        }
        if (typeof rect.cy !== 'undefined') {
            this.cy = rect.cy;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius = rect.radius;
        }
        return this;
    }
    add(rect) {
        if (typeof rect.cx !== 'undefined') {
            this.cx += rect.cx;
        }
        if (typeof rect.cy !== 'undefined') {
            this.cy += rect.cy;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius += rect.radius;
        }
        return this;
    }
    subtract(rect) {
        if (typeof rect.cx !== 'undefined') {
            this.cx -= rect.cx;
        }
        if (typeof rect.cy !== 'undefined') {
            this.cy -= rect.cy;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius -= rect.radius;
        }
        return this;
    }
    multiply(rect) {
        if (typeof rect.cx !== 'undefined') {
            this.cx *= rect.cx;
        }
        if (typeof rect.cy !== 'undefined') {
            this.cy *= rect.cy;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius *= rect.radius;
        }
        return this;
    }
    divide(rect) {
        if (typeof rect.cx !== 'undefined') {
            this.cx /= rect.cx;
        }
        if (typeof rect.cy !== 'undefined') {
            this.cy /= rect.cy;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius /= rect.radius;
        }
        return this;
    }
    copy() {
        return Circle.fromLiteral(this);
    }
    contains(vec2) {
        return sqrt((vec2.x - this.cx) * (vec2.x - this.cx) + (vec2.y - this.cy) * (vec2.y - this.cy)) < this.radius;
    }
    // @ts-ignore
    overlapsEdge(edge) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    intersectEdge(edge) {
        throw new Error('Not implemented');
    }
    overlapsRectangle(rect) {
        const v = new vectors_1.Vector2(common_1.clamp(rect.left, this.cx, rect.right), common_1.clamp(rect.top, this.cy, rect.bottom));
        const direction = this.center.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }
    // @ts-ignore
    intersectRectangle(rect) {
        throw new Error('Not implemented');
    }
    overlapsCircle(circle) {
        const distanceX = this.cx - circle.cx;
        const distanceY = this.cy - circle.cy;
        const radiusSum = this.radius + circle.radius;
        return distanceX * distanceX + distanceY * distanceY <= radiusSum * radiusSum;
    }
    // @ts-ignore
    intersectCircle(circle) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    overlapsPolygon(poly) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    intersectPolygon(poly) {
        throw new Error('Not implemented');
    }
    toTuple() {
        return [this.cx, this.cy, this.radius];
    }
    toLiteral() {
        return { cx: this.cx, cy: this.cy, radius: this.radius };
    }
    toString() {
        return `circle(${this.cx.toFixed(2)}, ${this.cy.toFixed(2)}, ${this.radius.toFixed(2)})`;
    }
    static fromTuple(tuple) {
        return new Circle(...tuple);
    }
    static fromLiteral(literal) {
        return new Circle(literal.cx, literal.cy, literal.radius);
    }
}
exports.Circle = Circle;
class CircleView extends Circle {
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
exports.CircleView = CircleView;
CircleView.SIZE = 3;
