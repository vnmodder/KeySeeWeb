export const sum = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0
  }

  return arr.reduce((prevValue, currentValue) => prevValue + currentValue)
}

export function group<TSource, TKey extends string | number | symbol>(
  arr: TSource[],
  keySelector: (obj: TSource) => TKey
): Record<TKey, TSource[]> {
  const result: Record<any, any[]> = {}
  for (const item of arr) {
    const key = keySelector(item)
    if (result[key]) {
      result[key].push(item)
    } else {
      result[key] = [item]
    }
  }
  return result
}
