const { min, max, PI } = Math;

export const EPSILON = 0.00001;
export const EPSILON_NORMAL_SQRT = 1e-15;
export const RAD = 180 / PI;
export const DEG = PI / 180;

export function radToDeg(degrees: number): number {
    return degrees * RAD;
}

export function degToRad(radians: number): number {
    return radians * DEG;
}

export function clamp(minValue: number, value: number, maxValue: number): number {
    return max(minValue, min(value, maxValue));
}

export function clamp01(value: number): number {
    return clamp(0, value, 1);
}

export function extractX(item: ({x: number})): number {
    return item.x;
}

export function extractY(item: ({y: number})): number {
    return item.y;
}