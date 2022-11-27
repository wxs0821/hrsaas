import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const timeKey = 'vue_admin_template_time'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setTime() {
  Cookies.set(timeKey, +new Date())
}

export function getTime() {
  return Cookies.set(timeKey)
}
