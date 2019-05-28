import Polygon, { PolygonTuple } from './Polygon';
import Vector2View from './Vector2View';

export default class PolygonView extends Polygon {
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

    public static fromTuple(tuple: PolygonTuple): Polygon {
        return new PolygonView(tuple.reduce((result: number[], value: number[]) => result.concat(value), []));
    }
}
