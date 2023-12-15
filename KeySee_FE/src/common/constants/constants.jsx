import { APP_ROUTE } from './routes/AppRoute'

export const DEFAULT_PAGE_SIZE = 50

export const TIME_ZONE_CLIENT = new Date().getTimezoneOffset() / -60

export const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  INTERNAL_SERVER_ERROR: 500,
  NETWORK_ERROR: 0,
  PRECONDITION_ERROR: 412,
  SECTION_INVALID: 406
}

export const PUBLIC_PAGES = [
  APP_ROUTE.Authenticate.Login.path,
  APP_ROUTE.PageNotFound.path,
  APP_ROUTE.AccessDenied.path
]

export const FULL_SCREEN_WITHOUT_HEADER = [
  APP_ROUTE.Authenticate.Login.path,
  APP_ROUTE.PageNotFound.path,
  APP_ROUTE.AccessDenied.path
]

export const FILTER_VALUES = {
  CONTAINS: 'contains',
  STARTS_WITH: 'startsWith',
  ENDS_WITH: 'endsWith',
  EQUAL: 'equals',
  NOT_EQUAL: 'notEqual'
}

export const COOKIE_NAME = {
  AUTHENTICATION: 'authentication',
  TAB_LOGOUT: 'tab_logout',
  EXPIRES: 'expires'
}

export const LOCAL_STORAGE_NAME = {
  LOGIN_ID: 'loginId',
  REMEMBER_ME: 'rememberMe',
  MEMORIZED: 'memorized',
  USER_INFORMATION: 'userInformation',
  PATH_ROUTER_LOGIN: 'path'
}

export const SESSION_STORAGE_NAME = {
  LIST_OPEN_FORM: 'listOpenForm'
}

// DATE FORMAT
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'
export const DATETIME_FORMAT_ZONE = 'YYYY-MM-DD HH:mm:ss zz'

export const REJECTED_SERVER = 'Rejected'

// FILE
export const FILE_SIZE_MAXIMUM = 10485760 // 10Mbs
export const FILE_EXTENSIONS_IMG = ['PNG', 'JPG', 'JPEG']
export const FILE_EXTENSIONS = [
  'XLS',
  'XLSX',
  'DOC',
  'DOCX',
  'PPT',
  'PPTX',
  'PDF',
  'PNG',
  'JPG',
  'JPEG',
  'PDF'
]

export const KEYSEE_ROLES = {
  ADMINISTRATOR: 'Administrator',
  ZERO: 'Zero',
  USER: 'User',
}

export const MESSAGE_ERROR_CODE = {
  ERR_NETWORK: 'ERR_NETWORK',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
}

/**
 * Billing classification | Komoku Kubun Code | 項目区分
 */
export const SEIKYU_CATEGORY_CODES = {
	/** 賃貸料 */
  RENT: '01',
	/** 駐車料 */
  PARKING: '02',
	/** 共益費 */
  COMMON_SERVICE_FEE: '03',
	/** 倉庫賃貸料 */
  WAREHOUSE_RENT_FEE: '04',
	/** 看板掲出等 */
  SIGN_BOARD_POSTING_ETC: '05',
	/** 電気使用料 */
  ELECTRICITY_USAGE_FEE: '06',
	/** 水道使用料 */
  WATER_USAGE_FEE: '07',
	/** ガス使用料 */
  GAS_USAGE_FEE: '08',
	/** 追加空調料 */
  ADDITIONAL_AIR_CONDITIONING_CHARGE: '09',
	/** 保証敷金 */
  SECURITY_DEPOSIT: '10',
	/** 時間駐車料 */
  HOURLY_PARKING_FEE: '11',
	/** その他 */
  OTHERS: '99'
}

/**
 * Billing Unit - Tani - 単位
 */
export const BILLING_UNIT = {
  KWH : 'Kwh',
  M_CAL : 'Mcal',
  M_CUBED : '㎥',
  STAND : '台',
  OTHER : '式' // This unit usually pair with quantity is 1. You can understand is "FEE"
}

/** 税区分 */
export const TAX_CLASSIFICATION = {
  /** 税込 */
  TAX_INCLUDED : '1',
  /** 非課税 */
  TAX_EXEMPT : '2',
  /** 課税 */
  TAXATION : '4',
  /** 税抜 */
  TAX_EXCLUDED : '8',
  /** その他 */
  OTHERS : '9'
}