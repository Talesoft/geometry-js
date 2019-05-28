import { clamp, clamp01, EPSILON } from './common';

const { sqrt, acos, min, max } = Math;

export interface Vector2Literal {
    x: number;
    y: number;
}

export type Vector2Tuple = [number, number];

export default class Vector2 implements Vector2Literal {
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

    get length(): number {
        return this.x * this.x + this.y * this.y;
    }

    get magnitude(): number {
        return sqrt(this.length);
    }

    public set(vec2: Partial<Vector2Literal>): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x = vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = vec2.y;
        }
        return this;
    }

    public add(vec2: Partial<Vector2Literal>): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x += vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y += vec2.y;
        }
        return this;
    }

    public subtract(vec2: Partial<Vector2Literal>): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x -= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y -= vec2.y;
        }
        return this;
    }

    public multiply(vec2: Partial<Vector2Literal>): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x *= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y *= vec2.y;
        }
        return this;
    }

    public divide(vec2: Partial<Vector2Literal>): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x /= vec2.x;
        }

        if (typeof vec2.y !== 'undefined') {
            this.y /= vec2.y;
        }
        return this;
    }

    public negate(): Vector2 {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public min(vec2: Vector2Literal): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x = min(this.x, vec2.x);
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = min(this.y, vec2.y);
        }
        return this;
    }

    public max(vec2: Vector2Literal): Vector2 {
        if (typeof vec2.x !== 'undefined') {
            this.x = max(this.x, vec2.x);
        }

        if (typeof vec2.y !== 'undefined') {
            this.y = max(this.y, vec2.y);
        }
        return this;
    }

    public clamp(minValue: number, maxValue: number): Vector2 {
        this.x = clamp(minValue, this.x, maxValue);
        this.y = clamp(minValue, this.y, maxValue);
        return this;
    }

    public clamp01(): Vector2 {
        return this.clamp(0, 1);
    }

    public normalize(): Vector2 {
        const mag = this.magnitude;
        if (mag !== 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }

    public lerp(vec2: Vector2Literal, t: number): Vector2 {
        return this.lerpUnclamped(vec2, clamp01(t));
    }

    public lerpUnclamped(vec2: Vector2Literal, t: number): Vector2 {
        return this.add({
            x: (vec2.x - this.x) * t,
            y: (vec2.y - this.y) * t,
        });
    }

    public perp(): Vector2 {
        const x = this.x;
        this.x = this.y;
        this.y = -x;
        return this;
    }

    public moveTowards(vec2: Vector2, maxDistanceDelta: number): Vector2 {
        const toVector = vec2.copy().subtract(this);
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

    public moveBy(amount: number, direction: Vector2): Vector2 {
        return this.add({
            x: direction.x * amount,
            y: direction.y * amount,
        });
    }

    public getDotProduct(vec2: Vector2Literal): number {
        return this.x * vec2.x + this.y * vec2.y;
    }

    public getAngleTo(vec2: Vector2): number {
        const denominator = sqrt(this.length * vec2.length);
        if (denominator < EPSILON) {
            return 0;
        }
        const dot = clamp(-1, this.getDotProduct(vec2) / denominator, 1);
        return acos(dot);
    }

    public getDistanceTo(vec2: Vector2Literal): number {
        return this.copy().subtract(vec2).magnitude;
    }

    public equals(vec2: Vector2Literal): boolean {
        return this.x === vec2.x && this.y === vec2.y;
    }

    public isZero(): boolean {
        return this.x === 0 && this.y === 0;
    }

    public isOne(): boolean {
        return this.x === 1 && this.y === 1;
    }

    public copy(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public toTuple(): Vector2Tuple {
        return [this.x, this.y];
    }

    public toString(): string {
        return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }

    public static fromTuple(tuple: Vector2Tuple): Vector2 {
        return new Vector2(...tuple);
    }
}
