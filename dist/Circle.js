"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const Vector2_1 = __importDefault(require("./Vector2"));
const { PI, sqrt } = Math;
class Circle {
    constructor(x, y, radius) {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        if (typeof x !== 'undefined') {
            this.x = x;
        }
        if (typeof y !== 'undefined') {
            this.y = y;
        }
        if (typeof radius !== 'undefined') {
            this.radius = radius;
        }
    }
    get area() {
        return this.radius * this.radius * PI;
    }
    get position() {
        return new Vector2_1.default(this.x, this.y);
    }
    set position(vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }
    set(rect) {
        if (typeof rect.x !== 'undefined') {
            this.x = rect.x;
        }
        if (typeof rect.y !== 'undefined') {
            this.y = rect.y;
        }
        if (typeof rect.radius !== 'undefined') {
            this.radius = rect.radius;
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
        if (typeof rect.radius !== 'undefined') {
            this.radius += rect.radius;
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
        if (typeof rect.radius !== 'undefined') {
            this.radius -= rect.radius;
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
        if (typeof rect.radius !== 'undefined') {
            this.radius *= rect.radius;
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
        if (typeof rect.radius !== 'undefined') {
            this.radius /= rect.radius;
        }
        return this;
    }
    copy() {
        return new Circle(this.x, this.y, this.radius);
    }
    contains(vec2) {
        return sqrt((vec2.x - this.x) * (vec2.x - this.x) + (vec2.y - this.y) * (vec2.y - this.y)) < this.radius;
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
        const v = new Vector2_1.default(common_1.clamp(rect.left, this.x, rect.right), common_1.clamp(rect.top, this.y, rect.bottom));
        const direction = this.position.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }
    // @ts-ignore
    intersectRectangle(rect) {
        throw new Error('Not implemented');
    }
    overlapsCircle(circle) {
        const distanceX = this.x - circle.x;
        const distanceY = this.y - circle.y;
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
        return [this.x, this.y, this.radius];
    }
    toString() {
        return `circle(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.radius.toFixed(2)})`;
    }
    static fromTuple(tuple) {
        return new Circle(...tuple);
    }
}
exports.default = Circle;
