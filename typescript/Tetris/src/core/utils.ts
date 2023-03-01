/**
 * 根据最小值和最大值得到该范围内的随机数（无法取到最大值）
 * @param min 最小值
 * @param max 最大值
 * @returns 
 */
export function getRandom(min: number, max: number): number {
  const dec = max - min
  return Math.floor(Math.random() * dec + min)
}