import { calcWeightedGrade, percentile } from './gradeUtils.js';

describe("calcWeightedGrade", () => {
    test('Caso de referencia: 80*0.4 + 90*0.6 = 86.00', () => {
        const result = calcWeightedGrade([{score: 80, weight: 0.4}, {score: 90, weight: 0.6}]);
        expect(result).toBe(86.00);
    });

    test('Peso único (100%)', () => {
        const result = calcWeightedGrade([{score: 75, weight: 1.0}]);
        expect(result).toBe(75.00);
    });

    test('Error: suma de pesos != 1', () => {
        expect(() => {
            calcWeightedGrade([{score: 80, weight: 0.5}, {score: 90, weight: 0.4}]);
        }).toThrow(RangeError);
    });

    test('Error: score fuera de rango', () => {
        expect(() => {
            calcWeightedGrade([{score: 150, weight: 1.0}]);
        }).toThrow(RangeError);
    });
});

describe('percentile', () => {
    test('Caso de referencia: percentile(0, [1,2,3]) = 1.00', () => {
        const result = percentile(0, [1, 2, 3]);
        expect(result).toBe(1.00);
    });

    test('Caso de referencia: percentile(100, [1,2,3]) = 3.00', () => {
        const result = percentile(100, [1, 2, 3]);
        expect(result).toBe(3.00);
    });

    test('Caso de referencia: percentile(50, [1,2,3,4]) = 2.00', () => {
        const result = percentile(50, [1, 2, 3, 4]);
        expect(result).toBe(2.00);
    });

    test('Percentil 75 con 4 elementos', () => {
        const result = percentile(75, [1, 2, 3, 4]);
        // rank = ceil(0.75 * 4) = ceil(3) = 3, index = 2, valor = 3
        expect(result).toBe(3.00);
    });

    test('Array desordenado', () => {
        const result = percentile(50, [4, 1, 3, 2]);
        // Ordenado: [1,2,3,4], percentil 50 = 2.00
        expect(result).toBe(2.00);
    });

    test('Error: percentil fuera de rango', () => {
        expect(() => {
            percentile(150, [1, 2, 3]);
        }).toThrow(RangeError);
    });

    test('Error: array vacío', () => {
        expect(() => {
            percentile(50, []);
        }).toThrow(RangeError);
    });
});
