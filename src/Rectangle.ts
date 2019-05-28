import Circle, { CircleCollidable } from './Circle';
import { clamp } from './common';
import Edge, { EdgeCollidable } from './Edge';
import Polygon, { PolygonCollidable } from './Polygon';
import Vector2, { Vector2Literal } from './Vector2';

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

export default class Rectangle implements
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

    get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    set position(vec2: Vector2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    get size(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    set size(vec2: Vector2) {
        this.width = vec2.x;
        this.height = vec2.y;
    }

    get center(): Vector2 {
        return new Vector2(this.x + this.width / 2, this.y + this.height / 2);
    }

    set center(vec2: Vector2) {
        this.x = vec2.x - this.width / 2;
        this.y = vec2.y - this.height / 2;
    }

    get left(): number {
        return this.x;
    }

    set left(value: number) {
        this.width += this.left - value;
        this.x = value;
    }

    get right(): number {
        return this.x + this.width;
    }

    set right(value: number) {
        this.width -= this.right - value;
    }

    get top(): number {
        return this.y;
    }

    set top(value: number) {
        this.height += this.top - value;
        this.y = value;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    set bottom(value: number) {
        this.height -= this.bottom - value;
    }

    get leftTop(): Vector2 {
        return new Vector2(this.left, this.top);
    }

    set leftTop(vec2: Vector2) {
        this.left = vec2.x;
        this.top = vec2.y;
    }

    get rightTop(): Vector2 {
        return new Vector2(this.right, this.top);
    }

    set rightTop(vec2: Vector2) {
        this.right = vec2.x;
        this.top = vec2.y;
    }

    get leftBottom(): Vector2 {
        return new Vector2(this.left, this.bottom);
    }

    set leftBottom(vec2: Vector2) {
        this.left = vec2.x;
        this.bottom = vec2.y;
    }

    get rightBottom(): Vector2 {
        return new Vector2(this.left, this.bottom);
    }

    set rightBottom(vec2: Vector2) {
        this.right = vec2.x;
        this.bottom = vec2.y;
    }

    get leftEdge(): Edge {
        return new Edge(this.leftBottom, this.leftTop);
    }

    get rightEdge(): Edge {
        return new Edge(this.rightTop, this.rightBottom);
    }

    get topEdge(): Edge {
        return new Edge(this.leftTop, this.rightTop);
    }

    get bottomEdge(): Edge {
        return new Edge(this.rightBottom, this.leftBottom);
    }

    get vertices(): RectangleVertexTuple {
        return [this.leftTop, this.rightTop, this.rightBottom, this.leftBottom];
    }

    get edges(): RectangleEdgeTuple {
        return [this.leftEdge, this.topEdge, this.rightEdge, this.bottomEdge];
    }

    public set(rect: Partial<RectangleLiteral>): Rectangle {
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

    public add(rect: Partial<RectangleLiteral>): Rectangle {
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

    public subtract(rect: Partial<RectangleLiteral>): Rectangle {
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

    public multiply(rect: Partial<RectangleLiteral>): Rectangle {
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

    public divide(rect: Partial<RectangleLiteral>): Rectangle {
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

    public expand(vec2: Vector2Literal): Rectangle {
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

    public copy(): Rectangle {
        return new Rectangle(this.x, this.y, this.width, this.height);
    }

    public contains(vec2: Vector2Literal): boolean {
        return (vec2.x >= this.x) && (vec2.x < this.right) && (vec2.y >= this.y) && (vec2.y < this.bottom);
    }

    // @ts-ignore
    public overlapsEdge(edge: Edge): boolean {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectEdge(edge: Edge): Vector2[] {
        throw new Error('Not implemented');
    }

    public overlapsRectangle(rect: Rectangle): boolean {
        return (rect.right > this.x && rect.x < this.right && rect.bottom > this.right && rect.y < this.bottom);
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle): Vector2[] {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsCircle(circle: Circle): boolean {
        const v = new Vector2(clamp(this.left, circle.x, this.right), clamp(this.top, circle.y, this.bottom));
        const direction = circle.position.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < circle.radius * circle.radius));
    }

    // @ts-ignore
    public intersectCircle(circle: Circle): Vector2[] {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsPolygon(poly: Polygon): boolean {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectPolygon(poly: Polygon): Vector2[] {
        throw new Error('Not implemented');
    }

    public toTuple(): RectangleTuple {
        return [this.x, this.y, this.width, this.height];
    }

    public toPolygon(): Polygon {
        return new Polygon(this.vertices);
    }

    public toString(): string {
        return `rect(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.width.toFixed(2)}, ${this.height.toFixed(2)})`;
    }

    public static fromTuple(tuple: RectangleTuple): Rectangle {
        return new Rectangle(...tuple);
    }
}
