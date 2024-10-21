// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function deepMerge(target: any, source: any) {
  const sourceKeys = Object.keys(source);

  for (let i = 0; i < sourceKeys.length; i++) {
    const key = sourceKeys[i];

    const sourceValue = source[key];
    const targetValue = target[key];

    if (Array.isArray(sourceValue)) {
      if (Array.isArray(targetValue)) {
        target[key] = deepMerge(targetValue, sourceValue);
      } else {
        target[key] = deepMerge([], sourceValue);
      }
    } else if (isPlainObject(sourceValue)) {
      if (isPlainObject(targetValue)) {
        target[key] = deepMerge(targetValue, sourceValue);
      } else {
        target[key] = deepMerge({}, sourceValue);
      }
    } else if (targetValue === undefined || sourceValue !== undefined) {
      target[key] = sourceValue;
    }
  }

  return target;
}

function isPlainObject(object?: unknown): boolean {
  if (typeof object !== 'object' || object === null) {
    return false;
  }

  const proto = Object.getPrototypeOf(object);
  return proto === Object.prototype || proto === null;
}
