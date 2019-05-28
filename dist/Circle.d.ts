import Edge, { EdgeCollidable } from './Edge';
import Polygon, { PolygonCollidable } from './Polygon';
import Rectangle, { RectangleCollidable } from './Rectangle';
import Vector2, { Vector2Literal } from './Vector2';
export interface CircleLiteral {
    x: number;
    y: number;
    radius: number;
}
export declare type CircleTuple = [number, number, number];
export interface CircleCollidable {
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
}
export default class Circle implements CircleLiteral, EdgeCollidable, CircleCollidable, RectangleCollidable, PolygonCollidable {
    x: number;
    y: number;
    radius: number;
    constructor(x?: number, y?: number, radius?: number);
    readonly area: number;
    position: Vector2;
    set(rect: Partial<CircleLiteral>): Circle;
    add(rect: Partial<CircleLiteral>): Circle;
    subtract(rect: Partial<CircleLiteral>): Circle;
    multiply(rect: Partial<CircleLiteral>): Circle;
    divide(rect: Partial<CircleLiteral>): Circle;
    copy(): Circle;
    contains(vec2: Vector2Literal): boolean;
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
    toTuple(): CircleTuple;
    toString(): string;
    static fromTuple(tuple: CircleTuple): Circle;
}
