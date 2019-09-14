import { clamp } from './common';
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

export type CircleTuple = [number, number, number];

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

    get area(): number {
        return this.radius * this.radius * PI;
    }

    get position(): Vector2 {
        return new Vector2(this.cx, this.cy);
    }

    set position(vec2: Vector2) {
        this.cx = vec2.x;
        this.cy = vec2.y;
    }

    public set(rect: Partial<CircleLiteral>): Circle {
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

    public add(rect: Partial<CircleLiteral>): Circle {
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

    public subtract(rect: Partial<CircleLiteral>): Circle {
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

    public multiply(rect: Partial<CircleLiteral>): Circle {
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

    public divide(rect: Partial<CircleLiteral>): Circle {
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

    public copy(): Circle {
        return new Circle(this.cx, this.cy, this.radius);
    }

    public contains(vec2: Vector2Literal): boolean {
        return sqrt(
            (vec2.x - this.cx) * (vec2.x - this.cx) + (vec2.y - this.cy) * (vec2.y - this.cy),
        ) < this.radius;
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
        const v = new Vector2(clamp(rect.left, this.cx, rect.right), clamp(rect.top, this.cy, rect.bottom));
        const direction = this.position.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle): Vector2[] {
        throw new Error('Not implemented');
    }

    public overlapsCircle(circle: Circle): boolean {
        const distanceX = this.cx - circle.cx;
        const distanceY = this.cy - circle.cy;
        const radiusSum = this.radius + circle.radius;
        return distanceX * distanceX + distanceY * distanceY <= radiusSum * radiusSum;
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

    public toTuple(): CircleTuple {
        return [this.cx, this.cy, this.radius];
    }

    public toString(): string {
        return `circle(${this.cx.toFixed(2)}, ${this.cy.toFixed(2)}, ${this.radius.toFixed(2)})`;
    }

    public static fromTuple(tuple: CircleTuple): Circle {
        return new Circle(...tuple);
    }

    public static fromLiteral(literal: CircleLiteral) {
        return new Circle(literal.cx, literal.cy, literal.radius);
    }
}

export class CircleView extends Circle {
    public readonly data: number[];
    public readonly offset: number;

    constructor(data: number[], offset: number = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }

    get x(): number {
        return this.data[this.offset];
    }

    set x(value: number) {
        this.data[this.offset] = value;
    }

    get y(): number {
        return this.data[this.offset + 1];
    }

    set y(value: number) {
        this.data[this.offset + 1] = value;
    }

    get radius(): number {
        return this.data[this.offset + 2];
    }

    set radius(value: number) {
        this.data[this.offset + 2] = value;
    }
}
