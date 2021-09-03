/**
 *
 * @param {String} name
 * @returns
 * @example
 * const url =
 */
export function getQueryString(name, url) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  url = (typeof url === 'string' && url) ? getUrlString(url) : window.location.href.includes('#') ? getHashQueryString(window.location.href) : window.location.search
  const r = url.substr(1).match(reg)
  if (r != null) return decodeURIComponent(unescape(r[2]))
  return null
}

export function getHashQueryString(url) {
  const [, search] = url.split('?')
  if (search) {
    return `?${decodeURIComponent(search)}`
  }
  return ''
}

export function getUrlString(url) {
  if (url.startsWith('?')) {
    return url
  }
  return `?${url}`
}
