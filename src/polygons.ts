import { Circle, CircleCollidable } from './circles';
import { Edge, EdgeCollidable } from './edges';
import { TransformationMatrix2d } from './matrices';
import { Rectangle, RectangleCollidable } from './rectangles';
import { Vector2, Vector2View } from './vectors';

export type PolygonTuple = Array<[number, number]>;

const { min, max } = Math;

export interface PolygonCollidable {
    overlapsPolygon(poly: Polygon): boolean;
    intersectPolygon(poly: Polygon): Vector2[];
}

export class Polygon implements EdgeCollidable, PolygonCollidable, RectangleCollidable, CircleCollidable {
    public readonly vertices: readonly Vector2[] = [];

    constructor(vertices: readonly Vector2[] = []) {
        this.vertices = vertices;
    }

    get center() {
        const len = this.vertices.length;
        return this.vertices
            .reduce((carry, vec2) => carry.add(vec2), new Vector2())
            .divide({ x: len, y: len });
    }

    get bounds() {
        const len = this.vertices.length;
        if (len === 0) {
            return new Rectangle();
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
        return new Rectangle(minX, minY, maxX - minX, maxY - minY);
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
            edges.push(new Edge(last, vec2));
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

    set x(value: number) {
        const diff = value - this.x;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].x += diff;
        }
    }

    get y() {
        return this.bounds.y;
    }

    set y(value: number) {
        const diff = value - this.y;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].y += diff;
        }
    }

    get width(): number {
        return this.bounds.width;
    }

    set width(value: number) {
        const ratio = value / this.width;
        const x = this.x;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].x = x + (this.vertices[i].x - x) * ratio;
        }
    }

    get height(): number {
        return this.bounds.height;
    }

    set height(value: number) {
        const ratio = value / this.height;
        const y = this.y;
        for (let i = 0, len = this.vertices.length; i < len; i += 1) {
            this.vertices[i].y = y + (this.vertices[i].y - y) * ratio;
        }
    }

    public contains(vec2: Vector2) {
        const bounds = this.bounds;
        if (!bounds.contains(vec2)) {
            return false;
        }

        const ray = new Edge(vec2, bounds.leftTop.subtract({ x: 1, y: 1 }));
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
    public overlapsEdge(edge: Edge) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectEdge(edge: Edge) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsRectangle(rect: Rectangle) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectRectangle(rect: Rectangle) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public overlapsCircle(circle: Circle) {
        throw new Error('Not implemented');
    }

    // @ts-ignore
    public intersectCircle(circle: Circle) {
        throw new Error('Not implemented');
    }

    public overlapsPolygon(poly: Polygon) {
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

    public intersectPolygon(poly: Polygon) {
        const intersections: Vector2[] = [];
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

    public copy() {
        return new Polygon(this.vertices.map(v => v.copy()));
    }

    public transform(matrix: TransformationMatrix2d) {
        for (let i = 0; i < this.vertices.length; i += 1) {
            this.vertices[i].transform(matrix);
        }
    }

    public toTuple() {
        return this.vertices.map(vec2 => vec2.toTuple());
    }

    public toString() {
        return `poly(${this.vertices.map(vec2 => vec2.toString()).join(', ')}`;
    }

    public static fromTuple(tuple: PolygonTuple): Polygon {
        return new Polygon(tuple.map(([x, y]) => new Vector2(x, y)));
    }
}

export class PolygonView extends Polygon {
    public data: number[];
    public offset: number;

    constructor(data: number[], offset: number = 0) {
        const vertices: Vector2View[] = [];
        for (let i = 0; i < data.length; i += Vector2View.LENGTH) {
            vertices.push(new Vector2View(data, offset + i));
        }
        super(vertices);
        this.data = data;
        this.offset = offset;
    }

    public copy(): PolygonView {
        return new PolygonView(this.data, this.offset);
    }
}
