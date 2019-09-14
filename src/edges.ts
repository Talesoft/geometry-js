import { Vector2, Vector2Literal } from './vectors';

export type EdgeTuple = readonly [number, number, number, number];

export interface EdgeLiteral {
    from: Vector2Literal;
    to: Vector2Literal;
}

export interface EdgeCollidable {
    overlapsEdge(edge: Edge): boolean;
    intersectEdge(edge: Edge): Vector2[];
}

export class Edge implements EdgeLiteral {
    public from: Vector2;
    public to: Vector2;

    constructor(from: Vector2, to: Vector2) {
        this.from = from;
        this.to = to;
    }

    get length() {
        return this.from.getDistanceTo(this.to);
    }

    get center() {
        return this.from.copy().add(this.to).divide({ x: 2, y: 2 });
    }

    get normal() {
        return this.to.copy().subtract(this.from).perp().normalize();
    }

    public intersectEdge(edge: Edge, ray: boolean = false) {
        const dx1 = this.to.x - this.from.x;
        const dy1 = this.to.y - this.from.y;
        const dx2 = this.from.x - edge.from.x;
        const dy2 = this.from.y - edge.from.y;
        const dx3 = edge.to.x - edge.from.x;
        const dy3 = edge.to.y - edge.from.y;
        if (dy1 / dx1 === dy3 / dx3) {
            return null;
        }
        const d = dx1 * dy3 - dy1 * dx3;
        if (d === 0) {
            return null;
        }
        const r = (dy2 * dx3 - dx2 * dy3) / d;
        const s = (dy2 * dx1 - dx2 * dy1) / d;
        if ((r >= 0 && (ray || r <= 1)) && s >= 0 && s <= 1) {
            return new Vector2(this.from.x + r * dx1, this.from.y + r * dy1);
        }
        return null;
    }

    public copy() {
        return Edge.fromLiteral(this);
    }

    public toTuple() {
        return [...this.from.toTuple(), ...this.to.toTuple()] as any as EdgeTuple;
    }

    public toLiteral() {
        return { from: this.from.toLiteral(), to: this.to.toLiteral() } as const;
    }

    public static fromTuple(tuple: EdgeTuple) {
        const [ax, ay, bx, by] = tuple;
        return new Edge(new Vector2(ax, ay), new Vector2(bx, by));
    }

    public static fromLiteral(literal: Readonly<EdgeLiteral>) {
        return new Edge(Vector2.fromLiteral(literal.from), Vector2.fromLiteral(literal.to));
    }
}
