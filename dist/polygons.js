"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edges_1 = require("./edges");
const rectangles_1 = require("./rectangles");
const vectors_1 = require("./vectors");
const { min, max } = Math;
class Polygon {
    constructor(vertices = []) {
        this.vertices = [];
        this.vertices = vertices;
    }
    get center() {
        const len = this.vertices.length;
        return this.vertices
            .reduce((carry, vec2) => carry.add(vec2), new vectors_1.Vector2())
            .divide({ x: len, y: len });
    }
    get bounds() {
        const len = this.vertices.length;
        if (len === 0) {
            return new rectangles_1.Rectangle();
        }
        let minX = this.vertices[0].x;
        let minY = this.vertices[0].y;
        let maxX = minX;
        let maxY = minY;
        // Start at 1 as 0 is already covered above (minX, minY)
        for (let i = 1; i < len; i += 1) {
            const vec2 = this.vertices[i];
            minX = min(minX, vec2.x);
            minY = min(minY, vec2.y);
            maxX = max(maxX, vec2.x);
            maxY = max(maxY, vec2.y);
        }
        return new rectangles_1.Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    get edges() {
        const vertices = this.vertices;
        const len = vertices.length;
        if (len < 2) {
            return [];
        }
        const edges = [];
        let last = vertices[len - 1];
        for (let i = 0; i < len; i += 1) {
            const vec2 = vertices[i];
            edges.push(new edges_1.Edge(last, vec2));
            last = vec2;
        }
        return edges;
    }
    get edgeNormals() {
        return this.edges.map(edge => edge.normal);
    }
    get edgeCenters() {
        return this.edges.map(edge => edge.center);
    }
    get x() {
        return this.bounds.x;
    }
    set x(value) {
        const diff = value - this.x;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].x += diff;
        }
    }
    get y() {
        return this.bounds.y;
    }
    set y(value) {
        const diff = value - this.y;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].y += diff;
        }
    }
    get width() {
        return this.bounds.width;
    }
    set width(value) {
        const ratio = value / this.width;
        const x = this.x;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].x = x + (this.vertices[i].x - x) * ratio;
        }
    }
    get height() {
        return this.bounds.height;
    }
    set height(value) {
        const ratio = value / this.height;
        const y = this.y;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].y = y + (this.vertices[i].y - y) * ratio;
        }
    }
    contains(vec2) {
        const bounds = this.bounds;
        if (!bounds.contains(vec2)) {
            return false;
        }
        const ray = new edges_1.Edge(vec2, bounds.leftTop.subtract({ x: 1, y: 1 }));
        let intersections = 0;
        const edges = this.edges;
        for (let i = 0, len = edges.length; i < len; i += 1) {
            const edge = edges[i];
            if (ray.intersectEdge(edge, true) !== null) {
                intersections += 1;
            }
        }
        return intersections % 2 !== 0;
    }
    // @ts-ignore
    overlapsEdge(edge) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    intersectEdge(edge) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    overlapsRectangle(rect) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    intersectRectangle(rect) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    overlapsCircle(circle) {
        throw new Error('Not implemented');
    }
    // @ts-ignore
    intersectCircle(circle) {
        throw new Error('Not implemented');
    }
    overlapsPolygon(poly) {
        const edges = this.edges;
        const polyEdges = poly.edges;
        for (let i = 0; i < edges.length; i += 1) {
            const edge = edges[i];
            for (let j = 0; j < polyEdges.length; j += 1) {
                if (edge.intersectEdge(polyEdges[j])) {
                    return true;
                }
            }
        }
        return false;
    }
    intersectPolygon(poly) {
        const intersections = [];
        const edges = this.edges;
        const polyEdges = poly.edges;
        let intersection;
        for (let i = 0, len = edges.length; i < len; i += 1) {
            const edge = edges[i];
            for (let j = 0; j < polyEdges.length; j += 1) {
                intersection = edge.intersectEdge(polyEdges[j]);
                if (intersection !== null) {
                    intersections.push(intersection);
                }
            }
        }
        return intersections;
    }
    copy() {
        return new Polygon(this.vertices.map(v => v.copy()));
    }
    transform(matrix) {
        for (let i = 0; i < this.vertices.length; i += 1) {
            this.vertices[i].transform(matrix);
        }
    }
    toTuple() {
        return this.vertices.map(vec2 => vec2.toTuple());
    }
    toString() {
        return `poly(${this.vertices.map(vec2 => vec2.toString()).join(', ')}`;
    }
    static fromTuple(tuple) {
        return new Polygon(tuple.map(([x, y]) => new vectors_1.Vector2(x, y)));
    }
}
exports.Polygon = Polygon;
class PolygonView extends Polygon {
    constructor(data, offset = 0) {
        const vertices = [];
        for (let i = 0; i < data.length; i += vectors_1.Vector2View.SIZE) {
            vertices.push(new vectors_1.Vector2View(data, offset + i));
        }
        super(vertices);
        this.data = data;
        this.offset = offset;
    }
}
exports.PolygonView = PolygonView;
