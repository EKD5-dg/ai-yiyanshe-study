import hexagrams from '../data/hexagrams.json'
import trigrams from '../data/trigrams.json'
import { findHexagram } from './divination'

const linesByKey = new Map(trigrams.map(t => [t.key, t.lines]))

// 由上下卦拼出六爻 bits（自下而上）
export function bitsOf(hex) {
  return [...linesByKey.get(hex.lower), ...linesByKey.get(hex.upper)]
}

function byId(id) {
  return hexagrams[id - 1]
}

// 错卦：六爻阴阳全部互换
export function cuogua(id) {
  return findHexagram(bitsOf(byId(id)).map(b => (b ? 0 : 1)))
}

// 综卦：六爻上下颠倒
export function zonggua(id) {
  return findHexagram([...bitsOf(byId(id))].reverse())
}

// 互卦：2-4 爻为下卦、3-5 爻为上卦
export function hugua(id) {
  const b = bitsOf(byId(id))
  return findHexagram([b[1], b[2], b[3], b[2], b[3], b[4]])
}
