"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransformationMatrix2 {
    constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
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
    identity() {
        this.a = 1;
        this.b = 0;
        this.c = 0;
        this.d = 1;
        this.tx = 0;
        this.ty = 0;
        return this;
    }
    translate(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.tx += vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.tx += vec2.y;
        }
        return this;
    }
    scale(vec2) {
        return this.multiply(new TransformationMatrix2(typeof vec2.x !== 'undefined' ? vec2.x : 1, 0, 0, typeof vec2.y !== 'undefined' ? vec2.y : 1, 0, 0));
    }
    rotate(radians) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        return this.multiply(new TransformationMatrix2(cos, sin, -sin, -cos, 0, 0));
    }
    skew(vec2) {
        return this.multiply(new TransformationMatrix2(1, Math.tan(vec2.y), Math.tan(vec2.x), 1, 0, 0));
    }
    invert() {
        const det = this.determinant;
        if (det === 0) {
            throw new Error('The matrix is not inversible since it would require a division through zero');
        }
        return new TransformationMatrix2(this.d / det, -this.b / det, -this.c / det, this.a / det, (this.c * this.ty - this.d * this.tx) / det, (-this.a * this.ty + this.b * this.tx) / det);
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
    toString() {
        return `matrix2(${this.a}, ${this.b}, ${this.c}, ${this.d}, ${this.tx}, ${this.ty})`;
    }
}
exports.TransformationMatrix2 = TransformationMatrix2;
