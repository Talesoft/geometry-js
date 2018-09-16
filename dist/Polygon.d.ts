import Vector2 from "./Vector2.js";
import Rectangle from "./Rectangle.js";
import Edge from "./Edge.js";
export declare type PolygonTuple = [number, number][];
export default class Polygon {
    readonly vertices: Vector2[];
    constructor(points?: Vector2[]);
    readonly center: Readonly<Vector2>;
    readonly bounds: Readonly<Rectangle>;
    readonly edges: Readonly<Readonly<Edge>[]>;
    readonly edgeNormals: Readonly<Readonly<Vector2>[]>;
    readonly edgeCenters: Readonly<Readonly<Vector2>[]>;
    x: number;
    y: number;
    width: number;
    height: number;
    contains(vec2: Vector2): boolean;
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
    toTuple(): PolygonTuple;
    toString(): string;
    static fromTuple(tuple: PolygonTuple): Polygon;
}
