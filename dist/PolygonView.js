"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Polygon_1 = __importDefault(require("./Polygon"));
const Vector2View_1 = __importDefault(require("./Vector2View"));
class PolygonView extends Polygon_1.default {
    constructor(data, offset = 0) {
        const vertices = [];
        for (let i = 0; i < data.length; i += Vector2View_1.default.LENGTH) {
            vertices.push(new Vector2View_1.default(data, offset + i));
        }
        super(vertices);
        this.data = data;
        this.offset = offset;
    }
    copy() {
        return new PolygonView(this.data, this.offset);
    }
    static fromTuple(tuple) {
        return new PolygonView(tuple.reduce((result, value) => result.concat(value), []));
    }
}
exports.default = PolygonView;
