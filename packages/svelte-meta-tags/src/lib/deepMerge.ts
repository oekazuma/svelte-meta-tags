export const deepMerge = <X extends Record<string | symbol | number, unknown>>(
  initial: X,
  override: X
): X => {
  if (!initial || !override) return initial ?? override ?? {} as X;

  return Object.entries({ ...initial, ...override }).reduce(
    (acc, [key, value]) => {
      return {
        ...acc,
        [key]: (() => {
          if ((initial[key] instanceof Date) || (typeof initial[key] === 'function')) {
            return initial[key];
          }
          if ((value instanceof Date) || (typeof value === 'function')) {
            return value;
          }
          if (isObject(initial[key]) && isObject(value)) {
            return deepMerge(initial[key], value);
          }
          if (isArray(initial[key]) && isArray(value)) {
            return value;
          }
          return value !== undefined ? value : initial[key];
        })()
      }
    },
    {} as X
  );
}

const isObject = (obj: unknown): obj is Record<string | symbol | number, unknown> =>
  obj !== null && typeof obj === 'object' && !Array.isArray(obj);

const isArray = (obj: unknown): obj is unknown[] => Array.isArray(obj);