"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @experimental
 */
class FixedGeometryViewBuilder {
    constructor(views = []) {
        this.views = views;
    }
    get length() {
        return this.views.reduce((length, View) => length + View.SIZE, 0);
    }
    read(data, offset = 0) {
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
    create(arrayConstructor = Int32Array) {
        const data = new arrayConstructor(this.length);
        return [data, this.read(data)];
    }
}
exports.FixedGeometryViewBuilder = FixedGeometryViewBuilder;
