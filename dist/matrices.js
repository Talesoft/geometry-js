"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransformationMatrix2 {
    constructor(a, c, tx, b, d, ty) {
        this.a = 1;
        this.c = 0;
        this.tx = 0;
        this.b = 0;
        this.d = 1;
        this.ty = 0;
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
    set(matrix) {
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
    identity() {
        return this.set({
            a: 1, c: 0, tx: 0,
            b: 0, d: 1, ty: 0,
        });
    }
    translate(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.tx += vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.ty += vec2.y;
        }
        return this;
    }
    scale(vec2) {
        const a = typeof vec2.x !== 'undefined' ? vec2.x : 1;
        const d = typeof vec2.y !== 'undefined' ? vec2.y : 1;
        // tslint:disable:object-shorthand-properties-first
        return this.multiply({
            a, c: 0, tx: 0,
            b: 0, d, ty: 0,
        });
        // tslint:enable:object-shorthand-properties-first
    }
    rotate(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return this.multiply({
            a: cos, c: -sin, tx: 0,
            b: sin, d: -cos, ty: 0,
        });
    }
    skew(vec2) {
        const c = Math.tan(vec2.x);
        const b = Math.tan(vec2.y);
        // tslint:disable:object-shorthand-properties-first
        return this.multiply({
            a: 1, c, tx: 0,
            b, d: 1, ty: 0,
        });
        // tslint:enable:object-shorthand-properties-first
    }
    invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error('The matrix is not inversible since it would require a division through zero');
        }
        return new TransformationMatrix2(this.d / det, -this.c / det, (this.c * this.ty - this.d * this.tx) / det, -this.b / det, this.a / det, (-this.a * this.ty + this.b * this.tx) / det);
    }
    multiply(other) {
        const { a, b, c, d, tx, ty } = this;
        this.a = a * other.a + c * other.b;
        this.b = b * other.a + d * other.b;
        this.c = a * other.c + c * other.d;
        this.d = b * other.c + d * other.d;
        this.tx = a * other.tx + c * other.ty + tx;
        this.ty = b * other.tx + d * other.ty + ty;
        return this;
    }
    project(vec) {
        vec.x = this.a * vec.x + this.c * vec.y + this.tx;
        vec.y = this.b * vec.x + this.d * vec.y + this.ty;
        return this;
    }
    copy() {
        return TransformationMatrix2.fromLiteral(this);
    }
    toTuple() {
        return [
            [this.a, this.c, this.tx],
            [this.b, this.d, this.ty],
        ];
    }
    toString() {
        return `transform-matrix2(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`;
    }
    static fromTuple(tuple) {
        return new TransformationMatrix2(tuple[0][0], tuple[0][1], tuple[0][2], tuple[1][0], tuple[1][1], tuple[1][2]);
    }
    static fromLiteral(literal) {
        return new TransformationMatrix2(literal.a, literal.c, literal.tx, literal.b, literal.d, literal.ty);
    }
}
exports.TransformationMatrix2 = TransformationMatrix2;
class TransformationMatrix2View extends TransformationMatrix2 {
    constructor(data, offset = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }
    get a() {
        return this.data[this.offset];
    }
    set a(value) {
        this.data[this.offset] = value;
    }
    get c() {
        return this.data[this.offset + 1];
    }
    set c(value) {
        this.data[this.offset + 1] = value;
    }
    get tx() {
        return this.data[this.offset + 2];
    }
    set tx(value) {
        this.data[this.offset + 2] = value;
    }
    get b() {
        return this.data[this.offset + 3];
    }
    set b(value) {
        this.data[this.offset + 3] = value;
    }
    get d() {
        return this.data[this.offset + 4];
    }
    set d(value) {
        this.data[this.offset + 4] = value;
    }
    get ty() {
        return this.data[this.offset + 5];
    }
    set ty(value) {
        this.data[this.offset + 5] = value;
    }
}
exports.TransformationMatrix2View = TransformationMatrix2View;
TransformationMatrix2View.LENGTH = 6;
