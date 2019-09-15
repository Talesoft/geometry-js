const { min, max, PI } = Math;

export const EPSILON = 0.00001;
export const EPSILON_NORMAL_SQRT = 1e-15;
export const RAD = 180 / PI;
export const DEG = PI / 180;

export type NumericArray =
    number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array |
    Uint8ClampedArray | Float32Array | Float64Array;

export type NumericArrayConstructor = new (size: number) => NumericArray;

export function radToDeg(degrees: number) {
    return degrees * RAD;
}

export function degToRad(radians: number) {
    return radians * DEG;
}

export function clamp(minValue: number, value: number, maxValue: number) {
    return max(minValue, min(value, maxValue));
}

export function clamp01(value: number) {
    return clamp(0, value, 1);
}

export function extractX(item: ({x: number})) {
    return item.x;
}

export function extractY(item: ({y: number})) {
    return item.y;
}
