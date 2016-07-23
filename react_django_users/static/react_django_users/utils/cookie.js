export default class queryCookie {
  constructor() {
    this.qs = getQueryString();
    this.cookie = getCookie();
  }
  store(k, val) {
    // store all cookies as root path so they can override if needed
    document.cookie = `${k}=${val}; path=/`;
  }
  remove(k) {
    document.cookie = `${k}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  }
  update() {
    this.qs = getQueryString();
    this.cookie = getCookie();
  }
  save(...args) {
    // saves values from querystring into cookie
    [...args].forEach((arg) => {
      this.store(arg, this.qs[arg]);
    });
  }
}

/**
 * getQueryString
 *
 * @returns {Object} - query url as an object of key/values
 */
export function getQueryString() {
  return deserializeString(window.location.search.substring(1));
}


/**
 * getCookie
 *
 * @returns {Object} - cookie as an object of key/values
 */
export function getCookie() {
  return deserializeString(document.cookie, ';');
}


/**
 * Converts a string of seperated key/values into in object
 *
 * @param {String} str - String to deserialize
 * @param {String} [sep='&'] - seperator between pairs
 * @param {String} [kv='='] - seperator between a key and a value
 * @returns {Object} - cookie as an object of key/values
 */
function deserializeString(str, sep = '&', kv = '=') {
  return str.split(sep).reduce((queryObj, q) => {
    // Remove space
    while (q.charAt(0) === ' ') q = q.substring(1);

    const [qKey, qValue] = q.split(kv);
    queryObj[qKey] = qValue;

    return queryObj;
  }, {});
}
