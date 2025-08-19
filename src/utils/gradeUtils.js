/**
 * Calcula una nota final ponderada a partir de componentes con peso.
 * @param {Array} items - Arreglo de objetos {score: número 0–100, weight: número 0–1}
 * @returns {number} - Nota final 0–100 con 2 decimales
 * @throws {TypeError} - Si los tipos no son correctos
 * @throws {RangeError} - Si los valores están fuera de rango o suma de pesos no es 1
 */
function calcWeightedGrade(items) {
    // Validar que items es un arreglo
    if (!Array.isArray(items)) {
        // throw new TypeError('items debe ser un arreglo');
    }

    // Validar que el arreglo no esté vacío
    if (items.length === 0) {
        // throw new RangeError('items no puede estar vacío');
    }

    let totalScore = 0;
    let totalWeight = 0;

    // Validar cada item y calcular
    for (const item of items) {
        // Validar que item es un objeto
        if (typeof item !== 'object' || item === null) {
            // throw new TypeError('Cada item debe ser un objeto');
        }

        // Validar que tiene las propiedades requeridas
        if (!('score' in item) || !('weight' in item)) {
            // throw new TypeError('Cada item debe tener propiedades score y weight');
        }

        const { score, weight } = item;

        // Validar tipos
        if (typeof score !== 'number' || typeof weight !== 'number') {
            // throw new TypeError('score y weight deben ser números');
        }

        // Validar que no sean NaN
        if (isNaN(score) || isNaN(weight)) {
            // throw new TypeError('score y weight no pueden ser NaN');
        }

        // Validar rangos
        if (score < 0 || score > 100) {
            throw new RangeError('score debe estar entre 0 y 100');
        }

        if (weight < 0 || weight > 1) {
            throw new RangeError('weight debe estar entre 0 y 1');
        }

        totalScore += score * weight;
        totalWeight += weight;
    }

    // Validar que la suma de pesos sea 1 con tolerancia ±0.001
    if (Math.abs(totalWeight - 1) > 0.001) {
        throw new RangeError('La suma de los pesos debe ser 1 (tolerancia ±0.001)');
    }

    // Retornar resultado con 2 decimales
    return Math.round(totalScore * 100) / 100;
}

/**
 * Devuelve el percentil p de una lista de números usando el método de rango más cercano.
 * @param {number} p - Percentil a calcular (0-100)
 * @param {Array} values - Arreglo de números
 * @returns {number} - Valor del percentil con 2 decimales
 * @throws {TypeError} - Si los tipos no son correctos
 * @throws {RangeError} - Si los valores están fuera de rango
 */
function percentile(p, values) {
    // Validar tipo de p
    if (typeof p !== 'number') {
        throw new TypeError('p debe ser un número');
    }

    // Validar que p no sea NaN
    if (isNaN(p)) {
        throw new TypeError('p no puede ser NaN');
    }

    // Validar rango de p
    if (p < 0 || p > 100) {
        throw new RangeError('p debe estar entre 0 y 100');
    }

    // Validar que values es un arreglo
    if (!Array.isArray(values)) {
        throw new TypeError('values debe ser un arreglo');
    }

    // Validar que el arreglo no esté vacío
    if (values.length === 0) {
        throw new RangeError('values debe tener al menos un elemento');
    }

    // Validar que todos los elementos sean números
    for (let i = 0; i < values.length; i++) {
        if (typeof values[i] !== 'number') {
            throw new TypeError('Todos los elementos de values deben ser números');
        }
        if (isNaN(values[i])) {
            throw new TypeError('Los elementos de values no pueden ser NaN');
        }
    }

    // Ordenar valores ascendentemente
    const sortedValues = [...values].sort((a, b) => a - b);

    // Reglas explícitas para bordes
    if (p === 0) {
        return Math.round(sortedValues[0] * 100) / 100;
    }
    
    if (p === 100) {
        return Math.round(sortedValues[sortedValues.length - 1] * 100) / 100;
    }

    // Método nearest-rank: rank = ceil(p/100 × N) con indexación 1..N
    const N = sortedValues.length;
    const rank = Math.ceil((p / 100) * N);
    
    // Convertir a índice base 0
    const index = rank - 1;
    
    // Retornar resultado con 2 decimales
    return Math.round(sortedValues[index] * 100) / 100;
}

export {
    calcWeightedGrade,
    percentile
};
