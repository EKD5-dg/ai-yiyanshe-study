import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'

// 三枚铜钱掷一爻：背=3、字=2；6 老阴 / 7 少阳 / 8 少阴 / 9 老阳
export function castLine(rng = Math.random) {
  let sum = 0
  const coins = []
  for (let i = 0; i < 3; i++) {
    const back = rng() < 0.5
    coins.push(back ? '背' : '字')
    sum += back ? 3 : 2
  }
  return { value: sum, coins, yang: sum % 2 === 1, changing: sum === 6 || sum === 9 }
}

// 六爻自下而上
export function castHexagram(rng = Math.random) {
  return Array.from({ length: 6 }, () => castLine(rng))
}

const trigramByLines = new Map(trigrams.map(t => [t.lines.join(''), t.key]))

// bits: 长度 6，自下而上，1 阳 0 阴
export function findHexagram(bits) {
  const lower = trigramByLines.get(bits.slice(0, 3).join(''))
  const upper = trigramByLines.get(bits.slice(3, 6).join(''))
  return hexagrams.find(h => h.lower === lower && h.upper === upper)
}

export function interpret(lines) {
  const bits = lines.map(l => (l.yang ? 1 : 0))
  const origin = findHexagram(bits)
  const changingIdx = lines.map((l, i) => (l.changing ? i : -1)).filter(i => i >= 0)
  let changed = null
  if (changingIdx.length > 0) {
    const cb = [...bits]
    for (const i of changingIdx) cb[i] = cb[i] ? 0 : 1
    changed = findHexagram(cb)
  }
  return { origin, changed, changingIdx }
}
