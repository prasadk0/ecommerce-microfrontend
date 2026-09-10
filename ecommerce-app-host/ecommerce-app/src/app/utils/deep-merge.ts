export function deepMerge(
    constants: any,
    jsonValues: any
): any {

    if (jsonValues === undefined) {
        return constants;
    }

    if (
        jsonValues === null ||
        typeof jsonValues !== 'object'
    ) {
        return jsonValues;
    }

    if (Array.isArray(jsonValues)) {
        return [
            ...jsonValues
        ];
    }

    if (
        constants === null ||
        typeof constants !== 'object' ||
        Array.isArray(constants)
    ) {
        return {
            ...jsonValues
        };
    }

    const result: any = {
        ...constants
    };

    Object.keys(jsonValues).forEach(key => {

        const jsonValue = jsonValues[key];
        const constantValue = constants[key];

        if (
            jsonValue !== null &&
            typeof jsonValue === 'object' &&
            !Array.isArray(jsonValue) &&
            constantValue !== null &&
            typeof constantValue === 'object' &&
            !Array.isArray(constantValue)
        ) {
            result[key] = deepMerge(
                constantValue,
                jsonValue
            );

            return;
        }

        result[key] = jsonValue;
    });

    return result;
}