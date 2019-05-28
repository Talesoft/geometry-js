import Polygon, { PolygonTuple } from './Polygon';
export default class PolygonView extends Polygon {
    data: number[];
    offset: number;
    constructor(data: number[], offset?: number);
    copy(): PolygonView;
    static fromTuple(tuple: PolygonTuple): Polygon;
}
