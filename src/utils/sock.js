import SockJS from 'sockjs-client'

class Sock extends SockJS {
  constructor(url, protocols, options) {
    const baseURL = process.env.NODE_ENV === 'development' ? '/api' : '/pron'
    super(baseURL + url, protocols, options)
  }
}

export default Sock
