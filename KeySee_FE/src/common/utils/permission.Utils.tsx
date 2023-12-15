import { KengenMode } from '../enum/KengenMode'
import { IUserPermission } from 'src/features/authenticate/authenticateModels'
import { Validation } from 'src/services/validation/validation'

// main function
const checkPermission = (permissionList: IUserPermission[], kengenMode: KengenMode) => {
  if (Validation.IsNullOrEmpty(permissionList)) {
    return false
  }

  if ((permissionList[0].permissionCode & kengenMode) === kengenMode) {
    return true
  }

  return false
}

export const Permission = {
  /**
   * Function to validate Reference (Sansyou) permission
   * @param permissionList
   * @returns
   */
  checkSansyouPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Sansyou)
  },

  /**
   * Function to validate Update (Koshin) permission
   * @param permissionList
   * @returns
   */
  checkKoshinPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Koshin)
  },

  /**
   * Function to validate Back permission
   * @param permissionList
   * @returns
   */
  checkBackPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Back)
  },

  /**
   * Function to validate Delete permission
   * @param permissionList
   * @returns
   */
  checkDeletePermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Delete)
  },

  /**
   * Function to validate MenteRead permission
   * @param permissionList
   * @returns
   */
  checkMenteReadPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.MenteRead)
  },

  /**
   * Function to validate Output permission (usually used)
   * @param permissionList
   * @returns
   */
  checkOutput1Permission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Output1)
  },

  /**
   * Function to validate Output permission
   * @param permissionList
   * @returns
   */
  checkOutput2Permission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Output2)
  },

  /**
   * Function to validate Send permission
   * @param permissionList
   * @returns
   */
  checkSendPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Send)
  },

  /**
   * Function to validate Approve (Syonin) permission
   * @param permissionList
   * @returns
   */
  checkSyoninPermission: (permissionList: IUserPermission[]) => {
    return checkPermission(permissionList, KengenMode.Syonin)
  }
}
