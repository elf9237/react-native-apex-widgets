// @flow

type ValueT = string | {
  json: () => Promise<Object>,
};

export default function objectify(value: ValueT): Promise<Object> {
  if (typeof value.json === 'function') {
    return value.json();
  }
  if (typeof value === 'string') {
    return Promise.resolve(JSON.parse(value));
  }
  return Promise.resolve({});
}
