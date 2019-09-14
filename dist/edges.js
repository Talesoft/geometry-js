"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vectors_1 = require("./vectors");
class Edge {
    constructor(from, to) {
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
    intersectEdge(edge, ray = false) {
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
            return new vectors_1.Vector2(this.from.x + r * dx1, this.from.y + r * dy1);
        }
        return null;
    }
    copy() {
        return Edge.fromLiteral(this);
    }
    toTuple() {
        return [...this.from.toTuple(), ...this.to.toTuple()];
    }
    toLiteral() {
        return { from: this.from.toLiteral(), to: this.to.toLiteral() };
    }
    static fromTuple(tuple) {
        const [ax, ay, bx, by] = tuple;
        return new Edge(new vectors_1.Vector2(ax, ay), new vectors_1.Vector2(bx, by));
    }
    static fromLiteral(literal) {
        return new Edge(vectors_1.Vector2.fromLiteral(literal.from), vectors_1.Vector2.fromLiteral(literal.to));
    }
}
exports.Edge = Edge;
