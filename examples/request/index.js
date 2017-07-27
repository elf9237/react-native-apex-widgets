// @flow

import createRequestLogger from '../../src/request/createRequestLogger';

const serverURL = 'https://ac.cnstrc.com';
const createRequestForMethod = createRequestLogger({ serverURL });

const GET = createRequestForMethod('GET');
const POST = createRequestForMethod('POST');

async function sendGetRequest() {
  const queryUri = '/autocomplete/apex';
  const queryObj = {
    autocomplete_key: 'CD06z4gVeqSXRiDL2ZNK',
    i: '576715f2-19b9-40c6-8c13-af2c8984d2cf',
    s: 33,
    query: 'apex',
    cn: '中文',
  };
  try {
    await GET(queryUri, queryObj);
  } catch (err) {
    // nothing
  }
}

sendGetRequest();
