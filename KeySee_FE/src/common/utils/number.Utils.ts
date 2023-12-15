interface parseNumberConfig {
  allowNegative?: boolean
  allowDecimal?: boolean
}

export function tryParse(
  strToParse: string,
  config?: parseNumberConfig
): { isSuccess: boolean; value: number } {
  let numberPattern = '\\d+'
  if (config?.allowNegative) {
    numberPattern = '^-?' + numberPattern
  }
  if (config?.allowDecimal) {
    numberPattern += '(\\.\\d+)?'
  }

  const numberRegex = new RegExp(numberPattern + '$')

  if (numberRegex.test(strToParse)) {
    return {
      isSuccess: true,
      value: config?.allowDecimal ? parseFloat(strToParse) : parseInt(strToParse)
    }
  }

  return {
    isSuccess: false,
    value: 0
  }
}

/**
 * Function to round a number value follow round mode
 * @param numberToRound value to round
 * @param lengthOfDecimalPart length of number after '.' character
 * @param roundingMode rounding mode: 1 => round up, 2 => round down, 3 => round off
 * @returns
 */
export function round(
  numberToRound: number | string,
  lengthOfDecimalPart: number,
  roundingMode: number
) {
  if (typeof numberToRound === 'string') {
    const parseResult = tryParse(numberToRound, {
      allowDecimal: true,
      allowNegative: true
    })
    if (parseResult.isSuccess) {
      throw Error('Value must be number')
    }
    numberToRound = parseResult.value
  }

  const temp = Math.pow(10, lengthOfDecimalPart)
  let result = 0
  const actualNumberToRound = numberToRound * temp

  if (roundingMode <= 1 || roundingMode > 3) {
    result = numberToRound > 0 ? Math.ceil(actualNumberToRound) : Math.floor(actualNumberToRound)
  } else if (roundingMode === 2) {
    result = numberToRound > 0 ? Math.floor(actualNumberToRound) : Math.ceil(actualNumberToRound)
  } else {
    result =
      numberToRound > 0
        ? Math.floor(actualNumberToRound + 0.5)
        : Math.ceil(actualNumberToRound - 0.5)
  }

  return result / temp
}

export function calculateTaxIncludedAmount(
  taxExcludedAmount: number | string,
  taxRate: number,
  roundMode: number
) {
  if (typeof taxExcludedAmount === 'string') {
    const parseResult = tryParse(taxExcludedAmount, {
      allowDecimal: true,
      allowNegative: true
    })
    if (parseResult.isSuccess) {
      throw Error('Value must be number')
    }
    taxExcludedAmount = parseResult.value
  }

  const tax = round(taxExcludedAmount * (taxRate / 100), 0, roundMode)
  return taxExcludedAmount + tax
}
