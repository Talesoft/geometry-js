import Vector2 from "./Vector2.js";
import Rectangle from "./Rectangle.js";
import Edge from "./Edge.js";
const centerSymbol = Symbol('center');
const boundsSymbol = Symbol('bounds');
const edgesSymbol = Symbol('edges');
const edgeNormalsSymbol = Symbol('edgeNormals');
const edgeCentersSymbol = Symbol('edgeCenters');
const { min, max } = Math;
function createInvalidateHandler(poly, deep = true) {
    return {
        set: (target, p, value) => {
            if (deep && value instanceof Vector2) {
                value = new Proxy(value, createInvalidateHandler(poly, false));
            }
            target[p] = value;
            poly[centerSymbol]
                = poly[boundsSymbol]
                    = poly[edgesSymbol]
                        = poly[edgeNormalsSymbol]
                            = poly[edgeCentersSymbol]
                                = null;
            return true;
        }
    };
}
export default class Polygon {
    constructor(points = []) {
        this.vertices = new Proxy([], createInvalidateHandler(this));
        for (let i = 0, len = points.length; i < len; i++) {
            this.vertices.push(points[i]);
        }
        this[centerSymbol] = null;
        this[boundsSymbol] = null;
        this[edgesSymbol] = null;
        this[edgeNormalsSymbol] = null;
        this[edgeCentersSymbol] = null;
    }
    get center() {
        if (this[centerSymbol] !== null) {
            return this[centerSymbol];
        }
        let len = this.vertices.length;
        return this[centerSymbol] = this.vertices
            .reduce((carry, vec2) => carry.add(vec2), new Vector2)
            .divide({ x: len, y: len });
    }
    get bounds() {
        if (this[boundsSymbol] !== null) {
            return this[boundsSymbol];
        }
        let len = this.vertices.length;
        if (len === 0) {
            return this[boundsSymbol] = new Rectangle;
        }
        let minX, minY, maxX, maxY;
        for (let i = 0; i < len; i++) {
            let vec2 = this.vertices[i];
            minX = typeof minX === 'undefined' ? vec2.x : min(minX, vec2.x);
            minY = typeof minY === 'undefined' ? vec2.y : min(minY, vec2.y);
            maxX = typeof maxX === 'undefined' ? vec2.x : max(maxX, vec2.x);
            maxY = typeof maxY === 'undefined' ? vec2.y : max(maxY, vec2.y);
        }
        return this[boundsSymbol] = new Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    get edges() {
        if (this[edgesSymbol] !== null) {
            return this[edgesSymbol];
        }
        let vertices = this.vertices;
        let len = vertices.length;
        if (len < 2) {
            return [];
        }
        let edges = [];
        let last = vertices[len - 1];
        for (let i = 0; i < len; i++) {
            let vec2 = vertices[i];
            edges.push(new Edge(last, vec2));
            last = vec2;
        }
        return this[edgesSymbol] = edges;
    }
    get edgeNormals() {
        if (this[edgeNormalsSymbol] !== null) {
            return this[edgeNormalsSymbol];
        }
        return this[edgeNormalsSymbol] = this.edges.map(edge => edge.normal);
    }
    get edgeCenters() {
        if (this[edgeCentersSymbol] !== null) {
            return this[edgeCentersSymbol];
        }
        return this[edgeCentersSymbol] = this.edges.map(edge => edge.center);
    }
    get x() {
        return this.bounds.x;
    }
    set x(value) {
        let diff = value - this.x;
        for (let i = 0, len = this.vertices.length; i < len; i++) {
            this.vertices[i].x += diff;
        }
    }
    get y() {
        return this.bounds.y;
    }
    set y(value) {
        let diff = value - this.y;
        for (let i = 0, len = this.vertices.length; i < len; i++) {
            this.vertices[i].y += diff;
        }
    }
    get width() {
        return this.bounds.width;
    }
    set width(value) {
        let ratio = value / this.width, x = this.x;
        for (let i = 0, len = this.vertices.length; i < len; i++) {
            this.vertices[i].x = x + (this.vertices[i].x - x) * ratio;
        }
    }
    get height() {
        return this.bounds.height;
    }
    set height(value) {
        let ratio = value / this.height, y = this.y;
        for (let i = 0, len = this.vertices.length; i < len; i++) {
            this.vertices[i].y = y + (this.vertices[i].y - y) * ratio;
        }
    }
    contains(vec2) {
        const bounds = this.bounds;
        if (!bounds.contains(vec2)) {
            return false;
        }
        const ray = new Edge(vec2, bounds.leftTop.subtract({ x: 1, y: 1 }));
        let intersections = 0;
        const edges = this.edges;
        for (let i = 0, len = edges.length; i < len; i++) {
            const edge = edges[i];
            if (ray.intersectEdge(edge, true) !== null) {
                intersections++;
            }
        }
        return intersections % 2 !== 0;
    }
    //TODO: overlapsEdge(edge: Edge): boolean
    //TODO: intersectEdge(edge: Edge): Vector2
    //TODO: overlapsRectangle(rect: Rectangle): boolean
    //TODO: intersectRectnalge(rect: Rectangle): Vector2
    //TODO: overlapsCircle(circle: Circle): boolean
    //TODO: intersectCircle(circle: Circle): Vector2
    overlapsPolygon(poly) {
        const edges = this.edges;
        const len = edges.length;
        const polyEdges = poly.edges;
        const polyEdgesLen = polyEdges.length;
        for (let i = 0; i < len; i++) {
            const edge = edges[i];
            for (let j = 0; j < polyEdgesLen; j++) {
                if (edge.intersectEdge(polyEdges[j])) {
                    return true;
                }
            }
        }
        return false;
    }
    intersectPolygon(poly) {
        let intersections = [];
        let edges = this.edges;
        let polyEdges = poly.edges;
        let polyEdgesLen = polyEdges.length;
        let intersection;
        for (let i = 0, len = edges.length; i < len; i++) {
            let edge = edges[i];
            for (let j = 0; j < polyEdgesLen; j++) {
                if ((intersection = edge.intersectEdge(polyEdges[j])) !== null) {
                    intersections.push(intersection);
                }
            }
        }
        return intersections;
    }
    toTuple() {
        return this.vertices.map(vec2 => vec2.toTuple());
    }
    toString() {
        return `poly(${this.vertices.map(vec2 => vec2.toString()).join(', ')}`;
    }
    static fromTuple(tuple) {
        return new Polygon(tuple.map(([x, y]) => new Vector2(x, y)));
    }
}
//# sourceMappingURL=Polygon.js.map