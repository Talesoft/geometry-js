import { clamp, clamp01, EPSILON, NumericArray } from './common';
import { TransformationMatrix2 } from './matrices';

const { sqrt, acos, min, max } = Math;

export interface Vector2Literal {
    x: number;
    y: number;
}

export type Vector2Tuple = readonly [number, number];

export class Vector2 implements Vector2Literal {
    public static readonly zero: Readonly<Vector2> = new Vector2(0, 0);
    public static readonly one: Readonly<Vector2> = new Vector2(1, 1);
    public static readonly up: Readonly<Vector2> = new Vector2(0, 1);
    public static readonly down: Readonly<Vector2> = new Vector2(0, -1);
    public static readonly left: Readonly<Vector2> = new Vector2(-1, 0);
    public static readonly right: Readonly<Vector2> = new Vector2(1, 0);
    public static readonly infinity: Readonly<Vector2> = new Vector2(Infinity, Infinity);
    public static readonly negativeInfinity: Readonly<Vector2> = new Vector2(-Infinity, -Infinity);

    public x: number = 0;
    public y: number = 0;

    constructor(x?: number, y?: number) {
        if (typeof x !== 'undefined') {
            this.x = x;
        }

        if (typeof y !== 'undefined') {
            this.y = y;
        }
    }

    get length() {
        return this.x * this.x + this.y * this.y;
    }

    get magnitude() {
        return sqrt(this.length);
    }

    public set(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.x = vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = vec2.y;
        }
        return this;
    }

    public add(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.x += vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y += vec2.y;
        }
        return this;
    }

    public subtract(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.x -= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y -= vec2.y;
        }
        return this;
    }

    public multiply(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.x *= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y *= vec2.y;
        }
        return this;
    }

    public divide(vec2: Partial<Readonly<Vector2Literal>>) {
        if (typeof vec2.x !== 'undefined') {
            this.x /= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y /= vec2.y;
        }
        return this;
    }

    public negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public min(vec2: Readonly<Vector2Literal>) {
        if (typeof vec2.x !== 'undefined') {
            this.x = min(this.x, vec2.x);
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = min(this.y, vec2.y);
        }
        return this;
    }

    public max(vec2: Readonly<Vector2Literal>) {
        if (typeof vec2.x !== 'undefined') {
            this.x = max(this.x, vec2.x);
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = max(this.y, vec2.y);
        }
        return this;
    }

    public clamp(minValue: number, maxValue: number) {
        this.x = clamp(minValue, this.x, maxValue);
        this.y = clamp(minValue, this.y, maxValue);
        return this;
    }

    public clamp01() {
        return this.clamp(0, 1);
    }

    public normalize() {
        const mag = this.magnitude;
        if (mag !== 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    public lerp(vec2: Readonly<Vector2Literal>, t: number) {
        return this.lerpUnclamped(vec2, clamp01(t));
    }

    public lerpUnclamped(vec2: Readonly<Vector2Literal>, t: number) {
        return this.add({
            x: (vec2.x - this.x) * t,
            y: (vec2.y - this.y) * t,
        });
    }

    public perp() {
        const x = this.x;
        // noinspection JSSuspiciousNameCombination
        this.x = this.y;
        this.y = -x;
        return this;
    }

    public moveTowards(vec2: Readonly<Vector2Literal>, maxDistanceDelta: number) {
        const toVector = Vector2.fromLiteral(vec2).subtract(this);
        const dist = toVector.magnitude;
        if (dist <= maxDistanceDelta || dist === 0) {
            return this;
        }
        const divisor = dist * maxDistanceDelta;
        this.add(toVector);
        this.x /= divisor;
        this.y /= divisor;
        return this;
    }

    public moveBy(amount: number, direction: Readonly<Vector2>) {
        return this.add({ x: direction.x * amount, y: direction.y * amount });
    }

    public getDotProduct(vec2: Readonly<Vector2Literal>) {
        return this.x * vec2.x + this.y * vec2.y;
    }

    public getAngleTo(vec2: Readonly<Vector2>): number {
        const denominator = sqrt(this.length * vec2.length);
        if (denominator < EPSILON) {
            return 0;
        }
        const dot = clamp(-1, this.getDotProduct(vec2) / denominator, 1);
        return acos(dot);
    }

    public getDistanceTo(vec2: Readonly<Vector2Literal>) {
        return this.copy().subtract(vec2).magnitude;
    }

    public equals(vec2: Readonly<Vector2Literal>) {
        return this.x === vec2.x && this.y === vec2.y;
    }

    public isZero() {
        return this.x === 0 && this.y === 0;
    }

    public isOne() {
        return this.x === 1 && this.y === 1;
    }

    public copy() {
        return Vector2.fromLiteral(this);
    }

    public transform(matrix: Readonly<TransformationMatrix2>) {
        matrix.project(this);
        return this;
    }

    public toTuple() {
        return [this.x, this.y] as const;
    }

    public toLiteral() {
        return { x: this.x, y: this.y };
    }

    public toString() {
        return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }

    public static fromTuple(tuple: Vector2Tuple) {
        return new Vector2(...tuple);
    }

    public static fromLiteral(literal: Readonly<Vector2Literal>) {
        return new Vector2(literal.x, literal.y);
    }
}

export class Vector2View extends Vector2 {
    public static readonly SIZE = 2;
    public readonly data: NumericArray;
    public readonly offset: number;

    constructor(data: NumericArray, offset: number = 0) {
        super();
        this.data = data;
        this.offset = offset;
    }

    get x() {
        return this.data[this.offset];
    }

    set x(value: number) {
        this.data[this.offset] = value;
    }

    get y() {
        return this.data[this.offset + 1];
    }

    set y(value: number) {
        this.data[this.offset + 1] = value;
    }
}
