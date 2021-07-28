//----限制数字大小
export function limitNum(num, min, max) {
  if (num > max) {
    num = max
  } else if (num < min) {
    num = min
  }
  return num
}