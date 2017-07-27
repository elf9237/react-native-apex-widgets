// @flow

import stringify from './stringify';
import objectify from './objectify';

export type Method = 'POST' | 'GET' | 'PUT';

export type Options = {
  headers?: () => ?Object,
  serverURL?: string,
  callback?: (response: Object) => any,
};

export default function createRequest({
  headers: setHeaders = () => {},
  serverURL = '',
  callback = response => response,
}: Options = {}) {
  return (
    method: Method,
  ) => (
    url: string,
    bodyOrQueryObj?: Object,
  ): Promise<Object> => stringify(bodyOrQueryObj, method)
    .then(({ querystring, _bodyInit }) => ({
      method,
      headers: setHeaders(),
      url: serverURL + url + (querystring || ''),
      _bodyInit,
    }))
    .then(fetch)
    .then(objectify)
    .then(callback)
  ;
}
