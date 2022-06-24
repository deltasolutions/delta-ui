export const isObject = (v): v is object => typeof v === 'object' && v;

export const isPromise = <T extends unknown>(v): v is Promise<T> =>
  v instanceof Promise;
