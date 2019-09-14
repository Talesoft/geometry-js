import { Circle, CircleCollidable } from './circles';
import { Edge, EdgeCollidable } from './edges';
import { Polygon, PolygonCollidable } from './polygons';
import { Vector2, Vector2Literal } from './vectors';
export interface RectangleLiteral {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare type RectangleTuple = readonly [number, number, number, number];
export declare type RectangleVertexTuple = readonly [Vector2, Vector2, Vector2, Vector2];
export declare type RectangleEdgeTuple = readonly [Edge, Edge, Edge, Edge];
export interface RectangleCollidable {
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
}
export declare class Rectangle implements RectangleLiteral, EdgeCollidable, RectangleCollidable, CircleCollidable, PolygonCollidable {
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
    readonly vertices: readonly [Vector2, Vector2, Vector2, Vector2];
    readonly edges: readonly [Edge, Edge, Edge, Edge];
    set(rect: Partial<Readonly<RectangleLiteral>>): this;
    add(rect: Partial<Readonly<RectangleLiteral>>): this;
    subtract(rect: Partial<Readonly<RectangleLiteral>>): this;
    multiply(rect: Partial<Readonly<RectangleLiteral>>): this;
    divide(rect: Partial<Readonly<RectangleLiteral>>): this;
    expand(vec2: Readonly<Vector2Literal>): this;
    copy(): Rectangle;
    contains(vec2: Readonly<Vector2Literal>): boolean;
    overlapsEdge(edge: Edge): void;
    intersectEdge(edge: Edge): void;
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): void;
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): void;
    overlapsPolygon(poly: Polygon): void;
    intersectPolygon(poly: Polygon): void;
    toTuple(): readonly [number, number, number, number];
    toLiteral(): {
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
    };
    toPolygon(): Polygon;
    toString(): string;
    static fromTuple(tuple: RectangleTuple): Rectangle;
    static fromLiteral(literal: Readonly<RectangleLiteral>): Rectangle;
}
export declare class RectangleView extends Rectangle {
    static readonly LENGTH = 4;
    readonly data: number[];
    readonly offset: number;
    constructor(data: number[], offset?: number);
    x: number;
    y: number;
    width: number;
    height: number;
    copy(): RectangleView;
}
