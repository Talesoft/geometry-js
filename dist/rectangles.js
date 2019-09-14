"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const edges_1 = require("./edges");
const polygons_1 = require("./polygons");
const vectors_1 = require("./vectors");
class Rectangle {
    constructor(x, y, width, height) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        if (typeof x !== 'undefined') {
            this.x = x;
        }
        if (typeof y !== 'undefined') {
            this.y = y;
        }
        if (typeof width !== 'undefined') {
            this.width = width;
        }
        if (typeof height !== 'undefined') {
            this.height = height;
        }
    }
    get area() {
        return this.width * this.height;
    }
    get position() {
        return new vectors_1.Vector2(this.x, this.y);
    }
    set position(vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }
    get size() {
        return new vectors_1.Vector2(this.width, this.height);
    }
    set size(vec2) {
        this.width = vec2.x;
        this.height = vec2.y;
    }
    get center() {
        return new vectors_1.Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }
    set center(vec2) {
        this.x = vec2.x - this.width / 2;
        this.y = vec2.y - this.height / 2;
    }
    get left() {
        return this.x;
    }
    set left(value) {
        this.width += this.left - value;
        this.x = value;
    }
    get right() {
        return this.x + this.width;
    }
    set right(value) {
        this.width -= this.right - value;
    }
    get top() {
        return this.y;
    }
    set top(value) {
        this.height += this.top - value;
        this.y = value;
    }
    get bottom() {
        return this.y + this.height;
    }
    set bottom(value) {
        this.height -= this.bottom - value;
    }
    get leftTop() {
        return new vectors_1.Vector2(this.left, this.top);
    }
    set leftTop(vec2) {
        this.left = vec2.x;
        this.top = vec2.y;
    }
    get rightTop() {
        return new vectors_1.Vector2(this.right, this.top);
    }
    set rightTop(vec2) {
        this.right = vec2.x;
        this.top = vec2.y;
    }
    get leftBottom() {
        return new vectors_1.Vector2(this.left, this.bottom);
    }
    set leftBottom(vec2) {
        this.left = vec2.x;
        this.bottom = vec2.y;
    }
    get rightBottom() {
        return new vectors_1.Vector2(this.left, this.bottom);
    }
    set rightBottom(vec2) {
        this.right = vec2.x;
        this.bottom = vec2.y;
    }
    get leftEdge() {
        return new edges_1.Edge(this.leftBottom, this.leftTop);
    }
    get rightEdge() {
        return new edges_1.Edge(this.rightTop, this.rightBottom);
    }
    get topEdge() {
        return new edges_1.Edge(this.leftTop, this.rightTop);
    }
    get bottomEdge() {
        return new edges_1.Edge(this.rightBottom, this.leftBottom);
    }
    get vertices() {
        return [this.leftTop, this.rightTop, this.rightBottom, this.leftBottom];
    }
    get edges() {
        return [this.leftEdge, this.topEdge, this.rightEdge, this.bottomEdge];
    }
    set(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x = rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y = rect.y;
        }
        if (typeof rect.width !== 'undefined') {
            this.width = rect.width;
        }
        if (typeof rect.height !== 'undefined') {
            this.height = rect.height;
        }
        return this;
    }
    add(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x += rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y += rect.y;
        }
        if (typeof rect.width !== 'undefined') {
            this.width += rect.width;
        }
        if (typeof rect.height !== 'undefined') {
            this.height += rect.height;
        }
        return this;
    }
    subtract(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x -= rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y -= rect.y;
        }
        if (typeof rect.width !== 'undefined') {
            this.width -= rect.width;
        }
        if (typeof rect.height !== 'undefined') {
            this.height -= rect.height;
        }
        return this;
    }
    multiply(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x *= rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y *= rect.y;
        }
        if (typeof rect.width !== 'undefined') {
            this.width *= rect.width;
        }
        if (typeof rect.height !== 'undefined') {
            this.height *= rect.height;
        }
        return this;
    }
    divide(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x /= rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y /= rect.y;
        }
        if (typeof rect.width !== 'undefined') {
            this.width /= rect.width;
        }
        if (typeof rect.height !== 'undefined') {
            this.height /= rect.height;
        }
        return this;
    }
    expand(vec2) {
        if (vec2.x < this.left) {
            this.left = vec2.x;
        }
        if (vec2.x > this.right) {
            this.right = vec2.x;
        }
        if (vec2.y < this.top) {
            this.top = vec2.y;
        }
        if (vec2.y > this.bottom) {
            this.bottom = vec2.y;
        }
        return this;
    }
    copy() {
        return Rectangle.fromLiteral(this);
    }
    contains(vec2) {
        return (vec2.x >= this.x) && (vec2.x < this.right) && (vec2.y >= this.y) && (vec2.y < this.bottom);
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
        return (rect.right > this.x && rect.x < this.right && rect.bottom > this.right && rect.y < this.bottom);
    }
    // @ts-ignore
    intersectRectangle(rect) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    overlapsCircle(circle) {
        const v = new vectors_1.Vector2(common_1.clamp(this.left, circle.cx, this.right), common_1.clamp(this.top, circle.cy, this.bottom));
        const direction = circle.center.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < circle.radius * circle.radius));
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
        return [this.x, this.y, this.width, this.height];
    }
    toLiteral() {
        return { x: this.x, y: this.y, width: this.width, height: this.height };
    }
    toPolygon() {
        return new polygons_1.Polygon(this.vertices);
    }
    toString() {
        return `rect(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.width.toFixed(2)}, ${this.height.toFixed(2)})`;
    }
    static fromTuple(tuple) {
        return new Rectangle(...tuple);
    }
    static fromLiteral(literal) {
        return new Rectangle(literal.x, literal.y, literal.width, literal.height);
    }
}
exports.Rectangle = Rectangle;
class RectangleView extends Rectangle {
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
}
exports.RectangleView = RectangleView;
RectangleView.LENGTH = 4;
