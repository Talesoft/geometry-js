export declare const EPSILON = 0.00001;
export declare const EPSILON_NORMAL_SQRT = 1e-15;
export declare const RAD: number;
export declare const DEG: number;
export declare function radToDeg(degrees: number): number;
export declare function degToRad(radians: number): number;
export declare function clamp(minValue: number, value: number, maxValue: number): number;
export declare function clamp01(value: number): number;
export declare function extractX(item: ({
    x: number;
})): number;
export declare function extractY(item: ({
    y: number;
})): number;
