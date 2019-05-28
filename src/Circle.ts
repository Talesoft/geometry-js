import { clamp } from './common';
import Edge, { EdgeCollidable } from './Edge';
import Polygon, { PolygonCollidable } from './Polygon';
import Rectangle, { RectangleCollidable } from './Rectangle';
import Vector2, { Vector2Literal } from './Vector2';

const { PI, sqrt } = Math;

export interface CircleLiteral {
    x: number;
    y: number;
    radius: number;
}

export type CircleTuple = [number, number, number];

export interface CircleCollidable {
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
}

export default class Circle implements
    CircleLiteral,
    EdgeCollidable,
    CircleCollidable,
    RectangleCollidable,
    PolygonCollidable {
    public x: number = 0;
    public y: number = 0;
    public radius: number = 0;

    constructor(x?: number, y?: number, radius?: number) {
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

    get area(): number {
        return this.radius * this.radius * PI;
    }

    get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    set position(vec2: Vector2) {
        this.x = vec2.x;
        this.y = vec2.y;
    }

    public set(rect: Partial<CircleLiteral>): Circle {
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

    public add(rect: Partial<CircleLiteral>): Circle {
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

    public subtract(rect: Partial<CircleLiteral>): Circle {
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

    public multiply(rect: Partial<CircleLiteral>): Circle {
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

    public divide(rect: Partial<CircleLiteral>): Circle {
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

    public copy(): Circle {
        return new Circle(this.x, this.y, this.radius);
    }

    public contains(vec2: Vector2Literal): boolean {
        return sqrt((vec2.x - this.x) * (vec2.x - this.x) + (vec2.y - this.y) * (vec2.y - this.y)) < this.radius;
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
        const v = new Vector2(clamp(rect.left, this.x, rect.right), clamp(rect.top, this.y, rect.bottom));
        const direction = this.position.subtract(v);
        const mag = direction.magnitude;
        return ((mag > 0) && (mag < this.radius * this.radius));
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle): Vector2[] {
        throw new Error('Not implemented');
    }

    public overlapsCircle(circle: Circle): boolean {
        const distanceX = this.x - circle.x;
        const distanceY = this.y - circle.y;
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
        return [this.x, this.y, this.radius];
    }

    public toString(): string {
        return `circle(${this.x.toFixed(2)}, ${this.y.toFixed(2)}, ${this.radius.toFixed(2)})`;
    }

    public static fromTuple(tuple: CircleTuple): Circle {
        return new Circle(...tuple);
    }
}
