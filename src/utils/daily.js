import hexagrams from '../data/hexagrams.json'

// 按日期字符串哈希取卦，当天全站恒定
export function dailyHexagram(date = new Date()) {
  const s = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  let h = 0
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return hexagrams[h % 64]
}
