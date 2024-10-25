/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepMerge = <X extends Record<string | symbol | number, any>>(target: X, source: X): X => {
  if (!target || !source) return target ?? source ?? ({} as X);

  const result: Record<string | symbol | number, any> = { ...target };

  for (const [key, value] of Object.entries(source)) {
    const targetValue = target[key];

    if (targetValue instanceof Date || typeof targetValue === 'function') {
      result[key] = targetValue;
    } else if (value instanceof Date || typeof value === 'function') {
      result[key] = value;
    } else if (isObject(targetValue) && isObject(value)) {
      result[key] = deepMerge(targetValue, value);
    } else if (isArray(targetValue) && isArray(value)) {
      result[key] = value;
    } else {
      result[key] = value !== undefined ? value : targetValue;
    }
  }

  return result as X;
};

const isObject = (obj: any): obj is Record<string | symbol | number, any> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const isArray = (obj: any): obj is any[] => Array.isArray(obj);