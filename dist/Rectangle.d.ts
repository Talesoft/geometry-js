import Circle, { CircleCollidable } from './Circle';
import Edge, { EdgeCollidable } from './Edge';
import Polygon, { PolygonCollidable } from './Polygon';
import Vector2, { Vector2Literal } from './Vector2';
export interface RectangleLiteral {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare type RectangleTuple = [number, number, number, number];
export declare type RectangleVertexTuple = [Vector2, Vector2, Vector2, Vector2];
export declare type RectangleEdgeTuple = [Edge, Edge, Edge, Edge];
export interface RectangleCollidable {
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
}
export default class Rectangle implements RectangleLiteral, EdgeCollidable, RectangleCollidable, CircleCollidable, PolygonCollidable {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    readonly area: number;
    position: Vector2;
    size: Vector2;
    center: Vector2;
    left: number;
    right: number;
    top: number;
    bottom: number;
    leftTop: Vector2;
    rightTop: Vector2;
    leftBottom: Vector2;
    rightBottom: Vector2;
    readonly leftEdge: Edge;
    readonly rightEdge: Edge;
    readonly topEdge: Edge;
    readonly bottomEdge: Edge;
    readonly vertices: RectangleVertexTuple;
    readonly edges: RectangleEdgeTuple;
    set(rect: Partial<RectangleLiteral>): Rectangle;
    add(rect: Partial<RectangleLiteral>): Rectangle;
    subtract(rect: Partial<RectangleLiteral>): Rectangle;
    multiply(rect: Partial<RectangleLiteral>): Rectangle;
    divide(rect: Partial<RectangleLiteral>): Rectangle;
    expand(vec2: Vector2Literal): Rectangle;
    copy(): Rectangle;
    contains(vec2: Vector2Literal): boolean;
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
    toTuple(): RectangleTuple;
    toPolygon(): Polygon;
    toString(): string;
    static fromTuple(tuple: RectangleTuple): Rectangle;
}
