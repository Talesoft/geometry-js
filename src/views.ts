import { NumericArray, NumericArrayConstructor } from './common';

export type GeometryView<T> = new (data: NumericArray, offset: number) => T;

export interface FixedGeometryView<T> extends GeometryView<T> {
    readonly SIZE: number;
}

/**
 * @experimental
 */
export class FixedGeometryViewBuilder {
    public readonly views: Array<FixedGeometryView<unknown>>;

    constructor(views: Array<FixedGeometryView<unknown>> = []) {
        this.views = views;
    }

    get length() {
        return this.views.reduce((length, View) => length + View.SIZE, 0);
    }

    public read(data: NumericArray, offset: number = 0) {
        if (data.length - offset < this.length) {
            throw new Error('Failed to read Geometry views from array: Array not long enough');
        }
        let currentOffset = offset;
        return this.views.map(View => {
            const view = new View(data, currentOffset);
            currentOffset += View.SIZE;
            return view;
        });
    }

    public create(arrayConstructor: NumericArrayConstructor = Int32Array) {
        const data = new arrayConstructor(this.length);
        return [data, this.read(data)];
    }
}
