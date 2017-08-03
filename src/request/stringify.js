// @flow

export default function stringify(
  obj?: Object | string,
  stringifyFn: (any) => string = JSON.stringify,
): Promise<?string> {
  const string = typeof obj === 'object' ? stringifyFn(obj) : obj;
  return Promise.resolve(string);
}
