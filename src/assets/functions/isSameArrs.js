
export function isSameArrs(arr1, arr2) {
  arr1.sort((a, b) => a - b)
  arr2.sort((a, b) => a - b)
  return JSON.stringify(arr1) === JSON.stringify(arr2)
}
