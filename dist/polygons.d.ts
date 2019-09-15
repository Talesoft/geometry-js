import { Circle, CircleCollidable } from './circles';
import { NumericArray } from './common';
import { Edge, EdgeCollidable } from './edges';
import { TransformationMatrix2 } from './matrices';
import { Rectangle, RectangleCollidable } from './rectangles';
import { Vector2 } from './vectors';
export declare type PolygonTuple = Array<[number, number]>;
export interface PolygonCollidable {
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
}
export declare class Polygon implements EdgeCollidable, PolygonCollidable, RectangleCollidable, CircleCollidable {
    readonly vertices: readonly Vector2[];
    constructor(vertices?: readonly Vector2[]);
    readonly center: Vector2;
    readonly bounds: Rectangle;
    readonly edges: Edge[];
    readonly edgeNormals: Vector2[];
    readonly edgeCenters: Vector2[];
    x: number;
    y: number;
    width: number;
    height: number;
    contains(vec2: Readonly<Vector2>): boolean;
    overlapsEdge(edge: Edge): void;
    intersectEdge(edge: Edge): void;
    overlapsRectangle(rect: Rectangle): void;
    intersectRectangle(rect: Rectangle): void;
    overlapsCircle(circle: Circle): void;
    intersectCircle(circle: Circle): void;
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
    copy(): Polygon;
    transform(matrix: TransformationMatrix2): void;
    toTuple(): (readonly [number, number])[];
    toString(): string;
    static fromTuple(tuple: Readonly<PolygonTuple>): Polygon;
}
export declare class PolygonView extends Polygon {
    data: NumericArray;
    offset: number;
    constructor(data: NumericArray, offset?: number);
}
