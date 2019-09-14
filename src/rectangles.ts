import { Circle, CircleCollidable } from './circles';
import { clamp } from './common';
import { Edge, EdgeCollidable } from './edges';
import { Polygon, PolygonCollidable } from './polygons';
import { Vector2, Vector2Literal } from './vectors';

export interface RectangleLiteral {
    x: number;
    y: number;
    width: number;
    height: number;
}

export type RectangleTuple = [number, number, number, number];
export type RectangleVertexTuple = [Vector2, Vector2, Vector2, Vector2];
export type RectangleEdgeTuple = [Edge, Edge, Edge, Edge];

export interface RectangleCollidable {
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
}

export class Rectangle implements
    RectangleLiteral,
    EdgeCollidable,
    RectangleCollidable,
    CircleCollidable,
    PolygonCollidable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;

    constructor(x?: number, y?: number, width?: number, height?: number) {
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

    get area(): number {
        return this.width * this.height;
    }

    get position() {
        return new Vector2(this.x, this.y);
    }

    set position(vec2: Vector2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    get size() {
        return new Vector2(this.width, this.height);
    }

    set size(vec2: Vector2) {
        this.width = vec2.x;
        this.height = vec2.y;
    }

    get center() {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }

    set center(vec2: Vector2) {
        this.x = vec2.x - this.width / 2;
        this.y = vec2.y - this.height / 2;
    }

    get left() {
        return this.x;
    }

    set left(value: number) {
        this.width += this.left - value;
        this.x = value;
    }

    get right() {
        return this.x + this.width;
    }

    set right(value: number) {
        this.width -= this.right - value;
    }

    get top() {
        return this.y;
    }

    set top(value: number) {
        this.height += this.top - value;
        this.y = value;
    }

    get bottom() {
        return this.y + this.height;
    }

    set bottom(value: number) {
        this.height -= this.bottom - value;
    }

    get leftTop() {
        return new Vector2(this.left, this.top);
    }

    set leftTop(vec2: Vector2) {
        this.left = vec2.x;
        this.top = vec2.y;
    }

    get rightTop() {
        return new Vector2(this.right, this.top);
    }

    set rightTop(vec2: Vector2) {
        this.right = vec2.x;
        this.top = vec2.y;
    }

    get leftBottom() {
        return new Vector2(this.left, this.bottom);
    }

    set leftBottom(vec2: Vector2) {
        this.left = vec2.x;
        this.bottom = vec2.y;
    }

    get rightBottom() {
        return new Vector2(this.left, this.bottom);
    }

    set rightBottom(vec2: Vector2) {
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
        return [this.leftTop, this.rightTop, this.rightBottom, this.leftBottom] as const;
    }

    get edges() {
        return [this.leftEdge, this.topEdge, this.rightEdge, this.bottomEdge] as const;
    }

    public set(rect: Partial<RectangleLiteral>) {
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

    public add(rect: Partial<RectangleLiteral>) {
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

    public subtract(rect: Partial<RectangleLiteral>) {
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

    public multiply(rect: Partial<RectangleLiteral>) {
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

    public divide(rect: Partial<RectangleLiteral>) {
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

    public expand(vec2: Vector2Literal) {
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

    public copy() {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public contains(vec2: Vector2Literal) {
        return (vec2.x >= this.x) && (vec2.x < this.right) && (vec2.y >= this.y) && (vec2.y < this.bottom);
    }

    // @ts-ignore
    public overlapsEdge(edge: Edge) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectEdge(edge: Edge) {
        throw new Error('Not implemented');
    }

    public overlapsRectangle(rect: Rectangle) {
        return (rect.right > this.x && rect.x < this.right && rect.bottom > this.right && rect.y < this.bottom);
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsCircle(circle: Circle) {
        const v = new Vector2(clamp(this.left, circle.cx, this.right), clamp(this.top, circle.cy, this.bottom));
        const direction = circle.position.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < circle.radius * circle.radius));
    }

    // @ts-ignore
    public intersectCircle(circle: Circle) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsPolygon(poly: Polygon) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectPolygon(poly: Polygon) {
        throw new Error('Not implemented');
    }

    public toTuple() {
        return [this.x, this.y, this.width, this.height] as const;
    }

    public toPolygon() {
        return new Polygon(this.vertices);
    }

    public toString() {
        return `rect(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.width.toFixed(2)}, ${this.height.toFixed(2)})`;
    }

    public static fromTuple(tuple: RectangleTuple) {
        return new Rectangle(...tuple);
    }
}

export class RectangleView extends Rectangle {
    public static readonly LENGTH = 4;
    public readonly data: number[];
    public readonly offset: number;

    constructor(data: number[], offset: number = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }

    get x() {
        return this.data[this.offset];
    }

    set x(value: number) {
        this.data[this.offset] = value;
    }

    get y() {
        return this.data[this.offset + 1];
    }

    set y(value: number) {
        this.data[this.offset + 1] = value;
    }

    get width() {
        return this.data[this.offset + 2];
    }

    set width(value: number) {
        this.data[this.offset + 2] = value;
    }

    get height() {
        return this.data[this.offset + 3];
    }

    set height(value: number) {
        this.data[this.offset + 3] = value;
    }

    public copy() {
        return new RectangleView(this.data, this.offset);
    }
}
