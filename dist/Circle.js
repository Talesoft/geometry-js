import Vector2 from "./Vector2.js";
import { clamp } from "./Math.js";
const { PI, sqrt } = Math;
export default class Circle {
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
        return new Vector2(this.x, this.y);
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
    overlapsEdge(edge) {
        throw new Error('Not implemented');
    }
    intersectEdge(edge) {
        throw new Error('Not implemented');
    }
    overlapsRectangle(rect) {
        let v = new Vector2(clamp(rect.left, this.x, rect.right), clamp(rect.top, this.y, rect.bottom));
        let direction = this.position.subtract(v);
        let mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }
    intersectRectangle(rect) {
        throw new Error('Not implemented');
    }
    overlapsCircle(circle) {
        let distanceX = this.x - circle.x;
        let distanceY = this.y - circle.y;
        let radiusSum = this.radius + circle.radius;
        return distanceX * distanceX + distanceY * distanceY <= radiusSum * radiusSum;
    }
    intersectCircle(circle) {
        throw new Error('Not implemented');
    }
    overlapsPolygon(poly) {
        throw new Error('Not implemented');
    }
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
//# sourceMappingURL=Circle.js.map