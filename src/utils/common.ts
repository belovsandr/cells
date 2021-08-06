export const findLastIndex = <T>(array: T[], predicate: (item: T) => boolean) => {
  return array.length - 1 - [...array].reverse().findIndex(predicate);
}
