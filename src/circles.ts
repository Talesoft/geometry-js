import { clamp, NumericArray } from './common';
import { Edge, EdgeCollidable } from './edges';
import { Polygon, PolygonCollidable } from './polygons';
import { Rectangle, RectangleCollidable } from './rectangles';
import { Vector2, Vector2Literal } from './vectors';

const { PI, sqrt } = Math;

export interface CircleLiteral {
    cx: number;
    cy: number;
    radius: number;
}

export type CircleTuple = readonly [number, number, number];

export interface CircleCollidable {
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
}

export class Circle implements
    CircleLiteral,
    EdgeCollidable,
    CircleCollidable,
    RectangleCollidable,
    PolygonCollidable {
    public cx: number = 0;
    public cy: number = 0;
    public radius: number = 0;

    constructor(cx?: number, cy?: number, radius?: number) {
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
        return new Vector2(this.cx, this.cy);
    }

    set center(vec2: Vector2) {
        this.cx = vec2.x;
        this.cy = vec2.y;
    }

    public set(rect: Partial<Readonly<CircleLiteral>>) {
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

    public add(rect: Partial<Readonly<CircleLiteral>>) {
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

    public subtract(rect: Partial<Readonly<CircleLiteral>>) {
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

    public multiply(rect: Partial<Readonly<CircleLiteral>>) {
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

    public divide(rect: Partial<Readonly<CircleLiteral>>) {
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

    public copy() {
        return Circle.fromLiteral(this);
    }

    public contains(vec2: Readonly<Vector2Literal>) {
        return sqrt(
            (vec2.x - this.cx) * (vec2.x - this.cx) + (vec2.y - this.cy) * (vec2.y - this.cy),
        ) < this.radius;
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
        const v = new Vector2(clamp(rect.left, this.cx, rect.right), clamp(rect.top, this.cy, rect.bottom));
        const direction = this.center.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle) {
        throw new Error('Not implemented');
    }

    public overlapsCircle(circle: Circle) {
        const distanceX = this.cx - circle.cx;
        const distanceY = this.cy - circle.cy;
        const radiusSum = this.radius + circle.radius;
        return distanceX * distanceX + distanceY * distanceY <= radiusSum * radiusSum;
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
        return [this.cx, this.cy, this.radius] as const;
    }

    public toLiteral() {
        return { cx: this.cx, cy: this.cy, radius: this.radius } as const;
    }

    public toString() {
        return `circle(${this.cx.toFixed(2)}, ${this.cy.toFixed(2)}, ${this.radius.toFixed(2)})`;
    }

    public static fromTuple(tuple: CircleTuple) {
        return new Circle(...tuple);
    }

    public static fromLiteral(literal: Readonly<CircleLiteral>) {
        return new Circle(literal.cx, literal.cy, literal.radius);
    }
}

export class CircleView extends Circle {
    public static readonly SIZE = 3;
    public readonly data: NumericArray;
    public readonly offset: number;

    constructor(data: NumericArray, offset: number = 0) {
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

    get radius() {
        return this.data[this.offset + 2];
    }

    set radius(value: number) {
        this.data[this.offset + 2] = value;
    }
}
