"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { min, max, PI } = Math;
exports.EPSILON = 0.00001;
exports.EPSILON_NORMAL_SQRT = 1e-15;
exports.RAD = 180 / PI;
exports.DEG = PI / 180;
function radToDeg(degrees) {
    return degrees * exports.RAD;
}
exports.radToDeg = radToDeg;
function degToRad(radians) {
    return radians * exports.DEG;
}
exports.degToRad = degToRad;
function clamp(minValue, value, maxValue) {
    return max(minValue, min(value, maxValue));
}
exports.clamp = clamp;
function clamp01(value) {
    return clamp(0, value, 1);
}
exports.clamp01 = clamp01;
function extractX(item) {
    return item.x;
}
exports.extractX = extractX;
function extractY(item) {
    return item.y;
}
exports.extractY = extractY;
