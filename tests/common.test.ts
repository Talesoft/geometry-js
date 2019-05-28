import jestEach from 'jest-each';
import { clamp, clamp01, degToRad, radToDeg } from '../src/common';

const { PI } = Math;

describe('radToDeg', () => {
    jestEach`
        radians     | expectedDegrees
        ${0}        | ${0}
        ${1}        | ${57.295779513082323}
        ${PI / 2}   | ${90}
        ${2}        | ${114.59155902616465}
        ${3}        | ${171.88733853924697}
        ${PI}       | ${180}
        ${4}        | ${229.18311805232929}
        ${1.5 * PI} | ${270}
        ${5}        | ${286.47889756541161}
        ${2 * PI}   | ${360}
    `.it('should convert $radians radians to $expectedDegrees degrees', ({ radians, expectedDegrees }) => {
        expect(radToDeg(radians)).toBeCloseTo(expectedDegrees, 5);
    });
});

describe('degToRad', () => {
    jestEach`
        degrees               | expectedRadians
        ${0}                  | ${0}
        ${57.295779513082323} | ${1}
        ${90}                 | ${PI / 2}
        ${114.59155902616465} | ${2}
        ${171.88733853924697} | ${3}
        ${180}                | ${PI}
        ${229.18311805232929} | ${4}
        ${270}                | ${1.5 * PI}
        ${286.47889756541161} | ${5}
        ${360}                | ${2 * PI}
    `.it('should convert $degrees degrees to $expectedRadians radians', ({ degrees, expectedRadians }) => {
        expect(degToRad(degrees)).toBeCloseTo(expectedRadians, 5);
    });
});

describe('clamp', () => {
    jestEach`
        minValue | value  | maxValue | expectedResult
        ${4}     | ${7}   | ${6}     | ${6}
        ${4}     | ${3}   | ${6}     | ${4}
        ${-4}    | ${-10} | ${4}     | ${-4}
        ${-10}   | ${-2}  | ${-4}    | ${-4}
    `.it('should clamp $value between $minValue and $maxValue', ({ minValue, value, maxValue, expectedResult }) => {
        expect(clamp(minValue, value, maxValue)).toBe(expectedResult);
    });
});

describe('clamp01', () => {
    jestEach`
        value       | expectedResult
        ${-34}      | ${0}
        ${-0.3443}  | ${0}
        ${345}      | ${1}
        ${1.2344}   | ${1}
        ${.345}     | ${.345}
        ${.964}     | ${.964}
    `.it('should clamp $value between 0 and 1', ({ value, expectedResult }) => {
        expect(clamp01(value)).toBe(expectedResult);
    });
});
