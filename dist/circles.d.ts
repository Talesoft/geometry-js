import { Edge, EdgeCollidable } from './edges';
import { Polygon, PolygonCollidable } from './polygons';
import { Rectangle, RectangleCollidable } from './rectangles';
import { Vector2, Vector2Literal } from './vectors';
export interface CircleLiteral {
    cx: number;
    cy: number;
    radius: number;
}
export declare type CircleTuple = readonly [number, number, number];
export interface CircleCollidable {
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
}
export declare class Circle implements CircleLiteral, EdgeCollidable, CircleCollidable, RectangleCollidable, PolygonCollidable {
    cx: number;
    cy: number;
    radius: number;
    constructor(cx?: number, cy?: number, radius?: number);
    readonly area: number;
    center: Vector2;
    set(rect: Partial<Readonly<CircleLiteral>>): this;
    add(rect: Partial<Readonly<CircleLiteral>>): this;
    subtract(rect: Partial<Readonly<CircleLiteral>>): this;
    multiply(rect: Partial<Readonly<CircleLiteral>>): this;
    divide(rect: Partial<Readonly<CircleLiteral>>): this;
    copy(): Circle;
    contains(vec2: Readonly<Vector2Literal>): boolean;
    overlapsEdge(edge: Edge): void;
    intersectEdge(edge: Edge): void;
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): void;
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): void;
    overlapsPolygon(poly: Polygon): void;
    intersectPolygon(poly: Polygon): void;
    toTuple(): readonly [number, number, number];
    toString(): string;
    static fromTuple(tuple: CircleTuple): Circle;
    static fromLiteral(literal: Readonly<CircleLiteral>): Circle;
}
export declare class CircleView extends Circle {
    readonly data: number[];
    readonly offset: number;
    constructor(data: number[], offset?: number);
    x: number;
    y: number;
    radius: number;
}
