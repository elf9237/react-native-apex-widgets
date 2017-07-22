// @flow

export default function stringify(value: any): Promise<string> {
  return Promise.resolve(JSON.stringify(value));
}
