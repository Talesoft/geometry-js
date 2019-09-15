import { NumericArray } from './common';
import { TransformationMatrix2 } from './matrices';
export interface Vector2Literal {
    x: number;
    y: number;
}
export declare type Vector2Tuple = readonly [number, number];
export declare class Vector2 implements Vector2Literal {
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
    set(vec2: Partial<Readonly<Vector2Literal>>): this;
    add(vec2: Partial<Readonly<Vector2Literal>>): this;
    subtract(vec2: Partial<Readonly<Vector2Literal>>): this;
    multiply(vec2: Partial<Readonly<Vector2Literal>>): this;
    divide(vec2: Partial<Readonly<Vector2Literal>>): this;
    negate(): this;
    min(vec2: Readonly<Vector2Literal>): this;
    max(vec2: Readonly<Vector2Literal>): this;
    clamp(minValue: number, maxValue: number): this;
    clamp01(): this;
    normalize(): this;
    lerp(vec2: Readonly<Vector2Literal>, t: number): this;
    lerpUnclamped(vec2: Readonly<Vector2Literal>, t: number): this;
    perp(): this;
    moveTowards(vec2: Readonly<Vector2Literal>, maxDistanceDelta: number): this;
    moveBy(amount: number, direction: Readonly<Vector2>): this;
    getDotProduct(vec2: Readonly<Vector2Literal>): number;
    getAngleTo(vec2: Readonly<Vector2>): number;
    getDistanceTo(vec2: Readonly<Vector2Literal>): number;
    equals(vec2: Readonly<Vector2Literal>): boolean;
    isZero(): boolean;
    isOne(): boolean;
    copy(): Vector2;
    transform(matrix: Readonly<TransformationMatrix2>): this;
    toTuple(): readonly [number, number];
    toLiteral(): {
        x: number;
        y: number;
    };
    toString(): string;
    static fromTuple(tuple: Vector2Tuple): Vector2;
    static fromLiteral(literal: Readonly<Vector2Literal>): Vector2;
}
export declare class Vector2View extends Vector2 {
    static readonly SIZE = 2;
    readonly data: NumericArray;
    readonly offset: number;
    constructor(data: NumericArray, offset?: number);
    x: number;
    y: number;
}
