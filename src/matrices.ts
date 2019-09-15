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

export type TransformationMatrix2Tuple = readonly [
    readonly [number, number, number],
    readonly [number, number, number],
];

export class TransformationMatrix2 implements TransformationMatrix2Literal {
    public a: number = 1;
    public c: number = 0;
    public tx: number = 0;
    public b: number = 0;
    public d: number = 1;
    public ty: number = 0;

    constructor(a?: number, c?: number, tx?: number, b?: number, d?: number, ty?: number) {
        if (typeof a !== 'undefined') {
            this.a = a;
        }
        if (typeof c !== 'undefined') {
            this.c = c;
        }
        if (typeof tx !== 'undefined') {
            this.tx = tx;
        }
        if (typeof b !== 'undefined') {
            this.b = b;
        }
        if (typeof d !== 'undefined') {
            this.d = d;
        }
        if (typeof ty !== 'undefined') {
            this.ty = ty;
        }
    }

    get determinant() {
        return this.a * this.d - this.b * this.c;
    }

    public set(matrix: Partial<Readonly<TransformationMatrix2Literal>>) {
        if (typeof matrix.a !== 'undefined') {
            this.a = matrix.a;
        }
        if (typeof matrix.c !== 'undefined') {
            this.c = matrix.c;
        }
        if (typeof matrix.tx !== 'undefined') {
            this.tx = matrix.tx;
        }
        if (typeof matrix.b !== 'undefined') {
            this.b = matrix.b;
        }
        if (typeof matrix.d !== 'undefined') {
            this.d = matrix.d;
        }
        if (typeof matrix.ty !== 'undefined') {
            this.ty = matrix.ty;
        }
        return this;
    }

    public identity() {
        return this.set({
            a: 1, c: 0, tx: 0,
            b: 0, d: 1, ty: 0,
        });
    }

    public translate(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.tx += vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.ty += vec2.y;
        }
        return this;
    }

    public scale(vec2: Partial<Readonly<Vector2Literal>>) {
        const a = typeof vec2.x !== 'undefined' ? vec2.x : 1;
        const d = typeof vec2.y !== 'undefined' ? vec2.y : 1;
        // tslint:disable:object-shorthand-properties-first
        return this.multiply({
            a,    c: 0, tx: 0,
            b: 0, d,    ty: 0,
        });
        // tslint:enable:object-shorthand-properties-first
    }

    public rotate(radians: number) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return this.multiply({
            a: cos, c: -sin, tx: 0,
            b: sin, d: -cos, ty: 0,
        });
    }

    public skew(vec2: Readonly<Vector2Literal>) {
        const c = Math.tan(vec2.x);
        const b = Math.tan(vec2.y);
        // tslint:disable:object-shorthand-properties-first
        return this.multiply({
            a: 1, c,    tx: 0,
            b,    d: 1, ty: 0,
        });
        // tslint:enable:object-shorthand-properties-first
    }

    public invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error('The matrix is not inversible since it would require a division through zero');
        }
        return new TransformationMatrix2(
            this.d / det,  -this.c / det, (this.c * this.ty - this.d * this.tx) / det,
            -this.b / det, this.a / det,  (-this.a * this.ty + this.b * this.tx) / det,
        );
    }

    public multiply(other: Readonly<TransformationMatrix2Literal>) {
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

    public copy() {
        return TransformationMatrix2.fromLiteral(this);
    }

    public toTuple() {
        return [
            [this.a, this.c, this.tx] as const,
            [this.b, this.d, this.ty] as const,
        ] as const;
    }

    public toString() {
        return `transform-matrix2(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`;
    }

    public static fromTuple(tuple: TransformationMatrix2Tuple) {
        return new TransformationMatrix2(
            tuple[0][0], tuple[0][1], tuple[0][2],
            tuple[1][0], tuple[1][1], tuple[1][2],
        );
    }

    public static fromLiteral(literal: TransformationMatrix2Literal) {
        return new TransformationMatrix2(
            literal.a, literal.c, literal.tx,
            literal.b, literal.d, literal.ty,
        );
    }
}

export class TransformationMatrix2View extends TransformationMatrix2 {
    public static readonly LENGTH = 6;
    public readonly data: NumericArray;
    public readonly offset: number;

    constructor(data: NumericArray, offset: number = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }

    get a() {
        return this.data[this.offset];
    }

    set a(value: number) {
        this.data[this.offset] = value;
    }

    get c() {
        return this.data[this.offset + 1];
    }

    set c(value: number) {
        this.data[this.offset + 1] = value;
    }

    get tx() {
        return this.data[this.offset + 2];
    }

    set tx(value: number) {
        this.data[this.offset + 2] = value;
    }

    get b() {
        return this.data[this.offset + 3];
    }

    set b(value: number) {
        this.data[this.offset + 3] = value;
    }

    get d() {
        return this.data[this.offset + 4];
    }

    set d(value: number) {
        this.data[this.offset + 4] = value;
    }

    get ty() {
        return this.data[this.offset + 5];
    }

    set ty(value: number) {
        this.data[this.offset + 5] = value;
    }
}
