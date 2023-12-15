import { tryParse } from 'src/common/utils/number.Utils'

export const Validation = {
  IsNullOrWhitespace: (inputString: any) => {
    return inputString === null || inputString?.toString().trim() === ''
  },

  /**
   * Function to validate a string that have max-length
   * @param inputString A String to validate.
   * @param maxLength Max-length that accepted.
   * @returns
   */
  IsStringLengthGreaterThan: (inputString: any, maxLength: number) => {
    if (typeof maxLength !== 'number' || maxLength <= 0) {
      throw new Error('Length must be a positive number.')
    }

    if (inputString === null || inputString === '') {
      return false
    }

    return inputString?.toString().length > maxLength
  },

  /**
   * Function to validate a string only have numeric chars or not. And max-length accepted.
   * @param inputString
   * @param maxLength
   * @param allowDecimal
   * @returns
   */
  IsStringNumber: (inputString: any, maxLength: number, allowDecimal: boolean) => {
    const parseResult = tryParse(inputString, {
      allowDecimal: allowDecimal,
      allowNegative: true
    })

    if (parseResult.isSuccess) {
      return false
    }

    return inputString.toString().length > maxLength
  },

  /**
   * Function to validate an array is null or empty
   * @param array
   * @returns
   */
  IsNullOrEmpty: (array: any[]) => {
    if (array === undefined || array === null) {
      return true
    }

    if (array.length === 0) {
      return true
    }

    return false
  },

  /**
   * Function to validate a number must be less than specific number length
   * @param inputValue number value to validate
   * @param maxLength max accepted length of @param inputValue
   * @returns return true if @param inputValue longer than @param maxLength, otherwise return false
   */
  IsNumberExceedMaxAcceptedLength(inputValue: number, maxLength: number) {
    return inputValue.toString().length > maxLength
  }
}
