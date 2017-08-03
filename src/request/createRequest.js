// @flow

import querystring from 'querystring';
import stringify from './stringify';
import objectify from './objectify';

export type Method = 'POST' | 'GET' | 'PUT';

export type Options = {
  headers?: Object | () => Object,
  serverURL?: string,
  callback?: (response: Object) => any,
};

export default function createRequest({
  headers,
  serverURL = '',
  callback = response => response,
}: Options = {}) {
  return (
    method: Method,
  ) => (
    url: string,
    bodyOrQueryObj?: Object | string,
  ): Promise<Object> => stringify(bodyOrQueryObj, method === 'GET' ? querystring.stringify : JSON.stringify)
    .then((stringified: ?string) => {
      // Prepare for request input.
      let _url = serverURL + url;
      let _bodyInit;
      if (method === 'GET') {
        if (typeof stringified === 'string') {
          const sep = /\?/.test(_url) ? '&' : '?';
          _url += `${sep}${stringified}`;
        }
      } else {
        _bodyInit = stringified;
      }
      const _headers = typeof headers === 'function' ? headers() : headers;

      return {
        method,
        headers: _headers,
        url: _url,
        _bodyInit,
      };
    })
    .then(fetch)
    .then(objectify)
    .then(callback)
  ;
}
