/* eslint-disable @typescript-eslint/no-explicit-any */
export const deepMerge = <X extends Record<string | symbol | number, any>>(target: X, source: X): X => {
  if (!target || !source) return target ?? source ?? ({} as X);

  return Object.entries({ ...target, ...source }).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: (() => {
        if (target[key] instanceof Date || typeof target[key] === 'function') {
          return target[key];
        }
        if (value instanceof Date || typeof value === 'function') {
          return value;
        }
        if (isObject(target[key]) && isObject(value)) {
          return deepMerge(target[key], value);
        }
        if (isArray(target[key]) && isArray(value)) {
          return value;
        }
        return value !== undefined ? value : target[key];
      })()
    };
  }, {} as X);
};

const isObject = (obj: any): obj is Record<string | symbol | number, any> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const isArray = (obj: any): obj is any[] => Array.isArray(obj);
