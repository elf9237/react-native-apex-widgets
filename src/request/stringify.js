// @flow

import querystringModule from 'querystring';
import type { Method } from './createRequest';

export default function stringify(
  obj?: Object,
  method?: Method,
): Promise<{| querystring?: string, _bodyInit?: string |}> {
  let querystring;
  let _bodyInit;
  if (typeof obj === 'object') {
    if (method === 'GET') {
      querystring = `?${querystringModule.stringify(obj)}`;
    } else {
      _bodyInit = JSON.stringify(obj);
    }
  }
  return Promise.resolve({ querystring, _bodyInit });
}
