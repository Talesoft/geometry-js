const { min, max, PI } = Math;
export const epsilon = 0.00001;
export const epsilonNormalSqrt = 1e-15;
export const rad = PI / 180;
export const deg = 180 / PI;
export function degToRad(degrees) {
    return degrees * rad;
}
export function radToDeg(radians) {
    return radians * deg;
}
export function clamp(minValue, value, maxValue) {
    return max(minValue, min(value, maxValue));
}
export function clamp01(value) {
    return clamp(0, value, 1);
}
//# sourceMappingURL=Math.js.map