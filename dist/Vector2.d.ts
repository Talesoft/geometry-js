export interface Vector2Literal {
    x: number;
    y: number;
}
export declare type Vector2Tuple = [number, number];
export default class Vector2 implements Vector2Literal {
    static readonly zero: Readonly<Vector2>;
    static readonly one: Readonly<Vector2>;
    static readonly up: Readonly<Vector2>;
    static readonly down: Readonly<Vector2>;
    static readonly left: Readonly<Vector2>;
    static readonly right: Readonly<Vector2>;
    static readonly infinity: Readonly<Vector2>;
    static readonly negativeInfinity: Readonly<Vector2>;
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    readonly length: number;
    readonly magnitude: number;
    set(vec2: Partial<Vector2Literal>): Vector2;
    add(vec2: Partial<Vector2Literal>): Vector2;
    subtract(vec2: Partial<Vector2Literal>): Vector2;
    multiply(vec2: Partial<Vector2Literal>): Vector2;
    divide(vec2: Partial<Vector2Literal>): Vector2;
    negate(): Vector2;
    min(vec2: Vector2Literal): Vector2;
    max(vec2: Vector2Literal): Vector2;
    clamp(minValue: number, maxValue: number): Vector2;
    clamp01(): Vector2;
    normalize(): Vector2;
    lerp(vec2: Vector2Literal, t: number): Vector2;
    lerpUnclamped(vec2: Vector2Literal, t: number): Vector2;
    perp(): Vector2;
    moveTowards(vec2: Vector2, maxDistanceDelta: number): Vector2;
    moveBy(amount: number, direction: Vector2): Vector2;
    getDotProduct(vec2: Vector2Literal): number;
    getAngleTo(vec2: Vector2): number;
    getDistanceTo(vec2: Vector2Literal): number;
    equals(vec2: Vector2Literal): boolean;
    isZero(): boolean;
    isOne(): boolean;
    copy(): Vector2;
    toTuple(): Vector2Tuple;
    toString(): string;
    static fromTuple(tuple: Vector2Tuple): Vector2;
}
