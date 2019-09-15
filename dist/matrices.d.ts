/**
 * [ [ a, c, tx ],
 *   [ b, d, ty ],
 *   [ 0, 0, 1 ] ]
 *
 * a = X Scale
 * c = X Rotation throgh Y
 * tx = X Translation
 * b = Y Rotation through X
 * d = Y Scale
 * ty = Y Translation
 *
 * last row is constant (and will be ignored by the implementation, only tx/ty
 * will be used in the multiplication as it's tx * 1 anyways)
 *
 * Will be projected against 2d points (x, y)
 *
 * [ a, c, tx ]     [ x ]     [ a * x + c * y + tx * 1 ]       [ Transformed X ]
 * [ b, d, ty ]  *  [ y ]  =  [ b * x + d * y + ty * 1 ]   =   [ Transformed Y ]
 * [ 0, 0, 1  ]     [ 1 ]     [ 0 * x + 0 * y + 1 * 1  ]       [ 1 (Ignored Z) ]
 */
import { NumericArray } from './common';
import { Vector2Literal } from './vectors';
export interface TransformationMatrix2Literal {
    a: number;
    c: number;
    tx: number;
    b: number;
    d: number;
    ty: number;
}
export declare type TransformationMatrix2Tuple = readonly [readonly [number, number, number], readonly [number, number, number]];
export declare class TransformationMatrix2 implements TransformationMatrix2Literal {
    a: number;
    c: number;
    tx: number;
    b: number;
    d: number;
    ty: number;
    constructor(a?: number, c?: number, tx?: number, b?: number, d?: number, ty?: number);
    readonly determinant: number;
    set(matrix: Partial<Readonly<TransformationMatrix2Literal>>): this;
    identity(): this;
    translate(vec2: Partial<Readonly<Vector2Literal>>): this;
    scale(vec2: Partial<Readonly<Vector2Literal>>): this;
    rotate(radians: number): this;
    skew(vec2: Readonly<Vector2Literal>): this;
    invert(): TransformationMatrix2;
    multiply(other: Readonly<TransformationMatrix2Literal>): this;
    project(vec: Vector2Literal): this;
    copy(): TransformationMatrix2;
    toTuple(): readonly [readonly [number, number, number], readonly [number, number, number]];
    toString(): string;
    static fromTuple(tuple: TransformationMatrix2Tuple): TransformationMatrix2;
    static fromLiteral(literal: TransformationMatrix2Literal): TransformationMatrix2;
}
export declare class TransformationMatrix2View extends TransformationMatrix2 {
    static readonly LENGTH = 6;
    readonly data: NumericArray;
    readonly offset: number;
    constructor(data: NumericArray, offset?: number);
    a: number;
    c: number;
    tx: number;
    b: number;
    d: number;
    ty: number;
}
