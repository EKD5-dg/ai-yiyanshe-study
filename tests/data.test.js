import { describe, it, expect } from 'vitest'
import trigrams from '../src/data/trigrams.json'
import hexagrams from '../src/data/hexagrams.json'

// 文王卦序标准表：kingWen[lowerKey][upperKey] = 卦序号
const kingWen = {
  qian: { qian: 1, kun: 11, zhen: 34, xun: 9, kan: 5, li: 14, gen: 26, dui: 43 },
  kun:  { qian: 12, kun: 2, zhen: 16, xun: 20, kan: 8, li: 35, gen: 23, dui: 45 },
  zhen: { qian: 25, kun: 24, zhen: 51, xun: 42, kan: 3, li: 21, gen: 27, dui: 17 },
  xun:  { qian: 44, kun: 46, zhen: 32, xun: 57, kan: 48, li: 50, gen: 18, dui: 28 },
  kan:  { qian: 6, kun: 7, zhen: 40, xun: 59, kan: 29, li: 64, gen: 4, dui: 47 },
  li:   { qian: 13, kun: 36, zhen: 55, xun: 37, kan: 63, li: 30, gen: 22, dui: 49 },
  gen:  { qian: 33, kun: 15, zhen: 62, xun: 53, kan: 39, li: 56, gen: 52, dui: 31 },
  dui:  { qian: 10, kun: 19, zhen: 54, xun: 61, kan: 60, li: 38, gen: 41, dui: 58 }
}

describe('trigrams.json', () => {
  it('包含 8 卦且字段齐全', () => {
    expect(trigrams).toHaveLength(8)
    for (const t of trigrams) {
      expect(t.key).toBeTruthy()
      expect(t.lines).toHaveLength(3)
      expect(t.mnemonic.length).toBeGreaterThan(5)
    }
  })
  it('key 无重复', () => {
    expect(new Set(trigrams.map(t => t.key)).size).toBe(8)
  })
})

describe('hexagrams.json', () => {
  const keys = new Set(trigrams.map(t => t.key))
  it('包含 64 卦，id 为 1..64 顺序排列', () => {
    expect(hexagrams).toHaveLength(64)
    hexagrams.forEach((h, i) => expect(h.id).toBe(i + 1))
  })
  it('symbol 与 Unicode 卦序一致', () => {
    for (const h of hexagrams) {
      expect(h.symbol.codePointAt(0)).toBe(0x4dc0 + h.id - 1)
    }
  })
  it('上下卦合法且符合文王卦序表', () => {
    for (const h of hexagrams) {
      expect(keys.has(h.upper)).toBe(true)
      expect(keys.has(h.lower)).toBe(true)
      expect(kingWen[h.lower][h.upper]).toBe(h.id)
    }
  })
  it('文案字段完整', () => {
    for (const h of hexagrams) {
      expect(h.name.length).toBeGreaterThan(0)
      expect(h.guaci.length).toBeGreaterThan(1)
      expect(h.plain.length).toBeGreaterThan(10)
      expect(h.fun.length).toBeGreaterThan(4)
    }
  })
})
