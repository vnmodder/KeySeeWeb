export const capitalFirstLetter: (str: string) => string = (str) =>
  (str && str[0].toUpperCase() + str.slice(1)) || ''


export const makeName: (name: string, isComponentName: boolean) => string = (
  name,
  isComponentName = false
) => {
  if (!name) {
    return ''
  }

  return name
    .split('_')
    .map((letter, index) => {
      if (isComponentName || index > 0) {
        return capitalFirstLetter(letter.toLowerCase())
      }

      return letter.toLowerCase()
    })
    .join('')
}

export const removeSpecialCharacter: (str: string) => string = (str) => {
  if (!str) {
    return ''
  }
  return str.replace(/[~`!@#$%^&*()+=\-[\]\\';,/{}|\\":<>?]/g, '')
}


/**
 * format string of format abc{0}xyz with values
 * @param templateStr string contains template, example: abc{0}xyz
 * @param valuesToFormat values will which will used to replace {0} or etc in templateStr
 * @returns string after formated
 */
export const formatString = (templateStr: string, ...valuesToFormat: (string | number)[]): string => {
  if (!templateStr || !valuesToFormat || !valuesToFormat.length) {
    return templateStr
  }

  // get all values except null or undefined value
  const meanfulValues = valuesToFormat.filter(item => item)
  let result = templateStr

  for (let index = 0; index < meanfulValues.length; index++) {
    result = templateStr.replaceAll(`{${index}}`, meanfulValues[index].toString())
  }

  return result
}