import { NumericArray, NumericArrayConstructor } from './common';
export declare type GeometryView<T> = new (data: NumericArray, offset: number) => T;
export interface FixedGeometryView<T> extends GeometryView<T> {
    readonly SIZE: number;
}
/**
 * @experimental
 */
export declare class FixedGeometryViewBuilder {
    readonly views: Array<FixedGeometryView<unknown>>;
    constructor(views?: Array<FixedGeometryView<unknown>>);
    readonly length: number;
    read(data: NumericArray, offset?: number): unknown[];
    create(arrayConstructor?: NumericArrayConstructor): (unknown[] | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array)[];
}
