import moment from 'moment'
import {
  COOKIE_NAME,
  FULL_SCREEN_WITHOUT_HEADER,
  PUBLIC_PAGES,
  LOCAL_STORAGE_NAME
} from 'src/common/constants/constants'
import Cookies from 'universal-cookie'
import { APP_ROUTE } from '../constants/routes/AppRoute'

export const EMPTY_OBJECT_STR = '{}'

export function setCookie(token: string, expiration: string) {
  const expireTime = new Date(expiration).toUTCString()
  document.cookie = `${COOKIE_NAME.AUTHENTICATION}=${token}; expires=${expireTime}; path=/;`
}

export function getCookies(name: string) {
  const cookies = new Cookies()
  return cookies.get(`${name}`)
}

export function removeCookies(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
}

export function deleteCookiesAll() {
  document.cookie = `${COOKIE_NAME.AUTHENTICATION}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
  document.cookie = `${COOKIE_NAME.EXPIRES}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`
}

export function setLocalStorage(name: string, value: any) {
  localStorage.setItem(`${name}`, value)
}

export function getLocalStorage(name: string) {
  return localStorage.getItem(`${name}`)
}

export function removeLocalStorage(name: string) {
  return localStorage.removeItem(`${name}`)
}

/**
 * Format number with thousands-separators
 * @param value number value
 * @returns string
 */
export const formatNumber = (value?: number): string =>
  value ? new Intl.NumberFormat('en-US').format(value) : ''

/**
 * Value is number
 * @param value
 * @returns boolean
 */
export const isNumber = (value: string): boolean => {
  const reg = /^\d*$/
  return reg.test(value)
}

export const formatTelCode = (value: string): string => `+${value}`

export const isValidUrl = (url?: string): boolean => {
  const re =
    /^(http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
  return re.test(String(url))
}

export const convertNullToEmptyString = (value: any | null | undefined): string | any => value ?? ''

export const isNullOrEmpty = (value?: string): boolean =>
  value === null || value === undefined || value === ''

export function generateQueryParams(payload: any): string {
  const keys = Object.keys(payload)

  return keys
    .map((key, i) => `${i === 0 ? '?' : ''}${[key]}=${encodeURIComponent(payload[key])}`)
    .join('&')
}

/**
 * Replace source string with specific character
 * EX: replaceContent('Demo {0}, Demo {1}, Demo {2}', ['test', 'test1', 'test2') => 'Demo test, Demo test1, Demo test2'
 * @param source String want to replace
 * @param values Array string to replace to source
 * @returns string
 */
export const replaceContent = (source: string, values: string[]): string => {
  let result = source
  values.forEach((item, index) => {
    result = result.replaceAll(`{${index}}`, item)
  })
  return result
}

/**
 * Format currency for Japanese Yen
 * Ex: 1999000 => ￥-1,999,000
 * @param {Number} value
 * @returns currency formatted (string)
 */
export const formatCurrencyNegative: (value: number | bigint) => string = (value) =>
  '￥' + new Intl.NumberFormat('ja-JP').format(value)

/**
 * Parse new japanese date string
 *
 * @param {String} dateString
 * @returns date
 */
export const newFormatDate: (dateString: string | Date | undefined) => string = (dateString) => {
  if (typeof dateString === 'undefined') {
    return ''
  }

  if (!dateString) {
    return ''
  }

  moment.updateLocale('ja', null)
  return moment(dateString).format('YYYY/MM/DD')
}

// TODO: Update when completed Login
// export const hasPermission = (roles: string[]): boolean => {
//   const userRoles: string[] =
//     store?.getState()?.authentication?.authentication?.permissions || []
//   if (!roles || !userRoles) {
//     return false
//   }
//   return userRoles.some((userRole) => roles.indexOf(userRole) >= 0)
// }

/**
 *
 * @param path
 * @returns boolean
 */
export const isScreenWithoutHeader = (path: string): boolean =>
  FULL_SCREEN_WITHOUT_HEADER.includes(path)

export const isCurrentPagePublic = (path: string): boolean => PUBLIC_PAGES.indexOf(path) > -1

export function getAllRoutePath() {
  let allRoutePaths: any[] = []
  allRoutePaths = getRoutePaths(allRoutePaths, APP_ROUTE, null)
  return allRoutePaths
}

export function getRoutePaths(paths: any[], routesList: any, routeRoot: any) {
  const keys = Object.keys(routesList)

  keys.forEach((key) => {
    if (routesList[key]?.path !== undefined) {
      const path = routesList[key]?.path
      paths.push({ path })
    } else {
      paths = getRoutePaths(paths, routesList[key], routeRoot ? `${routeRoot}/${key}` : key)
    }
  })

  return paths
}

export function guid(): any {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/x/g, () => Math.ceil(Math.random() * 16).toString(16))
    .replace(/y/, () => Math.ceil(Math.random() * 4 + 8).toString(16))
}

export function getCurrentUserInfor() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME.USER_INFORMATION) || EMPTY_OBJECT_STR)
}

export function getCurrentUserBushoCode() {
  return (
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME.USER_INFORMATION) || EMPTY_OBJECT_STR)
      ?.bushoCode || ''
  )
}

export function getCurrentUserRoles() {
  return (
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_NAME.USER_INFORMATION) || EMPTY_OBJECT_STR)
      ?.roles || []
  )
}

export function checkPermissionByBushoCode(bushoCodes: string[]) {
  const cookie = new Cookies()
  if (cookie.get(COOKIE_NAME.AUTHENTICATION) && bushoCodes.includes(getCurrentUserBushoCode())) {
    return true
  }
  return false
}

export function formatNumberCellDataGrid(numberFormat: number | string, toFixed: number) {
  if (typeof(numberFormat) === 'string') {
    numberFormat = parseInt(numberFormat)
  }
  if (!numberFormat || numberFormat === Infinity) {
    return 0
  }
  const roundedNumber = numberFormat.toFixed(toFixed);
  return roundedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Format style YYYY-MM-DD, YYYY年 MM月 DD日
export function formatDayCustomer(dateString: string, optionCustomer: string) {
  if (typeof dateString === 'undefined') {
    return ''
  }
  if (!dateString) {
    return ''
  }
  moment.updateLocale('ja', null)
  return moment(dateString).format(`${optionCustomer}`)
}
