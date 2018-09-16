import Vector2 from "./Vector2.js";
import { clamp } from "./Math.js";
import Edge from "./Edge.js";
import Polygon from "./Polygon.js";
export default class Rectangle {
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
        return new Vector2(this.x, this.y);
    }
    set position(vec2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }
    get size() {
        return new Vector2(this.width, this.height);
    }
    set size(vec2) {
        this.width = vec2.x;
        this.height = vec2.y;
    }
    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
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
        return new Vector2(this.left, this.top);
    }
    set leftTop(vec2) {
        this.left = vec2.x;
        this.top = vec2.y;
    }
    get rightTop() {
        return new Vector2(this.right, this.top);
    }
    set rightTop(vec2) {
        this.right = vec2.x;
        this.top = vec2.y;
    }
    get leftBottom() {
        return new Vector2(this.left, this.bottom);
    }
    set leftBottom(vec2) {
        this.left = vec2.x;
        this.bottom = vec2.y;
    }
    get rightBottom() {
        return new Vector2(this.left, this.bottom);
    }
    set rightBottom(vec2) {
        this.right = vec2.x;
        this.bottom = vec2.y;
    }
    get leftEdge() {
        return new Edge(this.leftBottom, this.leftTop);
    }
    get rightEdge() {
        return new Edge(this.rightTop, this.rightBottom);
    }
    get topEdge() {
        return new Edge(this.leftTop, this.rightTop);
    }
    get bottomEdge() {
        return new Edge(this.rightBottom, this.leftBottom);
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
        return new Rectangle(this.x, this.y, this.width, this.height);
    }
    contains(vec2) {
        return (vec2.x >= this.x) && (vec2.x < this.right) && (vec2.y >= this.y) && (vec2.y < this.bottom);
    }
    //TODO: overlapsEdge(edge: Edge): boolean
    //TODO: intersectEdge(edge: Edge): Vector2
    overlapsRectangle(rect) {
        return (rect.right > this.x && rect.x < this.right && rect.bottom > this.right && rect.y < this.bottom);
    }
    //TODO: interesectRectangle(rect: Rectangle): Vector2[]
    overlapsCircle(circle) {
        let v = new Vector2(clamp(this.left, circle.x, this.right), clamp(this.top, circle.y, this.bottom));
        let direction = circle.position.subtract(v);
        let mag = direction.magnitude;
        return ((mag > 0) && (mag < circle.radius * circle.radius));
    }
    //TODO: interesectCircle(circle: Circle): Vector2[]
    //TODO: overlapsPolygon(poly: Polygon): boolean
    //TODO: intersectPolygon(poly: Polygon): Vector2[]
    toTuple() {
        return [this.x, this.y, this.width, this.height];
    }
    toPolygon() {
        return new Polygon(this.vertices);
    }
    toString() {
        return `rect(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.width.toFixed(2)}, ${this.height.toFixed(2)})`;
    }
    static fromTuple(tuple) {
        return new Rectangle(...tuple);
    }
}
//# sourceMappingURL=Rectangle.js.map