import Circle, { CircleCollidable } from './Circle';
import Edge, { EdgeCollidable } from './Edge';
import Rectangle, { RectangleCollidable } from './Rectangle';
import Vector2 from './Vector2';
export declare type PolygonTuple = Array<[number, number]>;
export interface PolygonCollidable {
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
}
export default class Polygon implements EdgeCollidable, PolygonCollidable, RectangleCollidable, CircleCollidable {
    readonly vertices: Vector2[];
    constructor(vertices?: Vector2[]);
    readonly center: Vector2;
    readonly bounds: Rectangle;
    readonly edges: Edge[];
    readonly edgeNormals: Vector2[];
    readonly edgeCenters: Vector2[];
    x: number;
    y: number;
    width: number;
    height: number;
    contains(vec2: Vector2): boolean;
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
    overlapsRectangle(rect: Rectangle): boolean;
    intersectRectangle(rect: Rectangle): Vector2[];
    overlapsCircle(circle: Circle): boolean;
    intersectCircle(circle: Circle): Vector2[];
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
    copy(): Polygon;
    toTuple(): PolygonTuple;
    toString(): string;
    static fromTuple(tuple: PolygonTuple): Polygon;
}
