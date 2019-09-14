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

export class TransformationMatrix2 {
    public a: number;
    public b: number;
    public c: number;
    public d: number;
    public tx: number;
    public ty: number;

    constructor(a: number = 1, b: number = 0, c: number = 0, d: number = 1, tx: number = 0, ty: number = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
    }

    get determinant() {
        return this.a * this.d - this.b * this.c;
    }

    public identity() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    }

    public translate(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.tx += vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.tx += vec2.y;
        }
        return this;
    }

    public scale(vec2: Partial<Readonly<Vector2Literal>>) {
        return this.multiply(new TransformationMatrix2(
            typeof vec2.x !== 'undefined' ? vec2.x : 1,
            0,
            0,
            typeof vec2.y !== 'undefined' ? vec2.y : 1,
            0,
            0,
        ));
    }

    public rotate(radians: number) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return this.multiply(new TransformationMatrix2(cos, sin, -sin, -cos, 0, 0));
    }

    public skew(vec2: Readonly<Vector2Literal>) {
        return this.multiply(new TransformationMatrix2(
            1,
            Math.tan(vec2.y),
            Math.tan(vec2.x),
            1,
            0,
            0,
        ));
    }

    public invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error('The matrix is not inversible since it would require a division through zero');
        }
        return new TransformationMatrix2(
            this.d / det,
            -this.b / det,
            -this.c / det,
            this.a / det,
            (this.c * this.ty - this.d * this.tx) / det,
            (-this.a * this.ty + this.b * this.tx) / det,
        );
    }

    public multiply(other: Readonly<TransformationMatrix2>) {
        const { a, b, c, d, tx, ty } = this;
        this.a = a * other.a + c * other.b;
        this.b = b * other.a + d * other.b;
        this.c = a * other.c + c * other.d;
        this.d = b * other.c + d * other.d;
        this.tx = a * other.tx + c * other.ty + tx;
        this.ty = b * other.tx + d * other.ty + ty;
        return this;
    }

    public project(vec: Vector2Literal) {
        vec.x = this.a * vec.x + this.c * vec.y + this.tx;
        vec.y = this.b * vec.x + this.d * vec.y + this.ty;
        return this;
    }

    public toString() {
        return `matrix2(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`;
    }
}
