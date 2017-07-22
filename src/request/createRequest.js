// @flow

import stringify from './stringify';
import objectify from './objectify';

export type Method = 'POST' | 'GET' | 'PUT';

export type Options = {
  headers?: () => Object,
  serverURL?: string,
  callback?: (response: Object) => any,
};

const defaults = {
  headers: () => {},
  serverURL: '',
  callback: response => response,
};

export default function createRequest(options: Options = {}) {
  const requsetOptions = { ...defaults, ...options };

  const {
    headers: setHeaders,
    serverURL,
    callback,
  } = requsetOptions;

  return (
    method: Method,
  ) => (
    url: string,
    body?: Object,
  ): Promise<any> => stringify(body)
    .then(_bodyInit => ({
      method,
      headers: setHeaders(),
      url: serverURL + url,
      _bodyInit,
    }))
    .then(fetch)
    .then(objectify)
    .then(callback)
  ;
}
