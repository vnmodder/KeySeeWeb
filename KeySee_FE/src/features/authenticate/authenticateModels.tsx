interface ILoginRequest {
  loginId: string | null
  password: string
  rememberMe: boolean | null
}

interface ILoginResponse {
  name: string
  email: string
  token: string
  expiration: Date
  roles: Array<string>
  bushoCode: string
  departments: Array<string> | null
}

interface IUserPermission {
  permissionCode: number
  screenId: string
  propertyId: string
}

interface IUserPermissionList {
  userPermissions: IUserPermission[]
}

export type { ILoginRequest, ILoginResponse, IUserPermission, IUserPermissionList }
