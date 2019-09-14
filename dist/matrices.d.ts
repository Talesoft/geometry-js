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
import { Vector2Literal } from './vectors';
export declare class TransformationMatrix2 {
    a: number;
    b: number;
    c: number;
    d: number;
    tx: number;
    ty: number;
    constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
    readonly determinant: number;
    identity(): this;
    translate(vec2: Partial<Readonly<Vector2Literal>>): this;
    scale(vec2: Partial<Readonly<Vector2Literal>>): this;
    rotate(radians: number): this;
    skew(vec2: Readonly<Vector2Literal>): this;
    invert(): TransformationMatrix2;
    multiply(other: Readonly<TransformationMatrix2>): this;
    project(vec: Vector2Literal): this;
    toString(): string;
}
