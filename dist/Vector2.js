import { clamp, clamp01, epsilon } from "./Math.js";
const { sqrt, acos, min, max } = Math;
export default class Vector2 {
    constructor(x, y) {
        this.x = 0;
        this.y = 0;
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
    set(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x = vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.y = vec2.y;
        }
        return this;
    }
    add(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x += vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.y += vec2.y;
        }
        return this;
    }
    subtract(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x -= vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.y -= vec2.y;
        }
        return this;
    }
    multiply(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x *= vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.y *= vec2.y;
        }
        return this;
    }
    divide(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x /= vec2.x;
        }
        if (typeof vec2.y !== 'undefined') {
            this.y /= vec2.y;
        }
        return this;
    }
    negate() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    min(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x = min(this.x, vec2.x);
        }
        if (typeof vec2.y !== 'undefined') {
            this.y = min(this.y, vec2.y);
        }
        return this;
    }
    max(vec2) {
        if (typeof vec2.x !== 'undefined') {
            this.x = max(this.x, vec2.x);
        }
        if (typeof vec2.y !== 'undefined') {
            this.y = max(this.y, vec2.y);
        }
        return this;
    }
    clamp(minValue, maxValue) {
        this.x = clamp(minValue, this.x, maxValue);
        this.y = clamp(minValue, this.y, maxValue);
        return this;
    }
    clamp01() {
        return this.clamp(0, 1);
    }
    normalize() {
        let mag = this.magnitude;
        if (mag !== 0) {
            this.x /= mag;
            this.y /= mag;
        }
        return this;
    }
    ;
    lerp(vec2, t) {
        return this.lerpUnclamped(vec2, clamp01(t));
    }
    lerpUnclamped(vec2, t) {
        return this.add({
            x: (vec2.x - this.x) * t,
            y: (vec2.y - this.y) * t
        });
    }
    perp() {
        const x = this.x;
        this.x = this.y;
        this.y = -x;
        return this;
    }
    ;
    moveTowards(vec2, maxDistanceDelta) {
        let toVector = vec2.copy().subtract(this);
        let dist = toVector.magnitude;
        if (dist <= maxDistanceDelta || dist == 0) {
            return this;
        }
        let divisor = dist * maxDistanceDelta;
        this.add(toVector);
        this.x /= divisor;
        this.y /= divisor;
        return this;
    }
    moveBy(amount, direction) {
        return this.add({
            x: direction.x * amount,
            y: direction.y * amount
        });
    }
    getDotProduct(vec2) {
        return this.x * vec2.x + this.y * vec2.y;
    }
    getAngleTo(vec2) {
        let denominator = sqrt(this.length * vec2.length);
        if (denominator < epsilon) {
            return 0;
        }
        let dot = clamp(-1, this.getDotProduct(vec2) / denominator, 1);
        return acos(dot);
    }
    getDistanceTo(vec2) {
        return this.copy().subtract(vec2).magnitude;
    }
    equals(vec2) {
        return this.x === vec2.x && this.y === vec2.y;
    }
    isZero() {
        return this.x === 0 && this.y === 0;
    }
    isOne() {
        return this.x === 1 && this.y === 1;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    toTuple() {
        return [this.x, this.y];
    }
    toString() {
        return `vec2(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`;
    }
    static fromTuple(tuple) {
        return new Vector2(...tuple);
    }
}
Vector2.zero = new Vector2(0, 0);
Vector2.one = new Vector2(1, 1);
Vector2.up = new Vector2(0, 1);
Vector2.down = new Vector2(0, -1);
Vector2.left = new Vector2(-1, 0);
Vector2.right = new Vector2(1, 0);
Vector2.infinity = new Vector2(Infinity, Infinity);
Vector2.negativeInfinity = new Vector2(-Infinity, -Infinity);
//# sourceMappingURL=Vector2.js.map