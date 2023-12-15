import { CostType } from '../models/CostType'

import { SEIKYU_CATEGORY_CODES } from '../constants/constants'

/**
 * check type of cost is Fixed or Variable
 * @param itemClassificationCode cost category code to check
 * @returns type of cost
 */
export const identifyCostType = (itemClassificationCode: string) => {
  if (
    itemClassificationCode === SEIKYU_CATEGORY_CODES.RENT ||
    itemClassificationCode === SEIKYU_CATEGORY_CODES.PARKING ||
    itemClassificationCode === SEIKYU_CATEGORY_CODES.COMMON_SERVICE_FEE ||
    itemClassificationCode === SEIKYU_CATEGORY_CODES.WAREHOUSE_RENT_FEE ||
    itemClassificationCode === SEIKYU_CATEGORY_CODES.SIGN_BOARD_POSTING_ETC
  ) {
    return CostType.Fixed
  } else {
    return CostType.Variable
  }
}
