import PageNotFound from 'src/pages/errorPages/PageNotFound'
import AccessDenied from 'src/pages/errorPages/AccessDenied'
import Login from 'src/pages/authenticate/login/Login'
import HealthCheck from 'src/pages/healthCheck/HealthCheck'
import KinoItiran from 'src/pages/kinoItiran/KinoItiran'
import { KEYSEE_ROLES } from 'src/common/constants/constants';

type RoutePage = {
  path: string
  bushoCodes?: string[] | []
  roles?: string[] | []
  isChild: boolean | false
  parent: string | null
  component: any
}

function createRoutePage(
  path: string,
  isChild?: boolean,
  parent?: string,
  component?: any,
  roles?: string[],
  bushoCodes?: string[]
) {
  return {
    path: path,
    bushoCodes: bushoCodes ?? [],
    roles: roles ?? [],
    isChild: isChild ?? false,
    parent: parent ?? '',
    component: component
  } as RoutePage
}

export const APP_ROUTE = {
  Authenticate: {
    Login: createRoutePage('/login', false, '', Login)
  },
  Home: createRoutePage('/', false, '', KinoItiran),
  PageNotFound: createRoutePage('/page-not-found', false, '', PageNotFound),
  AccessDenied: createRoutePage('/access-denied', false, '', AccessDenied),
  HealthCheck: createRoutePage('/health-check', false, '', HealthCheck)
}

// TODO: Edit url later.
export const SCREENS = {
  // Property and Tenant Management
  PROPERTY_TENANT_MANAGEMENT: {
    title: 'Property and Tenant Management',
    backgroundColor: 'palegreen', // '#98FB98'
    url: APP_ROUTE.PageNotFound.path
  },
  // Data Approval
  DATA_APPROVAL: {
    title: 'Data Approval',
    backgroundColor: 'MistyRose', // '#FFE4E1'
    url: APP_ROUTE.PageNotFound.path
  },
  // Building Maintenance Management
  BUILDING_MAINTENANCE_MANAGEMENT: {
    title: 'Building Maintenance Management',
    backgroundColor: 'Khaki', // '#C3B091'
    url: APP_ROUTE.PageNotFound.path
  },
  // Report Output
  REPORT_OUTPUT: {
    title: 'Report Output',
    backgroundColor: 'Pink', // '#FFC0CB'
    url: APP_ROUTE.PageNotFound.path
  },
  // System Management
  SYSTEM_MANAGEMENT: {
    title: 'System Management',
    backgroundColor: '#404040',
    url: APP_ROUTE.PageNotFound.path
  },
  // // Troubles, Non-Payment, Customer Feedback
  // TROUBLES_NON_PAYMENT_CUSTOMER_FEEDBACK: {
  //   title: 'Troubles, Non-Payment, Customer Feedback',
  //   backgroundColor: 'Thistle', // '#D8BFD8'
  //   url: APP_ROUTE.PageNotFound.path
  // },
  // Operation Manual
  // Utility Bill Management
  UTILITY_BILL_MANAGEMENT: {
    title: 'Utility Bill Management',
    backgroundColor: 'Plum', // '#DDA0DD'
    url: APP_ROUTE.PageNotFound.path
  },
  OPERATION_MANUAL: {
    title: 'Operation Manual',
    backgroundColor: '#FF8000',
    url: APP_ROUTE.PageNotFound.path
  }
}
