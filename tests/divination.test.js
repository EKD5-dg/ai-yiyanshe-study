import { describe, it, expect } from 'vitest'
import { castLine, castHexagram, findHexagram, interpret } from '../src/utils/divination'

// 固定序列 rng 工具
function seqRng(values) {
  let i = 0
  return () => values[i++ % values.length]
}

describe('castLine 三枚铜钱', () => {
  it('三背 = 老阳 9（阳爻、变爻）', () => {
    const l = castLine(seqRng([0.4, 0.4, 0.4])) // <0.5 视为背
    expect(l.value).toBe(9)
    expect(l.yang).toBe(true)
    expect(l.changing).toBe(true)
  })
  it('三字 = 老阴 6（阴爻、变爻）', () => {
    const l = castLine(seqRng([0.6, 0.6, 0.6]))
    expect(l.value).toBe(6)
    expect(l.yang).toBe(false)
    expect(l.changing).toBe(true)
  })
  it('一背二字 = 少阳 7（阳爻、不变）', () => {
    const l = castLine(seqRng([0.4, 0.6, 0.6]))
    expect(l.value).toBe(7)
    expect(l.yang).toBe(true)
    expect(l.changing).toBe(false)
  })
  it('二背一字 = 少阴 8（阴爻、不变）', () => {
    const l = castLine(seqRng([0.4, 0.4, 0.6]))
    expect(l.value).toBe(8)
    expect(l.yang).toBe(false)
    expect(l.changing).toBe(false)
  })
  it('随机投掷值只会是 6/7/8/9', () => {
    for (let i = 0; i < 200; i++) {
      expect([6, 7, 8, 9]).toContain(castLine().value)
    }
  })
})

describe('castHexagram', () => {
  it('生成六爻，自下而上', () => {
    expect(castHexagram()).toHaveLength(6)
  })
})

describe('findHexagram 查卦', () => {
  it('六阳 = 乾(1)，六阴 = 坤(2)', () => {
    expect(findHexagram([1, 1, 1, 1, 1, 1]).id).toBe(1)
    expect(findHexagram([0, 0, 0, 0, 0, 0]).id).toBe(2)
  })
  it('下乾上坤 = 泰(11)，下坤上乾 = 否(12)', () => {
    expect(findHexagram([1, 1, 1, 0, 0, 0]).id).toBe(11)
    expect(findHexagram([0, 0, 0, 1, 1, 1]).id).toBe(12)
  })
})

describe('interpret 解卦', () => {
  it('六个老阳：本卦乾，变卦坤，六爻皆变', () => {
    const lines = castHexagram(seqRng([0.4])) // 恒为背 → 全 9
    const r = interpret(lines)
    expect(r.origin.id).toBe(1)
    expect(r.changed.id).toBe(2)
    expect(r.changingIdx).toEqual([0, 1, 2, 3, 4, 5])
  })
  it('无变爻时 changed 为 null', () => {
    // 每爻都是 背字字=7：少阳
    const lines = castHexagram(seqRng([0.4, 0.6, 0.6]))
    const r = interpret(lines)
    expect(r.origin.id).toBe(1)
    expect(r.changed).toBeNull()
  })
})
