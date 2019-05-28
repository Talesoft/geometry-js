import Vector2 from './Vector2';
export declare type EdgeTuple = [number, number, number, number];
export interface EdgeCollidable {
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
}
export default class Edge {
    from: Vector2;
    to: Vector2;
    constructor(from: Vector2, to: Vector2);
    readonly length: number;
    readonly center: Vector2;
    readonly normal: Vector2;
    intersectEdge(edge: Edge, ray?: boolean): Vector2 | null;
    toTuple(): EdgeTuple;
    static fromTuple(tuple: EdgeTuple): Edge;
}
