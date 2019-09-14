import { Vector2, Vector2Literal } from './vectors';
export declare type EdgeTuple = readonly [number, number, number, number];
export interface EdgeLiteral {
    from: Vector2Literal;
    to: Vector2Literal;
}
export interface EdgeCollidable {
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
}
export declare class Edge implements EdgeLiteral {
    from: Vector2;
    to: Vector2;
    constructor(from: Vector2, to: Vector2);
    readonly length: number;
    readonly center: Vector2;
    readonly normal: Vector2;
    intersectEdge(edge: Edge, ray?: boolean): Vector2 | null;
    copy(): Edge;
    toTuple(): readonly [number, number, number, number];
    toLiteral(): {
        readonly from: {
            x: number;
            y: number;
        };
        readonly to: {
            x: number;
            y: number;
        };
    };
    static fromTuple(tuple: EdgeTuple): Edge;
    static fromLiteral(literal: Readonly<EdgeLiteral>): Edge;
}
