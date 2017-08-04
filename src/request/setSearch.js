/* @flow */

// Set query portion of the URL.
export default function setSearch(searchstring: ?string, baseurl: string): string {
  if (typeof searchstring !== 'string') {
    return baseurl;
  }

  let [origin, searchstringInUrl] = baseurl.split('?');

  let search;
  if (searchstringInUrl != null) {
    searchstringInUrl = searchstringInUrl.trim();
    const sep = searchstringInUrl ? '&' : '';
    search = `?${searchstringInUrl}${sep}${searchstring}`;
  } else {
    const sep = /\?/.test(searchstring) ? '' : '?';
    search = `${sep}${searchstring}`;
  }

  return `${origin}${search}`;
}
