// @flow

import moment from 'moment';
import createRequest from './createRequest';
import type { Method, Options } from './createRequest';

const logBuffer = [];
const logColors = {
  request: '#03A9F4',
  response: '#4CAF50',
  error: '#F20404',
};

function formatTime(time: number): string {
  return moment(time).format('HH:mm:ss.SSS');
}

function printBuffer() {
  if (__DEV__) {
    logBuffer.forEach((logEntry) => {
      // exit if console undefined
      if (typeof console === 'undefined') {
        return;
      }

      const { method, url, data, started, took, resp, error } = logEntry;

      const title = `${method} ${url} ${`@ ${formatTime(started)}`} ${`(in ${took.toFixed(2)} ms)`}`;
      try {
        console.groupCollapsed(title);
      } catch (e) {
        console.log(title);
      }

      const requestBody = typeof data === 'object' ? { ...data } : data;
      console.info(
        '%c request',
        `font-weight: bold; color: ${logColors.request}`,
        requestBody,
      );

      if (error) {
        console.info(
          '%c error',
          `font-weight: bold; color: ${logColors.error}`,
          error,
        );
      }

      if (resp) {
        console.info(
          '%c response',
          `font-weight: bold; color: ${logColors.response}`,
          resp,
        );
      }

      try {
        console.groupEnd();
      } catch (e) {
        console.log('—— log end ——');
      }
    });
  }

  logBuffer.length = 0;
}

export default function createRequestLogger(options: Options) {
  return (
    method: Method,
  ) => (
    url: string,
    bodyOrQueryObj?: Object | string,
  ): Promise<Object> => {
    const request = createRequest(options)(method);

    const logEntry = {};

    logEntry.started = Date.now();
    logEntry.method = method;
    logEntry.url = url;
    logEntry.data = bodyOrQueryObj;

    return request(url, bodyOrQueryObj)
      .then((resp) => {
        logEntry.took = Date.now() - logEntry.started;
        logEntry.resp = resp;

        logBuffer.push(logEntry);
        printBuffer();

        return resp;
      })
      .catch((e) => {
        logEntry.took = Date.now() - logEntry.started;
        logEntry.error = e;

        logBuffer.push(logEntry);
        printBuffer();

        throw e;
      });
  };
}
