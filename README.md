Geometry JS
===========

[![Build status](https://img.shields.io/travis/agrora/decimal-js/master.svg?style=flat-square)](https://travis-ci.org/agrora/decimal-js)
[![Coverage](https://img.shields.io/codeclimate/coverage/Agrora/decimal-js.svg)](https://codecov.io/github/Agrora/decimal-js?branch=master)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@agrora/decimal.svg)](https://snyk.io/package/npm/@agrora/decimal)

A geometry data structure & calculation library.

Installation
------------

```bash
npm i @talesoft/geometry
```

Docs coming soon.

Usage
-----

### 2D Vectors

```javascript
import { Vector2 } from '@talesoft/geometry';

const vec = new Vector2(14, 25);
vec.moveTowards({ x: 100, y: 200 }, 40);
```

**Full API:**

```typescript
interface Vector2Literal {
    x: number
    y: number
}

type Vector2Tuple = readonly [number, number]

class Vector2 {
    x: number
    y: number

    readonly length: number
    readonly magnitude: number

    constructor(x?: number = 0, y?: number = 0);

    set(vec2: Partial<Vector2Literal>): this
    add(vec2: Partial<Vector2Literal>): this
    subtract(vec2: Partial<Vector2Literal>): this
    multiply(vec2: Partial<Vector2Literal>): this
    divide(vec2: Partial<Vector2Literal>): this
    negate(): this
    min(vec2: Vector2Literal): this
    max(vec2: Vector2Literal): this
    clamp(minValue: number, maxValue: number): this
    clamp01(): this
    normalize(): this
    lerp(vec2: Vector2Literal, t: number): this
    lerpUnclamped(vec2: Vector2Literal, t: number): this
    perp(): this
    moveTowards(vec2: Vector2Literal, maxDistanceDelta: number): this
    moveBy(amount: number, direction: Vector2): this
    getDotProduct(vec2: Vector2Literal): number
    getAngleTo(vec2: Vector2): number
    getDistanceTo(vec2: Vector2Literal): number
    equals(vec2: Vector2Literal): boolean
    isZero(): boolean
    isOne(): boolean
    copy(): Vector2
    transform(matrix: TransformationMatrix2d): this
    toTuple(): Vector2Tuple
    toLiteral(): Vector2Literal
    toString(): string

    static readonly zero: Readonly<Vector2> = new Vector2(0, 0)
    static readonly one: Readonly<Vector2> = new Vector2(1, 1)
    static readonly up: Readonly<Vector2> = new Vector2(0, 1)
    static readonly down: Readonly<Vector2> = new Vector2(0, -1)
    static readonly left: Readonly<Vector2> = new Vector2(-1, 0)
    static readonly right: Readonly<Vector2> = new Vector2(1, 0)
    static readonly infinity: Readonly<Vector2> = new Vector2(Infinity, Infinity)
    static readonly negativeInfinity: Readonly<Vector2> = new Vector2(-Infinity, -Infinity)

    static fromTuple(tuple: Vector2Tuple): Vector2
    static fromLiteral(literal: Vector2Literal): Vector2
}
```

### Edges

```typescript
import { Edge, Vector2 } from '@talesoft/geometry';

const edge = new Edge(new Vector2(1, 1), new Vector2(10, 10));
console.log(edge.length);

const intersection = edge.intersectEdge(someOtherEdge);
```

**Full API:**

```typescript
interface EdgeLiteral {
    from: Vector2Literal
    to: Vector2Literal
}

type EdgeTuple = readonly [number, number, number, number]

class Edge {
    from: Vector2
    to: Vector2

    readonly length: number
    readonly center: Vector2
    readonly normal: Vector2

    constructor(from: Vector2, to: Vector2)

    intersectEdge(edge: Edge, ray?: boolean): Vector2 | null
    toTuple(): EdgeTuple
    toLiteral(): Readonly<EdgeLiteral>

    static fromTuple(tuple: EdgeTuple): Edge
    static fromLiteral(literal: Readonly<EdgeLiteral>): Edge
}
```

Contributing
------------

Before contributing, check out the [Contribution Guidelines][contribution-guidelines]

Requires: [npm][nodejs-download]

```bash
// Pull project
git clone https://github.com/Talesoft/geometry-js

// Enter project directory
cd geometry-js

// Install development dependencies
npm install

// ... make your changes ...

// Run tests
npm run test

// Lint
npm run lint

// Fix linting problems
npm run lint:fix

// Build
npm run build

// ... create branch, commit, push, merge request etc. ...
```

[contribution-guidelines]: https://...coming-soon...
[nodejs-download]: https://nodejs.org/en/



